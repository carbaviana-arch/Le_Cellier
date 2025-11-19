// APP DE VINOS - Funcionalidad básica
// ------------------------------------------------------
// Este archivo contiene:
// - Navegación entre páginas
// - Carga inicial de vinos
// - Render del inventario
// - Búsqueda básica
// - Agregar nuevos vinos al inventario

// ------------------------------------------------------
// LISTA INICIAL DE VINOS
// ------------------------------------------------------

const vinos = {
  tinto: [
    "Luis Cañas", "Sierra Cantabria", "Voche", "RODA", "Ricardo Dumas",
    "Pago de los Capellanes Joven", "Silvanus", "Viña Sastre Joven",
    "Pago de Carraovejas", "Tomás Postigo 5 Año", "Abadía Retuerta",
    "Summa Varietalis", "Palacio Quemado", "Habla del Silencio",
    "Tagonius", "El Regajal", "Ánima del Priorat", "Bobos",
    "Corral de Campanas", "Termes", "Cuatro Pasos Black"
  ],
  blanco: [
    "Emina Verdejo", "El Perro Verde", "Belondrade y Lurton",
    "Pentecostes Albariño", "Pazo Baión", "Polvorete", "A Coroa",
    "O Luar do Sil", "Belondrade Quinta Apolonia",
    "Finca Río Negro Gewürztraminer", "Barbazul", "Árabe", "Emina Rosé"
  ],
  espumoso: [
    "Babot", "Gramona Imperial", "Tantum Ergo Rosé",
    "Mumm Cordon Rouge Brut", "Bollinger Special Cuvée",
    "Jorge Ordóñez N°1"
  ]
};

// Para almacenar cantidades
const inventario = [];

// ------------------------------------------------------
// NAVEGACIÓN ENTRE SECCIONES
// ------------------------------------------------------
const buttons = document.querySelectorAll("nav button");
const pages = document.querySelectorAll(".page");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const page = btn.dataset.page;
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(page).classList.add("active");
  });
});

// ------------------------------------------------------
// RENDER INVENTARIO
// ------------------------------------------------------
function renderInventario() {
  const list = document.getElementById("wine-list");

  list.innerHTML = "";

  inventario.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("wine-item");
    div.innerHTML = `
      <strong>${item.nombre}</strong> — ${item.categoria.toUpperCase()}<br>
      Cantidad: ${item.cantidad}
    `;
    list.appendChild(div);
  });
}

// ------------------------------------------------------
// AGREGAR NUEVO VINO
// ------------------------------------------------------
const addForm = document.getElementById("add-wine-form");

addForm.addEventListener("submit", e => {
  e.preventDefault();

  const nombre = document.getElementById("wine-name").value;
  const categoria = document.getElementById("wine-category").value;
  const cantidad = parseInt(document.getElementById("wine-count").value);

  inventario.push({ nombre, categoria, cantidad });
  renderInventario();

  addForm.reset();
  alert("Vino agregado correctamente.");
});

// ------------------------------------------------------
// BÚSQUEDA BÁSICA
// ------------------------------------------------------
const searchInput = document.getElementById("search-box");
const searchResults = document.getElementById("search-results");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  const allWines = [
    ...vinos.tinto.map(v => ({ nombre: v, categoria: "tinto" })),
    ...vinos.blanco.map(v => ({ nombre: v, categoria: "blanco" })),
    ...vinos.espumoso.map(v => ({ nombre: v, categoria: "espumoso" }))
  ];

  const filtered = allWines.filter(v =>
    v.nombre.toLowerCase().includes(query)
  );

  searchResults.innerHTML = filtered
    .map(v => `<div class="search-item">${v.nombre} — ${v.categoria}</div>`) 
    .join("");
});

// Inicializar inventario con cantidades 0 para empezar
function initInventario() {
  Object.keys(vinos).forEach(cat => {
    vinos[cat].forEach(nombre => {
      inventario.push({ nombre, categoria: cat, cantidad: 0 });
    });
  });
  renderInventario();
}

initInventario();