window.TG = window.TG || {};

/* Demo: valida el RUT con el dígito verificador (módulo 11). */
TG.rut = {
  clean(raw) { return String(raw).replace(/[^0-9kK]/g, "").toUpperCase(); },
  dv(body) {
    let sum = 0, mul = 2;
    for (let i = body.length - 1; i >= 0; i--) { sum += Number(body[i]) * mul; mul = mul === 7 ? 2 : mul + 1; }
    const r = 11 - (sum % 11);
    return r === 11 ? "0" : r === 10 ? "K" : String(r);
  },
  format(body, dv) { return body.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "-" + dv; },
  check(raw) {
    const c = TG.rut.clean(raw);
    if (c.length < 2) return { ok: false, msg: "Escribe un RUT, por ejemplo 12.345.678-5." };
    const body = c.slice(0, -1), dv = c.slice(-1);
    if (!/^\d{7,8}$/.test(body)) return { ok: false, msg: "El RUT debe tener 7 u 8 dígitos antes del dígito verificador." };
    const expected = TG.rut.dv(body);
    if (dv !== expected) return { ok: false, msg: "El dígito verificador no coincide. Para " + body + " corresponde " + expected + "." };
    return { ok: true, pretty: TG.rut.format(body, dv), plain: body + "-" + dv };
  }
};

TG.rutDemo = function () {
  const form = document.getElementById("rutForm");
  const input = document.getElementById("rutInput");
  const out = document.getElementById("rutResult");
  if (!form) return;

  function render(animate) {
    const r = TG.rut.check(input.value);
    out.className = "tgapp-result " + (r.ok ? "tgapp-result--ok" : "tgapp-result--err") + (animate ? " tgapp-result--pop" : "");
    out.innerHTML = r.ok
      ? '<b><i class="bi bi-check-circle-fill"></i> RUT válido</b>' + r.pretty + "<br>Formato guardado: " + r.plain
      : '<b><i class="bi bi-x-circle-fill"></i> Revisa el RUT</b>' + r.msg;
  }

  form.addEventListener("submit", (e) => { e.preventDefault(); render(true); });
  render(false);
};
