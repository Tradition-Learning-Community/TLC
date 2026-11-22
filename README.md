# TLC — Tradition Learning Community

TLC est une plateforme communautaire dédiée à la recherche et aux projets d’intelligence artificielle. Elle rassemble des contributeurs autour de projets, d’événements, de ressources et de travaux expérimentaux.

## Fonctionnalités

- Pages publiques : accueil, projets, contributeurs, événements, publications, mission et communauté.
- Espace administrateur protégé pour gérer les contenus et les collections de données.
- API Next.js pour consulter les contenus et effectuer les opérations d’administration autorisées.
- Base SQLite locale alimentée à partir des fichiers JSON de `data/` lors de son initialisation.
- Thèmes clair et sombre.

## Prérequis

- Node.js **20.9 ou plus récent**.
- pnpm.

Vérifiez les versions installées :

```bash
node --version
pnpm --version
```

## Démarrage local

Depuis la racine du dépôt :

```bash
pnpm install
```

L’interface publique peut démarrer sans fichier d’environnement. Pour activer l’accès administrateur, créez `.env.local` à la racine en copiant le modèle :

```powershell
Copy-Item .env.example .env.local
```

Renseignez les deux valeurs dans `.env.local` comme décrit dans [Variables d’environnement](#variables-denvironnement). Ne partagez pas ce fichier et ne commitez jamais ses secrets.

Démarrez le serveur de développement :

```bash
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000). La racine redirige vers `/home`.

## Variables d’environnement

Le seul fichier de modèle est [`.env.example`](./.env.example). Le fichier local `.env.local` est ignoré par Git.

| Variable | Obligatoire | Utilité |
| --- | --- | --- |
| `ADMIN_PASSWORD` | Pour se connecter à `/admin` | Mot de passe administrateur. Choisissez une valeur longue et unique. |
| `ADMIN_SESSION_SECRET` | Recommandée | Secret distinct utilisé pour signer les sessions administrateur. S’il est vide, l’application utilise `ADMIN_PASSWORD` comme solution de repli. |

Générez un secret de session aléatoire avec Node.js :

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"
```

Exemple de configuration locale — remplacez les valeurs avant de lancer l’application :

```dotenv
ADMIN_PASSWORD=votre-mot-de-passe-long-et-unique
ADMIN_SESSION_SECRET=collez-ici-le-secret-genere
```

Ces variables sont réservées au serveur. Ne leur donnez jamais le préfixe `NEXT_PUBLIC_`.

La base de données n’a pas de variable de configuration : elle est créée dans `.data/tlc.sqlite`. Le dossier `.data/` est local et ignoré par Git.

## Pages principales

| Route | Contenu |
| --- | --- |
| `/home` | Présentation de TLC et accès aux rubriques |
| `/projects` | Liste des projets et suivi des tâches |
| `/profiles` | Annuaire des contributeurs |
| `/events` | Événements de la communauté |
| `/resources` | Publications et ressources |
| `/about` | Mission et principes de TLC |
| `/community` | Comment participer et appels à contribution |
| `/admin/login` | Connexion administrateur |
| `/admin` | Gestion des données après connexion |

Les opérations de création, modification et suppression des données sont protégées par la session administrateur. Les routes `GET` publiques servent les contenus affichés sur le site.

## Commandes

```bash
pnpm dev       # Serveur de développement
pnpm build     # Compilation de production
pnpm start     # Serveur de production (après pnpm build)
pnpm lint      # Analyse ESLint
pnpm test      # Tests automatisés et vérification de la base SQLite
pnpm backup    # Sauvegarde de la base SQLite locale
```

Les sauvegardes sont écrites dans `.data/backups/`. Pour une installation de production, copiez-les vers un stockage externe sécurisé.

## Dépannage

### pnpm indique que des scripts de dépendances ont été ignorés

Si l’installation affiche `ERR_PNPM_IGNORED_BUILDS`, lancez :

```bash
pnpm approve-builds
```

Examinez les dépendances proposées avant d’autoriser leurs scripts, puis relancez `pnpm install`.

### L’administration refuse la connexion

Vérifiez que `ADMIN_PASSWORD` est renseigné dans `.env.local`, puis redémarrez le serveur Next.js. `ADMIN_SESSION_SECRET` peut être distinct et doit rester confidentiel.

## Contribution

Consultez [`CONTRIBUTING.md`](./CONTRIBUTING.md) avant d’ouvrir une pull request. Le projet est distribué sous licence [MIT](./LICENSE).
