# Tienda web — Tu Emprendimiento

## Cómo personalizarla

1. Abre `index.html` para cambiar el nombre del emprendimiento y textos.
2. Sustituye `assets/logo.svg` por tu logo.
3. Añade las fotos/videos de tus productos en `assets/`.
4. Edita la lista `products` al principio de `script.js`.
5. En `script.js`, cambia:
   `const WHATSAPP_NUMBER = "XXXXXXXXXXX";`
   por tu número con código de país, sin `+`, espacios ni guiones.
6. Abre `index.html` en tu navegador para probarla.

## Imágenes y vídeos de ejemplo

Los archivos de producto están referenciados por nombre en `script.js`. Puedes usar tus propios archivos con esos nombres o cambiar las rutas.

La web no necesita servidor ni base de datos: es una tienda/catálogo estático que puede publicarse en GitHub Pages, Netlify, Vercel u otro hosting estático.

## Importante

Para publicar productos desde un panel de administración (sin tocar código), habría que conectar la web a un CMS o base de datos. Esta primera versión está preparada como catálogo visual y editable.
