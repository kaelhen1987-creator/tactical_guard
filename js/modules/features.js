window.TG = window.TG || {};

/* Explorador de funciones: filtra por rol, muestra la demo elegida y reinicia su animación. */
TG.features = function () {
  const root = document.getElementById("fx");
  if (!root) return;

  const roleBtns = root.querySelectorAll(".fx-role");
  const items = Array.from(root.querySelectorAll(".fx-item"));
  const panels = root.querySelectorAll(".fx-panel");
  const badge = document.getElementById("fxBadge");
  const BADGE = {
    guardia:    '<i class="bi bi-phone" aria-hidden="true"></i> App del guardia',
    supervisor: '<i class="bi bi-display" aria-hidden="true"></i> Panel del supervisor',
    admin:      '<i class="bi bi-gear" aria-hidden="true"></i> Panel de administración'
  };

  function select(item) {
    items.forEach((i) => { i.setAttribute("aria-selected", i === item); i.tabIndex = i === item ? 0 : -1; });
    panels.forEach((p) => {
      const on = p.id === "fx-" + item.dataset.panel;
      p.hidden = !on;
      p.classList.remove("is-on");
      if (on) { void p.offsetWidth; p.classList.add("is-on"); }
    });
    badge.innerHTML = BADGE[item.dataset.role];
  }

  function setRole(role) {
    roleBtns.forEach((b) => { const on = b.dataset.role === role; b.classList.toggle("is-on", on); b.setAttribute("aria-pressed", on); });
    items.forEach((i) => { i.hidden = i.dataset.role !== role; });
    select(items.find((i) => i.dataset.role === role));
  }

  roleBtns.forEach((b) => b.addEventListener("click", () => setRole(b.dataset.role)));
  items.forEach((i) => i.addEventListener("click", () => select(i)));

  // Flechas arriba/abajo (o izquierda/derecha) entre funciones visibles
  root.querySelector(".fx-list").addEventListener("keydown", (e) => {
    const vis = items.filter((i) => !i.hidden);
    const idx = vis.indexOf(document.activeElement);
    if (idx < 0) return;
    const next = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!next) return;
    e.preventDefault();
    const t = vis[(idx + next + vis.length) % vis.length];
    t.focus(); select(t);
  });

  setRole("guardia");
};
