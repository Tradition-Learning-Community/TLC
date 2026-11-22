# TLC — Déployer hors Vercel ou sur un environnement de test

TLC est une application **Next.js 16 / Node.js** reliée à **PostgreSQL** et à **Neon Auth**. **Vercel est un environnement de test, pas une exigence d'architecture.** Les médias peuvent être stockés dans un bucket compatible S3 (MinIO, S3, R2, etc.) indépendamment de l'hébergeur de Next.js.

## 1. Environnement serveur

1. Installer Node.js 20.9+ (24 utilisé par la CI), pnpm et un proxy HTTPS.
2. Copier [`.env.example`](../.env.example) vers un fichier local non versionné ou des variables de configuration sécurisées.
3. Définir `DATABASE_URL` avec une connexion PostgreSQL accessible ; **ne pas** pointer les tests vers la base de production.
4. Définir `ADMIN_SESSION_SECRET` long, aléatoire et distinct du mot de passe, `NEON_AUTH_BASE_URL` et `NEON_AUTH_COOKIE_SECRET` pour les comptes nominatifs.
5. Choisir `MEDIA_STORAGE_DRIVER=s3` et configurer `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `MEDIA_PUBLIC_BASE_URL`, éventuellement `S3_ENDPOINT` et `S3_FORCE_PATH_STYLE`. Le domaine public des fichiers doit être accessible en HTTPS.
6. Optionnel : `RESEND_API_KEY`, `TLC_ALERT_FROM`, `TLC_ALERT_TO` pour le courriel. Les alertes internes fonctionnent sans Resend.

Ne jamais exposer les secrets sous `NEXT_PUBLIC_*`. `TLC_LEGACY_RECOVERY_ENABLED=true` réactive l'ancien accès partagé : réserver exclusivement à une récupération contrôlée. Après migration, désactiver l'accès historique via `/admin/staff` et ne pas garder cette option activée.

## 2. Schéma PostgreSQL

Sur une installation **neuve**, créer la table des collections génériques avant d'ouvrir le site :

```sql
CREATE TABLE IF NOT EXISTS records (
  collection TEXT NOT NULL,
  id TEXT NOT NULL,
  data JSONB NOT NULL,
  seq BIGINT GENERATED ALWAYS AS IDENTITY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (collection, id)
);
CREATE INDEX IF NOT EXISTS idx_tlc_records_order ON records (collection, seq);
```

La table historique `records` est réutilisée ; **ne pas la vider, recréer ou réimporter les anciennes données** lors d'un déploiement existant. Les données `staff_local_credentials` du compte principal doivent être créées lors d'une opération d'initialisation autorisée, avec hachage scrypt, jamais avec un mot de passe en clair dans un fichier SQL. Cette initialisation n'est pas automatisée par le site.

## 3. Construction et lancement (hébergeur Node.js)

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm test
pnpm build
NODE_ENV=production pnpm start
```

Publier le service derrière un proxy inverse HTTPS (transmission de l'hôte et de `X-Forwarded-Proto`), avec redémarrage supervisé, journalisation contrôlée et un répertoire de travail non public. L'instance doit accéder en réseau à PostgreSQL, Neon Auth, au stockage média et, si configuré, au fournisseur e-mail.

**Critères d'acceptation de l'installation :** pages publiques et `/api/articles` accessibles, `/api/admin/verify` renvoyant HTTP 401 sans session, connexion nominative, test d'un brouillon puis publication, téléversement JPEG réel et affichage via l'URL générée, soumission et lecture d'une demande, déconnexion et refus des accès non autorisés.

### Conteneur Docker (optionnel)

Le dépôt fournit aussi un `Dockerfile` avec exécution non privilégiée. Il ne copie pas le fichier d'environnement dans l'image :

```bash
docker build -t tlc-site .
docker run --rm -p 3000:3000 --env-file .env.local tlc-site
```

La variable `DATABASE_URL` doit pointer vers une base accessible **depuis le conteneur**, pas vers l'hôte local du navigateur. Le stockage S3 et Neon Auth restent des services externes. Conserver `.env.local` et les sauvegardes hors de l'image, utiliser TLS et un reverse proxy en exploitation.

## 4. Sauvegardes et reprise

Le script `pnpm backup` de l'ancienne version sauvegarde uniquement SQLite locale ; il n'est **pas** une sauvegarde de PostgreSQL. Prévoir sauvegarde planifiée et rétention au niveau PostgreSQL ou Neon. Exemple depuis un poste administratif sécurisé :

```bash
pg_dump --format=custom --no-owner --no-acl --file=tlc-backup.dump "$DATABASE_URL"
```

Protéger ce fichier : il contient potentiellement des informations personnelles. Tester la restauration sur une **base isolée** avec `pg_restore` avant de déclarer la procédure fiable. Ne jamais restaurer directement sur la production pour un simple essai. Protéger et sauvegarder séparément les objets S3 ; un dump PostgreSQL ne contient que leurs URLs et métadonnées.

## 5. Vérification de version

- CI GitHub `ci.yml` : build, lint, tests.
- `browser-e2e.yml` : scénario Chromium sur PostgreSQL jetable (pas un test du stockage S3 réel).
- `production-smoke.yml` : contrôle HTTP **manuel** d'une URL de test HTTPS choisie au lancement ; aucun hébergement n'est imposé et la CI de `main` ne dépend pas de la disponibilité d'une URL Vercel.
- Vérifier également téléphone 360–430 px, tablette et ordinateur, clavier, médias, rôles et formulaires.
- Un déploiement de test `READY` ne certifie pas que l'installation définitive, le stockage externe ou les notifications e-mail sont opérationnels.
