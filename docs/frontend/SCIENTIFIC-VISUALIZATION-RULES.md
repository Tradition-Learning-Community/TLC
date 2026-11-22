# Règles des visualisations scientifiques TLC

## Autorités et révisions consultées

| Source | Rôle | Référence |
| --- | --- | --- |
| `Tradition Learning - main.pdf` | Manuscrit principal fourni au projet | Relations entre entités §§3.10.2–3.10.3, 3.22 et 3.31 |
| `TraditionLearning.pdf` | Manuscrit étendu, complément | Cohortes §§3.14.6–3.14.8 et cascades §3.15.2 |
| `tllib-specs` | Définitions et contrats | `07439babd59c657354e3200ed24c55e2e3eeb72c` |
| `tllib` | Architecture et état réel du produit | `e4f192fc71803129b69253ab79d7167bc06c6ed2` |
| `TLC_organisation (1).pdf` | Proposition institutionnelle | §§3–5, Core Team et six cercles |
| Charte fondatrice et Gouvernance TLC, DOCX du projet | Documents institutionnels complémentaires | Structure non entièrement concordante avec le PDF ; adoption non renseignée |
| Spécification frontend adoptée | Décisions de présentation | Six responsabilités de constitution et quatre constats distincts |

Les références publiques des contenus scientifiques sont épinglées à un commit. Les liens généraux de contribution et de suivi peuvent pointer vers `main`. Les manuscrits et documents internes ne sont pas republiés par le frontend ; une mention documentaire explicite les identifie lorsqu’aucune URL publique vérifiée n’existe.

## Règles de représentation

1. Afficher trois entités fondamentales : Maître, Disciple, Communauté. TLC est une organisation distincte de la Communauté d’un système TL.
2. Afficher exactement huit objets fondamentaux : Message, Principes, Valeurs, Vertus, Capacités, Compétences, Pratique, Expérience vécue. Ni centre obligatoire ni ordre de préséance n’est déduit de la mise en page.
3. Chaque relation scientifique affichée doit identifier ses extrémités, sa signification et une source. Les traits ne constituent pas des opérateurs implémentés.
4. Les fonctions et structures des objets sont des descriptions des sources ; les mathématiques restent dans les documents de référence.
5. Une cohorte regroupe des Disciples. Une génération exprime une filiation. Les coordonnées du dessin et les instantanés ne définissent pas une génération.
6. Le scénario de filiation montre des arrivées, un départ, des branches et des relais sous conditions. La reconnaissance des relais est une hypothèse indiquée du scénario ; aucun seuil de maîtrise n’est calculé.
7. Un même participant peut être Disciple dans une relation et Maître-relais dans une autre. Ce choix illustratif n’ajoute pas une quatrième entité.
8. La Tradition conserve son sens d’héritage vivant, intégré, évolutif et transmissible. Elle n’est assimilée ni aux poids ni à un fichier de modèle.
9. La constitution, l’exécutabilité, l’apprentissage observé et le développement d’une Tradition sont présentés séparément. Les sélecteurs permettent de lire des descriptions et ne modifient pas l’état d’un système scientifique.
10. Les six cercles institutionnels restent qualifiés d’organisation proposée tant que les mandats et la structure en vigueur ne sont pas confirmés. Aucun titulaire n’est déduit d’un profil de contributeur.

## Contrat de présentation

`DiagramReference`, `DiagramNode`, `DiagramEdge` et `DiagramScene` sont des types frontend dans `lib/scientific-content/references.ts`. Ils ne constituent pas des ajouts à la théorie TL ni à son registre normatif.

`ScientificDiagramShell` rassemble titre, description, mode et références. Les scènes illustratives affichent leur statut. Chaque diagramme propose une lecture textuelle ; les SVG servant de support visuel sont cachés aux lecteurs d’écran et les commandes sont des boutons HTML.

## Mise à jour

Avant de modifier une relation ou une définition, relire la source correspondante, vérifier sa section et mettre à jour la référence épinglée. Réexécuter les tests concernés. En cas d’ambiguïté scientifique, conserver la source et signaler la question ; le frontend ne corrige pas une équation ou un contrat de sa propre initiative.

Aucun bénéfice sur la robustesse, les biais, la généralisation ou le volume des données n’est annoncé comme démontré sans résultat publié correspondant.
