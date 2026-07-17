---
name: test-web-app
description: Usar cuando se necesite probar visualmente una funcionalidad de la app Next.js del proyecto (en 05_Development/app), como login, formularios, redirects de rutas protegidas, o cualquier flujo de usuario. Levanta el dev server, simula un navegador real con Playwright, y verifica el comportamiento esperado con screenshots y chequeo de errores de consola.
---

# Probar la app web (Next.js) con Playwright

Este entorno (Windows, sin `chromium-cli`) no tiene un navegador headless
preinstalado ni un runner de pruebas E2E configurado en el proyecto. Este
skill documenta el patrón que funcionó para levantar el dev server y
manejarlo con Playwright vía `npx`, incluyendo los problemas puntuales de
este entorno y cómo se resolvieron.

## 1. Levantar el dev server

Correr siempre desde `05_Development/app` (ahí vive `package.json`):

```bash
cd 05_Development/app
(npm run dev > /tmp/nextdev.log 2>&1 &) && echo "started"
```

No usar `sleep` fijo para esperar — hacer polling del puerto:

```bash
timeout 60 bash -c 'until curl -sf -o /dev/null http://localhost:3000/ \
  || curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ | grep -qE "200|307|308"; \
  do sleep 1; done'
```

**Gotcha (Turbopack, primera compilación):** la primera visita a cada ruta
nueva puede tardar 15-35s en compilar (revisar `/tmp/nextdev.log`, busca
líneas `Compiling ...` y `GET ... in NNs`). Si un `page.goto` o
`page.waitForURL` de Playwright da timeout la primera vez pero el log del
servidor muestra `200`/`303` poco después del límite, no es un bug: subir
el timeout o "precalentar" la ruta con un `curl` antes de la prueba real.

## 2. Preparar Playwright

El proyecto no tiene Playwright como dependencia. Se descarga al vuelo:

```bash
npx playwright install chromium --with-deps
```

**Gotcha (resolución de módulos ESM):** un script `.mjs` con
`import { chromium } from "playwright"` falla con
`ERR_MODULE_NOT_FOUND` si se ejecuta desde una carpeta cualquiera, porque
`npx` no instala el paquete en el `node_modules` del proyecto sino en una
caché (`~/AppData/Local/npm-cache/_npx/<hash>/node_modules`). `NODE_PATH`
**no** sirve para resolver `import` en ESM (solo afecta `require`).

Solución que funcionó: encontrar esa carpeta de caché y copiar/ejecutar el
script ahí, junto al `node_modules`:

```bash
find /c/Users/JS/AppData/Local/npm-cache/_npx -maxdepth 3 -iname "node_modules"
# probar cuál de los hashes contiene "playwright":
ls /c/Users/JS/AppData/Local/npm-cache/_npx/<hash>/node_modules | grep playwright

cp mi-script.mjs "/c/Users/JS/AppData/Local/npm-cache/_npx/<hash>/mi-script.mjs"
node "/c/Users/JS/AppData/Local/npm-cache/_npx/<hash>/mi-script.mjs"
```

## 3. Escribir el script de prueba

Un script mínimo por flujo, con screenshots y chequeo de errores de
consola. Ejemplo (login + redirect):

```js
import { chromium } from "playwright";

const base = "http://localhost:3000";
const shotDir = "<carpeta-scratch-para-screenshots>";

const browser = await chromium.launch();
const page = await browser.newPage();
const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});

await page.goto(base + "/");
await page.waitForLoadState("networkidle");
console.log("URL:", page.url()); // debería ser /login si no hay sesión
await page.screenshot({ path: shotDir + "/01-redirect-login.png" });

await page.fill('input[name="email"]', "usuario@ejemplo.com");
await page.fill('input[name="password"]', "contraseña");
await page.click('button[type="submit"]');
await page.waitForURL(base + "/", { timeout: 20000 }); // margen por cold-compile
await page.waitForLoadState("networkidle");
await page.screenshot({ path: shotDir + "/02-logged-in.png" });

console.log("Console errors:", consoleErrors);
await browser.close();
```

Notas:
- Usar `fill` / `click` / `press`, nunca `eval el.value = ...` — los
  inputs controlados de React no disparan `onChange` así.
- Siempre imprimir/chequear `consoleErrors` antes de dar la prueba por
  buena: la página puede renderizar bien y aun así fallar un fetch.
- Después de cada screenshot, **leerlo con la herramienta Read** para
  confirmar visualmente — no basta con que el script no tire error.

## 4. Detener el servidor

`pkill` no está disponible en este entorno. Usar `netstat` + `taskkill`:

```bash
netstat -ano | grep ":3000" | grep LISTENING
taskkill //PID <pid> //F
```

Verificar que quedó libre con `curl --max-time 3 http://localhost:3000/`
(debe fallar).

## 5. Limpieza

Borrar los scripts de prueba temporales de la carpeta de caché de npx y
de la carpeta scratch usada para screenshots — no son parte del código
del proyecto y no deben commitearse.
