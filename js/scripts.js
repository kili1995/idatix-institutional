// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const delay =
          Array.from(e.target.parentElement.children).indexOf(e.target) * 80;
        setTimeout(() => e.target.classList.add("visible"), delay);
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
reveals.forEach((r) => observer.observe(r));

// CHALLENGE — respuestas dinámicas por opción
const answers = {
  0: {
    // Cuántos sistemas
    a: {
      icon: "🤔",
      text: 'Un solo sistema centralizado es ideal… pero ojo: ¿seguro de que no hay Excels dando vueltas por el equipo? En la mayoría de las empresas el dato "oficial" convive con versiones paralelas. Podemos modelar tus datos para que ese único sistema realmente refleje todo el negocio.',
      highlight:
        "Ayudamos a consolidar y limpiar para que el dato sea confiable al 100%.",
    },
    b: {
      icon: "🔀",
      text: 'Dos o tres sistemas que no se hablan entre sí son una fuente constante de inconsistencias. ¿Los cruzás manualmente? ¿Quién decide cuál es el número "correcto" cuando difieren?',
      highlight:
        "Integramos esas fuentes en un Data Lakehouse: los datos de todos los sistemas, cruzados y disponibles en un solo lugar.",
    },
    c: {
      icon: "🧩",
      text: "Cuatro sistemas o más significa que tu visión del negocio depende de que alguien junte manualmente información de múltiples lugares. Eso tarda, cansa y genera errores.",
      highlight:
        "Centralizamos todo —ERP, Excel, APIs, sistemas propios— en una única fuente confiable y automatizada.",
    },
    d: {
      icon: "🚨",
      text: "Si perdiste la cuenta de cuántos sistemas usás, el problema ya es estructural. Cada decisión importante está basada en información parcial o desactualizada.",
      highlight:
        "Empezamos con un relevamiento de todas tus fuentes y te armamos un mapa claro para centralizarlas.",
    },
  },
  1: {
    // Facturación
    a: {
      icon: "✅",
      text: "¡Excelente! Tenés tus datos bien organizados. Pero podemos ir un paso más allá: ¿el dashboard también te muestra por rubro, cliente o vendedor con un solo clic?",
      highlight:
        "Con IDATIX transformamos ese número en un análisis completo de facturación en tiempo real.",
    },
    b: {
      icon: "⏱️",
      text: "5 a 15 minutos parece poco, pero multiplicado por cada consulta, cada reunión, cada decisión urgente… son horas perdidas por semana. Y mientras buscás el dato, la decisión espera.",
      highlight:
        "Con un dashboard bien diseñado, ese número está disponible al instante, siempre actualizado.",
    },
    c: {
      icon: "📊",
      text: "Media hora para encontrar un número básico es una señal clara: tus datos están dispersos o sin estructura. Eso no es un problema de esfuerzo, es un problema de arquitectura de datos.",
      highlight:
        "Organizamos tus fuentes para que cualquier métrica clave esté a un clic, sin buscar.",
    },
    d: {
      icon: "🌡️",
      text: "Que el tiempo para encontrar un dato varíe según el día muestra que el proceso depende de personas y no de sistemas. Es frágil, inconsistente y difícil de escalar.",
      highlight:
        "Automatizamos el acceso a tus datos clave para que el resultado sea siempre el mismo: inmediato y confiable.",
    },
  },
  2: {
    // Alertas de stock
    a: {
      icon: "🏆",
      text: "¡Muy bien! Tenés un sistema de alertas funcionando. ¿Pero las alertas cubren todos los indicadores clave? ¿También te avisan sobre caídas de ventas, desvíos de costos o clientes inactivos?",
      highlight:
        "Podemos extender ese sistema de alertas a todos los procesos críticos de tu negocio.",
    },
    b: {
      icon: "👁️",
      text: "Revisar periódicamente implica que el problema ya puede existir antes de que lo veas. Entre una revisión y otra, podés perder ventas, decepcionar clientes o tomar decisiones con datos viejos.",
      highlight:
        "Configuramos alertas automáticas para que el sistema te avise a vos, y no al revés.",
    },
    c: {
      icon: "📣",
      text: "Enterarte por el cliente de que algo falló es el peor escenario. El problema ya tuvo impacto antes de que pudieras actuar. Y además daña la relación comercial.",
      highlight:
        "Con alertas preventivas basadas en tus datos reales, actuás antes de que el problema llegue al cliente.",
    },
    d: {
      icon: "🔥",
      text: "Reaccionar cuando ya se agotó el stock es apagar incendios. Perdés ventas, generás urgencias en la operación y transmitís imprevisibilidad a tus clientes.",
      highlight:
        "Implementamos alertas tempranas configuradas según tu ritmo de negocio: cuando el stock baja del umbral, ya sabés.",
    },
  },
};

function selectAnswer(cardIndex, el, choice) {
  const opts = document.getElementById("opts-" + cardIndex);
  opts
    .querySelectorAll(".ch-opt")
    .forEach((o) => o.classList.remove("selected"));
  el.classList.add("selected");

  const data = answers[cardIndex][choice];
  const rev = document.getElementById("rev-" + cardIndex);
  // inject content before the existing button
  const btn = rev.querySelector("a, button");
  rev.innerHTML = "";
  rev.innerHTML = `
      <div class="reveal-icon">${data.icon}</div>
      <p class="reveal-text">${data.text}</p>
      <div class="reveal-highlight">${data.highlight}</div>
    `;
  rev.appendChild(btn);

  setTimeout(() => {
    opts.style.display = "none";
    rev.classList.add("show");
    document.getElementById("dot-" + cardIndex).classList.add("done");
  }, 300);
}

function nextCard(index) {
  goToCard(index);
}

function goToCard(index) {
  document
    .querySelectorAll(".challenge-card")
    .forEach((c) => c.classList.remove("active"));
  document.getElementById("card-" + index).classList.add("active");
  document.querySelectorAll(".prog-dot").forEach((d, i) => {
    d.classList.remove("active-dot");
    if (i === index) d.classList.add("active-dot");
  });
}

// WHATSAPP
function sendWhatsApp() {
  const name = document.getElementById("fname").value.trim();
  const company = document.getElementById("fcompany").value.trim();
  const message = document.getElementById("fmessage").value.trim();
  let text = "¡Hola IDATIX! Me gustaría hablar sobre mis datos.";
  if (name) text += `\n\nMi nombre es ${name}.`;
  if (company) text += `\nEmpresa: ${company}.`;
  if (message) text += `\n\n${message}`;
  const phone = "5493564649368";
  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
    "_blank",
  );
}

// NAV scroll effect
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  nav.style.padding = window.scrollY > 40 ? "14px 60px" : "20px 60px";
});

// HAMBURGER
function toggleMenu(el) {
  el.classList.toggle("open");
  const links = document.querySelector(".nav-links");
  if (el.classList.contains("open")) {
    links.style.cssText =
      "display:flex;flex-direction:column;position:fixed;top:70px;left:0;right:0;background:rgba(10,10,15,0.97);padding:32px;gap:24px;backdrop-filter:blur(20px);border-bottom:1px solid rgba(124,58,237,0.2);z-index:99";
  } else {
    links.style.cssText = "";
  }
}

document.querySelectorAll(".nav-links a").forEach(function (link) {
  link.addEventListener("click", function () {
    const hamburger = document.querySelector(".hamburger");
    if (hamburger && hamburger.classList.contains("open")) {
      hamburger.classList.remove("open");
      document.querySelector(".nav-links").style.cssText = "";
    }
  });
});
