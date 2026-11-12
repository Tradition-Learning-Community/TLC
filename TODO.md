# TODO — TLC

## Priorité 1 — Sécurité et administration

- [x] Protéger les routes API d’écriture avec une authentification serveur.
- [x] Supprimer les mots de passe et tokens par défaut du code client.
- [x] Ajouter une session administrateur signée et une route de déconnexion.
- [x] Bloquer les types de fichiers arbitraires dans l’API générique.
- [x] Ajouter les variables d’environnement dans `.env.local`.
- [x] Ajouter une limitation du nombre de tentatives de connexion.
- [ ] Ajouter une validation stricte des données avec Zod ou Valibot.
- [ ] Ajouter une protection CSRF complète si l’administration devient publique.

## Priorité 2 — Interface utilisateur

- [ ] Corriger tous les problèmes d’encodage : `Ã©`, `Ã`, `ðŸ`, etc.
- [ ] Remplacer les liens fictifs `#` du footer par de vraies destinations.
- [x] Ajouter le lien GitHub officiel dans le footer.
- [x] Corriger le slogan de la page d’accueil.
- [x] Remplacer les statistiques fictives par des statistiques réellement calculées.
- [ ] Améliorer les états de chargement et les messages d’erreur.
- [x] Ajouter des états `focus` visibles pour la navigation au clavier.
- [ ] Vérifier les contrastes du texte doré sur fond clair.
- [ ] Ajouter des textes alternatifs descriptifs pour les images.
- [ ] Tester l’interface sur mobile, tablette et grand écran.
- [x] Unifier les deux espaces administrateurs `/admin` et `/x-admin-*`.

## Priorité 3 — Architecture et données

- [x] Mettre en place la couche SQLite et la migration automatique initiale.
- [x] Remplacer le stockage JSON par une base de données SQLite.
- [x] Centraliser les accès aux données dans une couche dédiée.
- [x] Créer des types TypeScript partagés pour les projets, profils et événements.
- [ ] Réduire progressivement l’utilisation de `any`.
- [ ] Ajouter des validations métier pour chaque ressource.
- [ ] Éviter les écritures concurrentes qui peuvent écraser des données.
- [x] Ajouter une stratégie de sauvegarde et de récupération des données.

## Priorité 4 — Tests et qualité

- [x] Faire passer le lint sans masquer les erreurs.
- [x] Faire passer le build de production.
- [x] Ajouter les tests de session administrateur.
- [ ] Ajouter des tests pour toutes les routes API d’écriture.
- [ ] Ajouter des tests de permissions : accès anonyme refusé, administrateur accepté.
- [ ] Ajouter des tests de validation des formulaires.
- [ ] Ajouter des tests end-to-end des parcours principaux.
- [ ] Ajouter une vérification d’accessibilité automatisée.

## Priorité 5 — Documentation et déploiement

- [ ] Corriger l’encodage du README.
- [x] Documenter l’installation et les variables d’environnement.
- [x] Documenter la version Node.js supportée.
- [ ] Décrire la procédure de déploiement.
- [ ] Décrire la procédure de sauvegarde des données.
- [ ] Configurer les variables secrètes dans l’environnement de production.
- [ ] Ajouter un monitoring des erreurs et des performances.

## Objectif final

- [ ] Interface cohérente, accessible et correctement traduite.
- [ ] API sécurisée et validée.
- [ ] Données persistantes dans une base fiable.
- [ ] Tests automatisés couvrant les parcours critiques.
- [ ] Déploiement reproductible et documenté.
