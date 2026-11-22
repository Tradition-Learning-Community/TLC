# Polices locales de TLC

Ces deux fichiers WOFF2 sont les sous-ensembles latins romains servis par Google Fonts, récupérés par `next/font/google` lors d’un build réussi de TLC. Ils sont conservés à l’identique pour rendre la compilation indépendante des réponses du service Google Fonts. `app/layout.tsx` les charge avec `next/font/local`, préchargement et fallbacks ajustés.

| Fichier | Famille et version vérifiées | Axe de poids du fichier | Poids déclarés par TLC | Taille |
| --- | --- | --- | --- | --- |
| `inter-latin.woff2` | Inter Regular, 4.001, source `66647c0bb` | 100–900 | 400, 500, 600, 700 | 48 432 octets |
| `playfair-display-latin.woff2` | Playfair Display Regular, 1.203 | 400–900 | 500, 600, 700 | 38 460 octets |

Les noms, versions, axes et notices intégrées ont été lus avec le fontkit fourni par Next.js. « Regular » désigne l’instance par défaut des fichiers variables ; les poids déclarés ci-dessus sont présents dans leurs axes. Les fichiers n’ont subi aucune conversion ou modification dans ce dépôt.

## Provenance et licences

Le téléchargement initial utilisait les requêtes Google Fonts `Inter:wght@400;500;600;700` et `Playfair+Display:wght@500;600;700`, avec `display=swap`. Les notices sont distribuées dans ce dossier et restent présentes dans les métadonnées des polices.

Les licences et l’identité des familles ont été vérifiées dans le dépôt officiel Google Fonts au commit `06bfe0d62a98375cb09c942fa18e68bd32cff057` :

- Inter : [métadonnées](https://github.com/google/fonts/blob/06bfe0d62a98375cb09c942fa18e68bd32cff057/ofl/inter/METADATA.pb), [licence officielle](https://github.com/google/fonts/blob/06bfe0d62a98375cb09c942fa18e68bd32cff057/ofl/inter/OFL.txt), copie locale `inter-OFL.txt`.
- Playfair Display : [métadonnées](https://github.com/google/fonts/blob/06bfe0d62a98375cb09c942fa18e68bd32cff057/ofl/playfairdisplay/METADATA.pb), [licence officielle](https://github.com/google/fonts/blob/06bfe0d62a98375cb09c942fa18e68bd32cff057/ofl/playfairdisplay/OFL.txt), copie locale `playfair-display-OFL.txt`.

## Empreintes SHA-256

```text
c940764593d0fe5d596be327ca7558855e018039fb78509aa21921fd3644c3e4  inter-latin.woff2
5d91eb5d522a03081946c44c8ca17c902230dfed5f0f9b5014262135d47b15b2  playfair-display-latin.woff2
```
