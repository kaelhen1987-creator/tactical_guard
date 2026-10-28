# Tactical Guard · Landing

Landing comercial modular: HTML (parciales) + CSS por componente/sección + JS por módulo + Bootstrap 5.3.3 (local).

## Ver en tu equipo
Los bloques HTML se cargan con `fetch`, así que hay que servir la carpeta (no abrir con doble clic):

    python3 -m http.server 8000     # y abre http://localhost:8000

## Estructura
- `index.html`: esqueleto; cada sección es un `<div data-include="partials/...">`
- `partials/`: un archivo por sección (navbar, hero, features, showcase, how, evidence, offline, faq, contact, footer)
- `css/base/` tokens (paleta de la app), fuentes, base · `css/components/` · `css/sections/`
- `js/config.js`: correo y endpoint del formulario (**reemplazar el correo de ejemplo**)
- `js/include.js`: carga de parciales · `js/modules/`: nav, demo RUT, demo sin señal, formulario · `js/main.js`
- `assets/img`: capturas reales de la app · `assets/fonts`: Archivo e Inter (autoalojadas) · `vendor/`: Bootstrap e iconos

## Con tu nginx actual
Copia la carpeta a un directorio servido por nginx (por ejemplo `/usr/share/nginx/html`). No necesita build.

## Pendiente de tu parte
- `js/config.js`: poner el correo real de contacto, o la URL de tu API en `contactEndpoint`.
- Las capturas incluyen datos de ejemplo ("Minera San Gerónimo", RUT 12345678-9); cámbialas si quieres mostrar datos neutros.
