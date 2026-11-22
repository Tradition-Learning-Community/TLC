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

`/participer` et `/contact` publient des formulaires réellement reliés à `POST /api/inquiries`. Validation serveur, consentement, honeypot et limitation des envois en base. Les demandes sont réservées à `/admin/demandes` ; chaque demande crée une notification persistante et peut entraîner un e-mail si le fournisseur est configuré.

## Comptes et permissions individuels

La connexion nominative réutilise **Neon Auth**, déjà activé dans le projet Neon, sans créer une deuxième base d'utilisateurs. Les personnes ne deviennent administrateurs que si une invitation nominative est enregistrée et activée avec leur propre session Neon Auth.

Parcours : un responsable accède à `/admin/staff`, saisit le nom, l'adresse e-mail et le rôle, reçoit un lien d'invitation **à usage unique** dans `/admin/activate#token=...`. Le secret n'est jamais stocké en clair dans Neon et ne se retrouve pas dans les API de liste. Le destinataire se connecte/crée son compte Neon Auth avec **la même adresse** et valide le lien. L'activation est atomique et ne peut être réutilisée.

| Rôle TLC | Permissions |
| --- | --- |
| Responsable général | Gestion des comptes, toutes les fonctions éditoriales, contenus, médias et demandes |
| Responsable éditorial | Préparer, publier et gérer les contenus publics et médias |
| Rédaction | Préparer et soumettre des articles ; téléverser les médias ; pas de publication |
| Relations & demandes | Lire, traiter les demandes, consulter et relancer les notifications |

Les API vérifient elles-mêmes les permissions : masquer un menu ne constitue pas une mesure de sécurité. Modifier ou désactiver son propre rôle est interdit ; le dernier responsable général actif ne peut être désactivé.

L'ancien mot de passe commun reste actif uniquement pour la transition. Un **responsable nominatif connecté** peut le désactiver sur `/admin/staff` après avoir vérifié que son accès fonctionne. La variable `TLC_LEGACY_RECOVERY_ENABLED=true` constitue un recours opérationnel explicite. Ce mode n'est pas un compte individuel et ne doit plus servir au fonctionnement courant.

## Notifications de demandes

Chaque formulaire validé crée une entrée dans `inquiries` et un événement dans `notification_jobs`. L'administration affiche le nombre de demandes **nouvelles** et permet de relancer les alertes e-mail non envoyées.

L'alerte interne est **active sans prestataire de courriel**. Pour activer l'expédition e-mail, configurer dans Vercel les secrets suivants, pour les environnements requis :

- `RESEND_API_KEY` — clé du fournisseur d'envoi ;
- `TLC_ALERT_FROM` — adresse expéditrice autorisée sur un domaine vérifié ;
- `TLC_ALERT_TO` — une ou plusieurs adresses de responsables TLC séparées par des virgules.

Le corps de l'e-mail contient **uniquement un type et une référence de demande**, pas les coordonnées ou messages personnels. Le gestionnaire ouvre `/admin/demandes` après connexion. L'envoi est optionnel ; en cas d'échec, l'inscription du visiteur reste enregistrée. Les retries utilisent une clé d'idempotence basée sur la référence de demande. Ne pas présenter les e-mails comme opérationnels tant qu'un compte fournisseur, un domaine expéditeur et un essai d'envoi réel n'ont pas été configurés.

## Vérification et déploiement

- CI : `pnpm install --frozen-lockfile`, `pnpm build`, `pnpm lint`, `pnpm test`.
- Workflow `TLC browser end-to-end` : navigateur Chromium sur Ubuntu 24.04 avec PostgreSQL 16 **jetable**. Scénario : connexion historique, invitation, activation Neon Auth isolée, demande publique, notification, refus d'image usurpée, déconnexion, contrôle des accès et preuve visuelle.
- Tests unitaires : matrice de rôles, jetons d'invitation, validation de formats d'images, création d'un média avec mock du Blob et des écritures, notifications.
- Les identités du test sont créées uniquement sur la branche Neon `tlc-stage4-validation`. Le site de production conserve la branche Neon principale.
- Les images sont stockées dans Vercel Blob `tlc-media`, la base conserve les métadonnées. Les fichiers importés sont privés du catalogue tant qu'ils ne portent pas explicitement `published=true`.

### Limites opérationnelles à suivre

- L'envoi d'e-mails externes dépend des secrets de Resend ; les notifications internes ne dépendent pas de cette configuration.
- Le succès d'un test de téléversement simulé ne prouve pas, à lui seul, que les quotas ou autorisations du Blob de production permettent le téléversement : un essai administrateur avec un vrai fichier doit confirmer la chaîne complète.
- Les politiques institutionnelles de confidentialité, de conservation des demandes et la récupération des comptes doivent être publiées avant utilisation à grande échelle.
- Ne jamais envoyer de mots de passe, liens d'invitation ni secrets de stockage dans une issue, une capture ou un journal de CI.
