# TLC — Publication et administration

Le site officiel TLC utilise **Next.js** sur Vercel et la base existante **Neon PostgreSQL**. Les données antérieures ne sont pas effacées.

## Publications

- `/admin/login` : connexion administrative.
- `/admin/publications` : création, sauvegarde de brouillons, prévisualisation, validation, publication et archivage.
- `/actualites` : seuls les articles avec `status = published` et une date de publication apparaissent.
- `/actualites/[slug]` : fiche publique d'article.

Les brouillons peuvent être incomplets après création du titre. Un article publié ou soumis à validation doit comporter un résumé et un texte suffisants. Les modifications d'article utilisent `version` avec comparaison atomique ; une sauvegarde concurrente reçoit HTTP 409. Les publications sont en texte brut multi-paragraphes, sans interprétation de HTML non fiable.

## Événements, ressources, projets, personnes

L'administration de contenu existante est réutilisée : `/admin/data`. Chaque collection possède un champ `published` lorsqu'elle bénéficie d'un affichage public. Les anciennes données de démonstration restent conservées mais non publiées automatiquement.

`/admin/contributors` et `/community` gèrent les personnes référencées ; `organizations` différencie les institutions, partenaires et soutiens. L'affichage des rôles doit être vérifié par l'organisation avant publication.

## Médias

Le stockage des fichiers publics s'appuie sur le store Vercel Blob **tlc-media**. L'API d'import `POST /api/media/upload` exige une session d'administration, limite la taille à 4 Mo et accepte JPEG, PNG, WebP, AVIF. Neon conserve les métadonnées et l'URL, pas le contenu binaire. Les images ne deviennent visibles dans la galerie `/medias` qu'après publication.

## Demandes publiques

`/participer` et `/contact` publient des formulaires réellement reliés à `POST /api/inquiries`. Validation serveur, consentement, honeypot et limitation des envois en base. Les demandes sont réservées à `/admin/demandes` ; aucune notification e-mail automatique n'est encore implémentée.

## Sécurité et limites actuelles

- Les API des collections génériques `/api/data/[type]` sont privées.
- Les anciens endpoints publics ne renvoient que les données avec `published = true`.
- L'authentification administrative fonctionne actuellement avec un mot de passe unique et une session signée. **Elle ne représente pas encore une gestion de comptes individuels ou de rôles éditoriaux.** Ne partager ce mot de passe qu'avec le responsable de publication.
- Une politique de confidentialité institutionnelle, la rétention des demandes et les comptes éditoriaux individuels restent à finaliser.
- Ne pas créer de données fictives pour remplir le site.

## Contrôles

Exécuter `pnpm install --frozen-lockfile`, `pnpm build`, `pnpm lint`, `pnpm test`, et le smoke test HTTP après fusion. Tester les écritures et les conflits sur une branche **Neon isolée**, jamais en semant des tests dans la base de production.
