window.TG = window.TG || {};

/* Demo: registros que esperan en el dispositivo cuando no hay señal y suben al volver la conexión. */
TG.offlineDemo = function () {
  const root = document.getElementById("syncDemo");
  if (!root) return;

  const sw = document.getElementById("offlineSwitch");
  const status = document.getElementById("syncStatus");
  const log = document.getElementById("syncLog");
  const queueMsg = document.getElementById("syncQueue");

  const TYPES = {
    ronda:   { icon: "bi-geo-alt",              text: "Ronda en Garita Norte" },
    acceso:  { icon: "bi-person-vcard",         text: "Acceso validado, 12.345.678-5" },
    novedad: { icon: "bi-exclamation-triangle", text: "Novedad: intrusión, con foto" }
  };
  const LABEL = { online: "En línea", offline: "Sin señal", syncing: "Sincronizando…" };
  let timers = [];

  const pending = () => log.querySelectorAll('li[data-pending="1"]');
  const setState = (s) => { status.dataset.state = s; status.querySelector("span").textContent = LABEL[s]; };
  const chip = (cls, icon, text) => '<span class="tg-chip ' + cls + '"><i class="bi ' + icon + '"></i>' + text + "</span>";
  const SYNCED = () => chip("tg-chip--ok", "bi-check2", "Sincronizado");
  const WAITING = () => chip("tg-chip--guard", "bi-phone", "En el dispositivo");

  function updateMsg() {
    const n = pending().length;
    if (!log.querySelector("li:not(.sync-empty)")) queueMsg.textContent = "";
    else if (sw.checked) queueMsg.textContent = n + (n === 1 ? " registro espera" : " registros esperan") + " conexión en el dispositivo.";
    else queueMsg.textContent = "Todo sincronizado con el servidor.";
  }

  function empty() {
    log.innerHTML = '<li class="sync-empty">Aún no hay registros. Usa los botones de arriba.</li>';
  }

  function add(type) {
    const t = TYPES[type];
    const first = log.querySelector(".sync-empty");
    if (first) first.remove();
    const offline = sw.checked;
    const li = document.createElement("li");
    if (offline) li.dataset.pending = "1";
    li.innerHTML = '<i class="bi ' + t.icon + '" aria-hidden="true"></i><span>' + t.text + '</span>' +
      '<span class="when">' + new Date().toLocaleTimeString("es-CL") + "</span>" + (offline ? WAITING() : SYNCED());
    log.prepend(li);
    while (log.children.length > 6) log.lastElementChild.remove();
    updateMsg();
  }

  function sync() {
    const items = Array.from(pending()).reverse(); // el más antiguo primero
    if (!items.length) { setState("online"); updateMsg(); return; }
    setState("syncing");
    items.forEach((li, i) => {
      timers.push(setTimeout(() => {
        li.removeAttribute("data-pending");
        li.lastElementChild.outerHTML = SYNCED();
        if (i === items.length - 1) { setState("online"); updateMsg(); }
      }, 600 + i * 450));
    });
  }

  sw.addEventListener("change", () => {
    timers.forEach(clearTimeout); timers = [];
    if (sw.checked) { setState("offline"); updateMsg(); }
    else sync();
  });
  root.querySelectorAll("[data-event]").forEach((b) => b.addEventListener("click", () => add(b.dataset.event)));

  empty();
  setState("online");
};
