# Tradition Learning Community — site officiel TLC

Ce dépôt contient le **portail scientifique et institutionnel TLC** ainsi que son espace **Administration TLC**. Le site présente trois réalités distinctes : la théorie **Tradition Learning**, la bibliothèque [**tllib**](https://github.com/Tradition-Learning-Community/tllib) et l'organisation **Tradition Learning Community**. Il ne constitue pas **TL Studio**, application distincte envisagée pour utiliser tllib au moyen d'une interface.

## Fonctionnement actuel

- Site public : Tradition Learning, tllib, TLC, recherches, projets, ressources, actualités, événements, contributeurs et participation.
- Administration privée : compte principal, invitations et comptes nominatifs via Neon Auth, permissions par rôle.
- Actualités : brouillon, validation, publication, archivage, prévisualisation et contrôle des modifications concurrentes.
- Formulaires de contact, contribution et partenariat : demandes enregistrées dans PostgreSQL et notifications internes.
- Photos et médias : choix depuis téléphone/ordinateur (JPEG, PNG, WebP, AVIF ; 4 Mo) ou URL HTTPS facultative ; stockage binaire configurable dans Vercel Blob ou un système S3 compatible, métadonnées en PostgreSQL.
- Les anciennes fiches de démonstration sont conservées ; ne pas les publier sans vérification éditoriale.

**L'hébergement Vercel sert de banc de test.** Le code est une application Next.js Node.js standard : avec une base PostgreSQL accessible, Neon Auth et un stockage S3 compatible, aucune fonction de stockage n'exige Vercel.

## Démarrage

Prérequis : Node.js 20.9+ (Node.js 24 en CI), pnpm et PostgreSQL persistant.

```bash
pnpm install --frozen-lockfile
cp .env.example .env.local
# Configurer DATABASE_URL, ADMIN_SESSION_SECRET, Neon Auth et le stockage médias.
pnpm dev
```

Ouvrir `http://localhost:3000` (la racine redirige vers `/home`). Le site avec ses pages dépendant de PostgreSQL nécessite une base initialisée. La création du schéma est décrite dans [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md). Ne jamais enregistrer les secrets dans Git, un ticket ou une capture d'écran.

```bash
pnpm lint
pnpm test
pnpm build
pnpm start
```

Les tests automatisés comprennent Vitest et un scénario navigateur Chromium dans GitHub Actions avec PostgreSQL isolé. Les tests ne remplacent pas un essai de transfert de média sur le stockage réel ni un essai de livraison e-mail chez le fournisseur.

## Pages et administration

| URL | Fonction |
| --- | --- |
| `/home` | Accueil du portail |
| `/tradition-learning` | Théorie |
| `/tllib` | Bibliothèque |
| `/tlc` | Organisation (ancienne adresse `/about` conservée en redirection) |
| `/recherche` | Travaux scientifiques |
| `/actualites` | Articles publiés |
| `/events` | Agenda |
| `/resources` | Ressources |
| `/community` et `/participer` | Communauté et participation |
| `/contact` | Contact public |
| `/admin/login` | Connexion à Administration TLC |
| `/admin/publications` | Rédaction et publication |
| `/admin/data/media` | Médiathèque |
| `/admin/staff` | Comptes et permissions |

Les comptes du public ne sont pas nécessaires pour consulter les contenus. L'administration doit se faire avec des comptes individuels. L'ancien accès partagé n'est qu'un mécanisme transitoire pouvant être désactivé depuis l'administration.

## Déploiement et maintenance

- [Installation et déploiement portable](docs/DEPLOYMENT.md)
- [Médias et stockage indépendant](docs/MEDIA-STORAGE.md)
- [Publications, rôles et processus administratifs](docs/EDITORIAL-PLATFORM.md)
- [État des points restant à qualifier](TODO.md)

Le `pnpm backup` historique concerne seulement la base SQLite locale d'une ancienne version et **ne sauvegarde pas Neon PostgreSQL**. Pour la plateforme actuelle, utiliser les procédures PostgreSQL documentées. Aucune migration ni réinitialisation des données existantes ne doit être faite sans sauvegarde et contrôle préalable.

## Contribution

Voir [CONTRIBUTING.md](CONTRIBUTING.md). Dépôt distribué sous licence [MIT](LICENSE).
