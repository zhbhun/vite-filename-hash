(function () {
  const o = document.createElement("link").relList;
  if (o && o.supports && o.supports("modulepreload")) return;
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) l(t);
  new MutationObserver(t => {
    for (const e of t)
      if (e.type === "childList")
        for (const r of e.addedNodes) r.tagName === "LINK" && r.rel === "modulepreload" && l(r)
  }).observe(document, {
    childList: !0,
    subtree: !0
  });

  function i(t) {
    const e = {};
    return t.integrity && (e.integrity = t.integrity), t.referrerpolicy && (e.referrerPolicy = t.referrerpolicy), t.crossorigin === "use-credentials" ? e.credentials = "include" : t.crossorigin === "anonymous" ? e.credentials = "omit" : e.credentials = "same-origin", e
  }

  function l(t) {
    if (t.ep) return;
    t.ep = !0;
    const e = i(t);
    fetch(t.href, e)
  }
})();
const d = "modulepreload",
  m = function (u) {
    return "/" + u
  },
  f = {},
  h = function (o, i, l) {
    if (!i || i.length === 0) return o();
    const t = document.getElementsByTagName("link");
    return Promise.all(i.map(e => {
      if (e = m(e), e in f) return;
      f[e] = !0;
      const r = e.endsWith(".css"),
        a = r ? '[rel="stylesheet"]' : "";
      if (!!l)
        for (let s = t.length - 1; s >= 0; s--) {
          const c = t[s];
          if (c.href === e && (!r || c.rel === "stylesheet")) return
        } else if (document.querySelector(`link[href="${e}"]${a}`)) return;
      const n = document.createElement("link");
      if (n.rel = r ? "stylesheet" : d, r || (n.as = "script", n.crossOrigin = ""), n.href = e, document.head.appendChild(n), r) return new Promise((s, c) => {
        n.addEventListener("load", s), n.addEventListener("error", () => c(new Error(`Unable to preload CSS for ${e}`)))
      })
    })).then(() => o())
  };
h(() => import("./index.aafb7e05.js"), ["assets/index.aafb7e05.js", "assets/index.88f589bd.css"]);