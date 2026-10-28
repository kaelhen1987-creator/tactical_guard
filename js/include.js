/* Carga los parciales HTML en orden y avisa cuando todo está listo. */
(function () {
  "use strict";

  async function loadPartial(el) {
    const url = el.getAttribute("data-include");
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) throw new Error(url + " → " + res.status);
    return res.text();
  }

  async function includeAll() {
    const slots = Array.from(document.querySelectorAll("[data-include]"));
    try {
      const html = await Promise.all(slots.map(loadPartial));
      slots.forEach((slot, i) => slot.replaceWith(document.createRange().createContextualFragment(html[i])));
      document.dispatchEvent(new CustomEvent("tg:ready"));
    } catch (err) {
      console.error("[Tactical Guard] No se pudieron cargar los bloques:", err);
      const box = document.createElement("div");
      box.style.cssText = "max-width:40rem;margin:6rem auto;padding:1.5rem;border:2px solid #C62828;border-radius:12px;font-family:system-ui";
      box.innerHTML = "<strong>No se pudo cargar la página.</strong><p>Los bloques se cargan con fetch, así que el sitio debe abrirse desde un servidor (no con doble clic). " +
        "Prueba con <code>python3 -m http.server</code> dentro de esta carpeta y abre <code>http://localhost:8000</code>.</p>";
      document.body.prepend(box);
    }
  }

  includeAll();
})();
