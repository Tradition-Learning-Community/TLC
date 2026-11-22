# Médias TLC : déploiement indépendant de l’hébergeur

L’administration accepte les images JPEG, PNG, WebP et AVIF de 4 Mo au plus depuis l’appareil connecté. L’API `POST /api/media/upload` vérifie la session, la permission `media:upload`, le type et la signature du fichier. Neon PostgreSQL conserve l’URL et les métadonnées, pas les octets.

Deux fournisseurs sont pris en charge dans `lib/media-storage.ts` :

| Variable | Signification |
| --- | --- |
| `MEDIA_STORAGE_DRIVER` | `vercel-blob` (défaut) ou `s3` |
| `BLOB_READ_WRITE_TOKEN` | Token requis pour `vercel-blob` |
| `S3_BUCKET` | Bucket compatible S3 |
| `S3_REGION` | Région S3 (selon le fournisseur) |
| `S3_ENDPOINT` | Facultatif : endpoint S3 compatible comme MinIO, Cloudflare R2 |
| `S3_FORCE_PATH_STYLE` | `false` si l’adressage path-style n’est pas souhaité |
| `S3_ACCESS_KEY_ID` et `S3_SECRET_ACCESS_KEY` | Identifiants privés du fournisseur |
| `MEDIA_PUBLIC_BASE_URL` | Base HTTPS publique du bucket ou du CDN, avant `tlc/` |

Le bucket/CDN doit permettre de consulter les fichiers publics. Un média importé a `published=false`, mais **son URL physique est publique** : ne jamais employer cet espace pour des documents confidentiels. Les comptes cloud, les domaines et l’infrastructure doivent être configurés et testés à l’installation ; aucun service Vercel n’est nécessaire si le fournisseur `s3` est configuré.

L’API reste identique pour le navigateur et les contenus, quel que soit l’hébergeur Next.js.
