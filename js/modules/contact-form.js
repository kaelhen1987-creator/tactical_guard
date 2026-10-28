window.TG = window.TG || {};

TG.contactForm = function () {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const ok = document.getElementById("contactOk");
  const okText = document.getElementById("contactOkText");
  const err = document.getElementById("contactError");
  const btn = document.getElementById("contactSubmit");
  const cfg = window.TG_CONFIG || {};

  function showOk(text) {
    form.hidden = true;
    okText.textContent = text;
    ok.hidden = false;
    ok.focus();
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    err.hidden = true;
    form.classList.add("was-validated");
    if (!form.checkValidity()) { form.querySelector(":invalid").focus(); return; }

    const data = Object.fromEntries(new FormData(form).entries());

    if (cfg.contactEndpoint) {
      btn.disabled = true;
      try {
        const res = await fetch(cfg.contactEndpoint, {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error(res.status);
        showOk("Gracias. Te contactaremos para coordinar la demostración.");
      } catch (e2) {
        err.textContent = "No pudimos enviar la solicitud. Revisa tu conexión e inténtalo de nuevo.";
        err.hidden = false;
      } finally { btn.disabled = false; }
      return;
    }

    // Sin endpoint: abre el correo del usuario con los datos ya escritos
    const body = ["Nombre: " + data.nombre, "Empresa: " + data.empresa, "Correo: " + data.correo,
      "Teléfono: " + (data.telefono || "-"), "Guardias: " + data.guardias, "", data.mensaje || ""].join("\n");
    window.location.href = "mailto:" + cfg.contactEmail + "?subject=" + encodeURIComponent("Solicitud de demostración Tactical Guard") +
      "&body=" + encodeURIComponent(body);
    showOk("Se abrió tu programa de correo con la solicitud lista. Solo falta enviarla.");
  });
};
