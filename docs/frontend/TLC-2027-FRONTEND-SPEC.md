# TLC 2027 — Frontend scientifique vivant

## Périmètre adopté

Faire évoluer le portail existant `TLC`, en conservant Next.js, React, l’administration et les services PostgreSQL. La couche de présentation explique la théorie, le produit tllib et l’organisation TLC. Elle n’exécute aucun calcul scientifique TL.

Base d’implémentation : `79f02b65ab2ea35f0a7d7e39652ad072dc6b0176`.

## Constitution d’un système TL

La spécification adoptée par le responsable du projet décrit six responsabilités :

- Définir Mission et Problème.
- Inventorier les Ressources.
- Constituer les rôles initiaux.
- Associer les Capacités.
- Vérifier les conditions scientifiques.
- Mettre le système à disposition.

Ces responsabilités ne définissent pas six étapes obligatoirement séquentielles. Le diagramme les présente à égalité et permet de consulter leur contenu dans n’importe quel ordre.

La lecture distingue quatre constats : système structurellement constitué, opérations scientifiquement exécutables, apprentissage constaté, développement d’une Tradition. Le composant ne calcule aucun de ces constats et ne transforme pas une sélection en validation.

Cette présentation résulte des décisions de conception du projet. Elle n’annonce pas une API déjà intégralement exécutable de tllib.

## Visualisations réalisées

| Repère | Page | Comportement |
| --- | --- | --- |
| VIS-01 | `/tradition-learning#entites` | Trois entités, sélection, fonctions et relations documentées |
| VIS-02 | `/tradition-learning#objets` | Huit objets égaux, définitions, structures et relations sourcées |
| VIS-03 | `/tradition-learning#filiations` | Cinq vues et quatre instantanés illustratifs : cohortes, générations, branches, cascades, évolution |
| VIS-04 | `/tllib#constitution` | Six responsabilités et quatre distinctions de lecture |
| VIS-05 | `/tllib#architecture` | Un moteur C++20, deux API, runtime, providers, données et conformité |
| VIS-06 | `/tlc#organisation` | Core Team et six cercles, au statut d’organisation proposée |

Les modèles de présentation sont stockés dans `lib/scientific-content/`. Les composants React/SVG sont indépendants des API de gestion et n’exigent aucune migration de la base.

## Pages et données

L’accueil est un composant serveur composé de sections éditoriales réutilisables. Les animations, formulaires et sélections constituent de petites surfaces clientes. L’illustration d’origine est conservée avec une luminosité corrigée.

Les projets, ressources, événements, contributeurs, organisations et actualités proviennent des services existants. Les nouveaux affichages exigent une publication explicite. Aucun exemple scientifique n’est écrit dans PostgreSQL.

Le catalogue des ressources propose une recherche insensible aux accents et des catégories dérivées des ressources publiées. Les actualités réutilisent le statut et la mise en avant éditoriale. Le formulaire de participation conserve `/api/inquiries`, ses champs, sa validation et son consentement.

## Design et accessibilité

- Bleu nuit `#06142D`, bleu `#0B3D91`, or `#D4AF37`, clair `#F7F9FC`, cyan `#4DBCD5`.
- L’or de texte est assombri sur fond clair pour conserver un contraste lisible.
- Texte courant de 16 px ; métadonnées secondaires de 12–13 px ; boutons et contrôles tactiles de 44 px minimum.
- Inter pour les interfaces, typographie de présentation existante conservée pour les titres.
- Sélections natives avec `aria-pressed`, zones de détail identifiées et sources accessibles.
- Contenu lisible avant hydratation, repli textuel pour les diagrammes et respect de `prefers-reduced-motion`.
- Thèmes clair et sombre, menu mobile avec fermeture par Échap, lien d’évitement, formulaire d’événement dans un dialogue natif.
- Aucune largeur fixe appliquée au document ; le mode ordinateur du téléphone reste un choix du navigateur.

`app/globals.css` conserve les bases et les écrans historiques ; les styles obsolètes de l’ancienne page d’accueil ont été retirés. `app/frontend.css` porte les tokens, composants partagés et compositions de l’accueil. Les styles propres aux diagrammes et pages éditoriales restent proches de leurs composants.

## Critères de réception

- Build Next.js, TypeScript, lint et tests du dépôt réussis.
- Contrats de présentation vérifiés : entités, objets, extrémités et sources des relations, cohérence des cohortes et filiations.
- Vérification réelle des sélections, du clavier, des filtres et de la navigation.
- Contrôle des huit pages à 360, 390, 430, 768, 1024 et 1440 px ; thèmes et réduction des animations.
- Vérification de la publication des données avec PostgreSQL isolé en CI, sans écriture dans les données opérationnelles.
- Captures réelles et résultats de recette conservés dans les artefacts CI.

LCP ≤ 2,5 s, INP ≤ 200 ms et CLS ≤ 0,1 sont les objectifs du site. Un build réussi ne constitue pas une mesure de ces indicateurs : les résultats de laboratoire et les mesures réelles sont rapportés séparément.

## Sources

Consulter [les règles de visualisation](SCIENTIFIC-VISUALIZATION-RULES.md) pour la hiérarchie documentaire, les révisions et les limites des scènes illustratives.
