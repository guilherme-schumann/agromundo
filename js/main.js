/* =========================================================
   AGROMUNDO FAUNA E FLORA — interações da landing page
   ========================================================= */
(function () {
  "use strict";

  const header = document.querySelector(".header");
  const nav = document.getElementById("menu");
  const navToggle = document.getElementById("navToggle");
  const toTop = document.getElementById("toTop");
  const navLinks = Array.from(document.querySelectorAll(".nav__link"));
  const sections = Array.from(document.querySelectorAll("main section[id]"));

  /* ---------- Ano atual no rodapé ---------- */
  const anoEl = document.getElementById("ano");
  if (anoEl) anoEl.textContent = String(new Date().getFullYear());

  /* ---------- Menu mobile ---------- */
  function closeMenu() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menu");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });

    // Fecha ao clicar em um link ou fora do menu
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 720) closeMenu();
    });
  }

  /* ---------- Header sticky + botão "voltar ao topo" ---------- */
  function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("scrolled", y > 20);
    if (toTop) toTop.classList.toggle("is-visible", y > 500);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    // Pequeno atraso escalonado entre irmãos para um efeito mais suave
    revealEls.forEach(function (el) {
      const parent = el.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter((c) => c.classList.contains("reveal"));
        const idx = siblings.indexOf(el);
        if (idx > 0) el.style.transitionDelay = Math.min(idx * 80, 320) + "ms";
      }
      revealObserver.observe(el);
    });
  }

  /* ---------- Link de navegação ativo conforme a seção ---------- */
  if ("IntersectionObserver" in window && sections.length) {
    const linkByHash = new Map(navLinks.map((l) => [l.getAttribute("href"), l]));
    const spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const link = linkByHash.get("#" + entry.target.id);
          if (!link) return;
          navLinks.forEach((l) => l.classList.remove("is-active"));
          link.classList.add("is-active");
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
  }
})();

/* =========================================================
   Carrossel do Hero
   ========================================================= */
(function () {
  "use strict";

  const root = document.getElementById("heroCarousel");
  if (!root) return;

  const track = root.querySelector(".hero-carousel__track");
  const dotsWrap = root.querySelector(".hero-carousel__dots");
  const prevBtn = root.querySelector(".hero-carousel__nav--prev");
  const nextBtn = root.querySelector(".hero-carousel__nav--next");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let slides = Array.from(root.querySelectorAll(".hero-slide"));
  let index = 0;
  let timer = null;
  const INTERVAL = 5000;

  // Remove slides cuja imagem não carregar; se nenhuma sobrar, mostra fallback
  slides.forEach(function (slide) {
    const img = slide.querySelector("img");
    if (!img) return;
    img.addEventListener("error", function () {
      slide.remove();
      slides = Array.from(root.querySelectorAll(".hero-slide"));
      if (slides.length === 0) {
        root.classList.add("is-empty");
        stop();
      } else {
        if (index >= slides.length) index = 0;
        buildDots();
        update();
      }
    });
  });

  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    slides.forEach(function (_, i) {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", "Ir para a foto " + (i + 1));
      b.addEventListener("click", function () { goTo(i, true); });
      dotsWrap.appendChild(b);
    });
  }

  function update() {
    track.style.transform = "translateX(" + -index * 100 + "%)";
    if (dotsWrap) {
      Array.from(dotsWrap.children).forEach(function (dot, i) {
        dot.setAttribute("aria-selected", i === index ? "true" : "false");
      });
    }
  }

  function goTo(i, userAction) {
    index = (i + slides.length) % slides.length;
    update();
    if (userAction) restart();
  }
  function next(userAction) { goTo(index + 1, userAction); }
  function prev(userAction) { goTo(index - 1, userAction); }

  function start() {
    if (reduced || slides.length <= 1) return;
    stop();
    timer = window.setInterval(function () { next(false); }, INTERVAL);
  }
  function stop() { if (timer) { window.clearInterval(timer); timer = null; } }
  function restart() { stop(); start(); }

  if (prevBtn) prevBtn.addEventListener("click", function () { prev(true); });
  if (nextBtn) nextBtn.addEventListener("click", function () { next(true); });

  // Pausa ao passar o mouse / focar (acessibilidade)
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", start);

  // Suporte a arrastar/deslizar (touch e mouse)
  let startX = null;
  root.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
  root.addEventListener("touchend", function (e) {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) { dx < 0 ? next(true) : prev(true); }
    startX = null;
  });

  // Pausa quando a aba não está visível
  document.addEventListener("visibilitychange", function () {
    document.hidden ? stop() : start();
  });

  buildDots();
  update();
  start();
})();
