const WHATSAPP_NUMBER = "XXXXXXXXXXX"; // Reemplaza por tu número, con código de país y sin + ni espacios.

const products = [
  {
    id: 1,
    category: "ramos",
    name: "Ramo Romántico",
    price: "$ 35.00",
    description: "Un ramo delicado y elegante, ideal para aniversarios, cumpleaños o simplemente para decir 'te quiero'.",
    media: [
      { type: "image", src: "assets/producto-1.svg", alt: "Ramo Romántico" },
      { type: "image", src: "assets/producto-1.svg", alt: "Detalle del Ramo Romántico" },
      { type: "video", src: "assets/producto-1.mp4" }
    ]
  },
  {
    id: 2,
    category: "cajas",
    name: "Caja Sorpresa",
    price: "$ 42.00",
    description: "Una caja preparada para sorprender, con espacio para personalizar el mensaje y los detalles.",
    media: [
      { type: "image", src: "assets/producto-2.svg", alt: "Caja Sorpresa" },
      { type: "image", src: "assets/producto-2.svg", alt: "Interior de la Caja Sorpresa" }
    ]
  },
  {
    id: 3,
    category: "ramos",
    name: "Ramo Especial",
    price: "$ 48.00",
    description: "Una composición especial para celebrar una fecha importante con un detalle único.",
    media: [
      { type: "image", src: "assets/producto-3.svg", alt: "Ramo Especial" }
    ]
  },
  {
    id: 4,
    category: "cajas",
    name: "Caja Premium",
    price: "$ 55.00",
    description: "Nuestra opción premium: una presentación cuidada y múltiples elementos para personalizar.",
    media: [
      { type: "image", src: "assets/producto-4.svg", alt: "Caja Premium" },
      { type: "image", src: "assets/producto-4.svg", alt: "Detalle de Caja Premium" }
    ]
  }
];

const grid = document.getElementById("product-grid");
const modal = document.getElementById("product-modal");
const modalMedia = document.getElementById("modal-media");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalPrice = document.getElementById("modal-price");
const modalCategory = document.getElementById("modal-category");
const modalWhatsapp = document.getElementById("modal-whatsapp");

function labelCategory(category) {
  return category === "ramos" ? "Ramo" : "Caja";
}

function renderProducts(filter = "todos") {
  const visible = products.filter(p => filter === "todos" || p.category === filter);

  grid.innerHTML = visible.map(product => {
    const cover = product.media[0];
    const media = cover.type === "video"
      ? `<video src="${cover.src}" muted autoplay loop playsinline></video>`
      : `<img src="${cover.src}" alt="${cover.alt}" loading="lazy">`;

    return `
      <article class="product-card">
        <div class="product-cover">
          ${media}
          <span class="media-badge">${labelCategory(product.category)}</span>
        </div>
        <div class="product-body">
          <span class="eyebrow">${labelCategory(product.category)}</span>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-meta">
            <span class="price">${product.price}</span>
            <button class="view-product" data-product="${product.id}">Ver producto →</button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  grid.querySelectorAll(".view-product").forEach(btn => {
    btn.addEventListener("click", () => openProduct(Number(btn.dataset.product)));
  });
}

function openProduct(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  modalTitle.textContent = product.name;
  modalDescription.textContent = product.description;
  modalPrice.textContent = product.price;
  modalCategory.textContent = labelCategory(product.category);

  const message = encodeURIComponent(`Hola, quiero consultar por ${product.name}.`);
  const number = WHATSAPP_NUMBER !== "XXXXXXXXXXX" ? WHATSAPP_NUMBER : "XXXXXXXXXXX";
  modalWhatsapp.href = `https://wa.me/${number}?text=${message}`;

  let current = 0;

  const slides = product.media.map((item, index) => {
    const media = item.type === "video"
      ? `<video src="${item.src}" controls autoplay muted loop playsinline></video>`
      : `<img src="${item.src}" alt="${item.alt || product.name}">`;
    return `<div class="carousel-slide ${index === 0 ? "active" : ""}">${media}</div>`;
  }).join("");

  const dots = product.media.map((_, index) =>
    `<button class="carousel-dot ${index === 0 ? "active" : ""}" data-slide="${index}" aria-label="Imagen ${index + 1}"></button>`
  ).join("");

  modalMedia.innerHTML = `
    <div class="carousel">
      <div class="carousel-track">${slides}</div>
      ${product.media.length > 1 ? `
        <button class="carousel-control prev" aria-label="Anterior">‹</button>
        <button class="carousel-control next" aria-label="Siguiente">›</button>
        <div class="carousel-dots">${dots}</div>
      ` : ""}
    </div>
  `;

  const slideEls = [...modalMedia.querySelectorAll(".carousel-slide")];
  const dotEls = [...modalMedia.querySelectorAll(".carousel-dot")];

  function goTo(index) {
    current = (index + slideEls.length) % slideEls.length;
    slideEls.forEach((el, i) => el.classList.toggle("active", i === current));
    dotEls.forEach((el, i) => el.classList.toggle("active", i === current));
  }

  const prev = modalMedia.querySelector(".prev");
  const next = modalMedia.querySelector(".next");
  if (prev) prev.onclick = () => goTo(current - 1);
  if (next) next.onclick = () => goTo(current + 1);
  dotEls.forEach(dot => dot.onclick = () => goTo(Number(dot.dataset.slide)));

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalMedia.innerHTML = "";
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    renderProducts(button.dataset.filter);
  });
});

document.querySelectorAll("[data-jump-filter]").forEach(link => {
  link.addEventListener("click", () => {
    const filter = link.dataset.jumpFilter;
    document.querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b.dataset.filter === filter));
    renderProducts(filter);
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.getElementById("main-nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("year").textContent = new Date().getFullYear();

renderProducts();

function cambiarIdioma(lang) {
  const select = document.querySelector(".goog-te-combo");
  if (select) {
    select.value = lang;
    select.dispatchEvent(new Event("change"));
  }

  // Cambiar el botón activo
  document.querySelectorAll(".lang-pill").forEach(btn => {
    btn.classList.toggle("active", btn.textContent.trim().toLowerCase() === lang);
  });
}
