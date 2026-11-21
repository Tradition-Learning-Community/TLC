# Tradition Learning Community — TLC

Site public de **Tradition Learning Community (TLC)**, organisation de recherche et de développement en intelligence artificielle.

## Identité scientifique

- **Tradition Learning (TL)** est une théorie et un programme de recherche sur l’apprentissage, la transmission et l’évolution d’une Tradition.
- **TLC** est la communauté humaine de chercheurs, ingénieurs et autres contributeurs. Elle ne doit pas être confondue avec la **Communauté**, entité fondamentale de la théorie.
- **[tllib-specs](https://github.com/Tradition-Learning-Community/tllib-specs)** publie les spécifications et contrats scientifiques et techniques.
- **[tllib](https://github.com/Tradition-Learning-Community/tllib)** implémente la bibliothèque scientifique. La V1 est encore en développement ; aucune conformité scientifique complète n’est annoncée.

La théorie distingue trois entités fondamentales (Maître, Disciple, Communauté) et huit objets fondamentaux (Message, Principes, Valeurs, Vertus, Capacités, Compétences, Pratique, Expérience vécue). Le manuscrit scientifique fait autorité sur les fondements de TL.

## Plateforme web

Next.js, React, TypeScript et Tailwind CSS ; hébergement Vercel et base persistante Neon PostgreSQL. Les pages publiques présentent la théorie, l’organisation, le produit et les ressources. L’administration utilise des sessions signées.

## Développement

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
pnpm test
pnpm build
```

Les variables sensibles sont documentées dans `.env.example` et se configurent dans l’environnement de déploiement, sans les publier.

Consultez [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) pour le déploiement et les sauvegardes PostgreSQL.

## Contributions

Consultez [CONTRIBUTING.md](CONTRIBUTING.md) pour contribuer au site. Les contributions scientifiques et au produit doivent suivre les guides de `tllib-specs` et `tllib`.

## Licence

Le code de ce dépôt est distribué sous licence MIT (voir [LICENSE](LICENSE)).
