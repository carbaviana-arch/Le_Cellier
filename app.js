// ------------------------------------------------------
// APP DE VINOS - Funcionalidad básica
// ------------------------------------------------------

// LISTA INICIAL DE VINOS
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
    "Mumm Cordon Rouge Brut", "Bollinger Special Cuvée"
  ],
  dulce: [
    "Jorge Ordóñez N°1"
  ]
};

// Inventario dinámico (cantidad editable)
const inventario = [];

// ------------------------------------------------------
// NAVEGACIÓN ENTRE PÁGINAS
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
// RENDER DEL INVENTARIO
// ------------------------------------------------------
function renderInventario() {
  const list = document.getElementById("wine-list");
  if (!list) return;

  list.innerHTML = "";

  inventario.forEach(item => {
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

if (addForm) {
  addForm.addEventListener("submit", e => {
    e.preventDefault();

    const nombre = document.getElementById("wine-name").value.trim();
    const categoria = document.getElementById("wine-category").value;
    const cantidad = parseInt(document.getElementById("wine-count").value);

    if (!nombre || isNaN(cantidad)) {
      alert("Por favor completa todos los campos.");
      return;
    }

    inventario.push({ nombre, categoria, cantidad });
    renderInventario();

    addForm.reset();
    alert("Vino agregado correctamente.");
  });
}

// ------------------------------------------------------
// BÚSQUEDA
// ------------------------------------------------------
const searchInput = document.getElementById("search-box");
const searchResults = document.getElementById("search-results");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    const allWines = Object.keys(vinos).flatMap(cat =>
      vinos[cat].map(n => ({ nombre: n, categoria: cat }))
    );

    const filtered = allWines.filter(v =>
      v.nombre.toLowerCase().includes(query)
    );

    searchResults.innerHTML = filtered
      .map(v => `<div class="search-item">${v.nombre} — ${v.categoria}</div>`)
      .join("");
  });
}

// ------------------------------------------------------
// INICIALIZAR INVENTARIO
// ------------------------------------------------------
function initInventario() {
  Object.keys(vinos).forEach(cat => {
    vinos[cat].forEach(nombre => {
      inventario.push({ nombre, categoria: cat, cantidad: 0 });
    });
  });
  renderInventario();
}

initInventario();
