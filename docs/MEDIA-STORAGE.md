# TLC — Médias indépendants de l'hébergeur

Dans Administration TLC, l'option principale est **« Choisir une image sur cet appareil »** (téléphone ou ordinateur). Le lien HTTPS est une alternative facultative. Le choix est utilisé par les actualités, les contributeurs, les organisations et la médiathèque.

L'API `POST /api/media/upload` exige la permission `media:upload`, limite les images à 4 Mo et vérifie le type et la signature JPEG, PNG, WebP ou AVIF. Les binaires vont au fournisseur choisi ; la fiche, l'URL, les crédits et l'état de publication vont dans PostgreSQL.

| Configuration | Exigences |
| --- | --- |
| `MEDIA_STORAGE_DRIVER=s3` | `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `MEDIA_PUBLIC_BASE_URL` |
| S3 compatible (R2, MinIO, etc.) | Ajouter `S3_ENDPOINT`, éventuellement `S3_FORCE_PATH_STYLE` |
| `MEDIA_STORAGE_DRIVER=vercel-blob` | `BLOB_READ_WRITE_TOKEN` ; utilisable pour les essais Vercel |

`MEDIA_PUBLIC_BASE_URL` doit être une adresse HTTPS publique du bucket ou du CDN. Le stockage doit permettre de consulter les fichiers publics ; la création et la suppression utilisent des identifiants privés du serveur. Vérifier les règles CORS et d'accès selon le fournisseur.

**Sécurité et conservation :** un média nouvellement importé a `published=false` dans PostgreSQL mais son URL de stockage est physiquement publique. Ne jamais y placer de pièces privées. L'import nettoie désormais l'objet à distance si l'écriture de sa fiche PostgreSQL échoue ; un échec de nettoyage est journalisé et devra être traité par la maintenance. La suppression d'une fiche média ne supprime pas automatiquement un fichier pouvant être encore cité par un article ou un autre contenu : prévoir un inventaire des références avant toute purge physique.

Aucun compte Vercel n'est nécessaire pour les fichiers si le fournisseur `s3` est configuré. Les tests unitaires vérifient la configuration et la compensation en cas d'échec de persistance ; **un transfert réel vers un bucket opérationnel reste un contrôle d'installation obligatoire**.
