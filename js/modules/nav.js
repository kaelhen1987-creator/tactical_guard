window.TG = window.TG || {};
TG.nav = function () {
  const nav = document.getElementById("mainNav");
  if (!nav) return;

  const onScroll = () => nav.classList.toggle("is-solid", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Resalta el enlace de la sección visible
  new bootstrap.ScrollSpy(document.body, { target: "#mainNav", rootMargin: "-30% 0px -60% 0px" });

  // Cierra el menú móvil al elegir una sección
  const menu = document.getElementById("navMenu");
  nav.querySelectorAll(".nav-link, .btn-tg").forEach((a) =>
    a.addEventListener("click", () => {
      if (menu.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(menu).hide();
    })
  );

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
};
