/* Arranque: espera a que los parciales estén en el DOM y activa cada módulo. */
document.addEventListener("tg:ready", () => {
  TG.nav();
  TG.features();
  TG.rutDemo();
  TG.offlineDemo();
  TG.contactForm();
});
