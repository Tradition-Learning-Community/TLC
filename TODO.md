# TLC — Suivi des travaux vérifiables

Le présent fichier décrit des limites **observables ou à tester**, pas un audit général ni une liste d'annonces. Référence de développement : Next.js 16, PostgreSQL, Neon Auth, médias S3/Vercel Blob.

## Réalisé dans le code

- [x] Site public Tradition Learning, tllib, TLC, recherche, articles, événements et participation.
- [x] Comptes administratifs, permissions serveur, authentification nominative et changement des accès.
- [x] Création et modération d'articles ; contenu public filtré par état de publication.
- [x] Demandes publiques persistantes et alertes internes.
- [x] Choix d'images depuis appareil et URL facultative ; validation de format et taille.
- [x] Stockage média S3 compatible ou Vercel Blob, avec compensation en cas d'échec d'enregistrement.
- [x] Navigation mobile administrative déroulante ; tableau de bord sans nombre de collections fictif.
- [x] Configuration et documentation d'installation non liées à Vercel.
- [x] Tests unitaires et scénario navigateur sur PostgreSQL isolé.

## À qualifier sur un environnement réel

- [ ] Vérifier un transfert et une lecture d'image sur le **bucket S3 cible**, avec compte autorisé.
- [ ] Tester la chaîne complète d'e-mails Resend depuis le domaine expéditeur **vérifié**, si souhaitée.
- [ ] Valider la reprise après incident : restauration PostgreSQL **sur une base isolée** et sauvegarde des fichiers médias.
- [ ] Confirmer la rotation des secrets, la désactivation du compte partagé historique et les comptes de l'équipe.
- [ ] Tester tous les parcours mobiles, l'accessibilité et les états d'erreur sur les navigateurs cibles.
- [ ] Vérifier chaque page publique face aux maquettes TLC 2027 et la disponibilité réelle de ses contenus.
- [ ] Valider le registre des personnes et organisations avant publication ; ne pas inventer de partenaires.
- [ ] Établir la politique institutionnelle de confidentialité et de conservation des demandes.
- [ ] Éprouver le déploiement sur l'hébergement définitif ; une prévisualisation Vercel ne vaut pas qualification finale.

## Améliorations futures sans blocage de l'édition actuelle

- [ ] Poursuivre la spécialisation des formulaires « Projets », « Expériences » et « Événements » pour limiter le gestionnaire générique.
- [ ] Prévoir l'inventaire des références avant toute suppression physique de médias.
- [ ] Renforcer les validations par collection et couvrir les routes d'écriture restantes.
- [ ] Mettre en place supervision des erreurs et des performances sur l'hébergement retenu.

Ne pas modifier tllib dans les travaux ordinaires du site TLC.
