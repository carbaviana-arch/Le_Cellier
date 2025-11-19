document.addEventListener("DOMContentLoaded", () => {

  console.log("[app] DOMContentLoaded - iniciando app");

  // ------------------------------------------------------
  // LISTA DE VINOS
  // ------------------------------------------------------
  const vinos = {
    tinto: [
      "Luis Cañas","Sierra Cantabria","Voche","RODA","Ricardo Dumas",
      "Pago de los Capellanes Joven","Silvanus","Viña Sastre Joven",
      "Pago de Carraovejas","Tomás Postigo 5 Año","Abadía Retuerta",
      "Summa Varietalis","Palacio Quemado","Habla del Silencio",
      "Tagonius","El Regajal","Ánima del Priorat","Bobos",
      "Corral de Campanas","Termes","Cuatro Pasos Black"
    ],
    blanco: [
      "Emina Verdejo","El Perro Verde","Belondrade y Lurton",
      "Pentecostes Albariño","Pazo Baión","Polvorete","A Coroa",
      "O Luar do Sil","Belondrade Quinta Apolonia",
      "Finca Río Negro Gewürztraminer","Barbazul","Árabe","Emina Rosé"
    ],
    espumoso: [
      "Babot","Gramona Imperial","Tantum Ergo Rosé",
      "Mumm Cordon Rouge Brut","Bollinger Special Cuvée",
      "Jorge Ordóñez N°1"
    ]
  };

  // ------------------------------------------------------
  // INVENTARIO
  // ------------------------------------------------------
  const inventario = [];

  // ------------------------------------------------------
  // ELEMENTOS DOM
  // ------------------------------------------------------
  const buttons = document.querySelectorAll("nav button");
  const pages = document.querySelectorAll(".page");
  const wineList = document.getElementById("wine-list");
  const addForm = document.getElementById("add-wine-form");
  const searchInput = document.getElementById("search-box");
  const searchResults = document.getElementById("search-results");

  console.log("[app] botones nav encontrados:", buttons.length);
  console.log("[app] páginas encontradas:", pages.length);
  console.log("[app] wineList existe?", !!wineList);
  console.log("[app] addForm existe?", !!addForm);
  console.log("[app] searchBox existe?", !!searchInput);

  // ------------------------------------------------------
  // NAVEGACIÓN ENTRE SECCIONES
  // ------------------------------------------------------
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const page = btn.dataset.page;
      pages.forEach(p => p.classList.remove("active"));
      document.getElementById(page).classList.add("active");
      console.log("[app] clic en nav ->", page);
    });
  });

  // ------------------------------------------------------
  // RENDER INVENTARIO
  // ------------------------------------------------------
  function renderInventario() {
    wineList.innerHTML = "";

    inventario.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("wine-item");

      div.innerHTML = `
        <strong>${item.nombre}</strong> — ${item.categoria.toUpperCase()}<br>
        <div class="qty-wrapper" data-id="${index}">
          <button class="qty-btn minus">−</button>
          <input type="number" class="qty-input" value="${item.cantidad}" min="0">
          <button class="qty-btn plus">+</button>
        </div>
      `;

      wineList.appendChild(div);
    });
  }

  // ------------------------------------------------------
  // BOTONES + / −
  // ------------------------------------------------------
  wineList.addEventListener("click", (e) => {
    if (e.target.classList.contains("plus") || e.target.classList.contains("minus")) {
      const wrapper = e.target.closest(".qty-wrapper");
      const input = wrapper.querySelector(".qty-input");
      const index = wrapper.dataset.id;
      let cantidad = parseInt(input.value) || 0;

      if (e.target.classList.contains("plus")) cantidad++;
      else cantidad = Math.max(0, cantidad - 1);

      input.value = cantidad;
      inventario[index].cantidad = cantidad;
      guardarLocalStorage();
    }
  });

  // ------------------------------------------------------
  // EDICIÓN MANUAL
  // ------------------------------------------------------
  wineList.addEventListener("input", (e) => {
    if (e.target.classList.contains("qty-input")) {
      const wrapper = e.target.closest(".qty-wrapper");
      const index = wrapper.dataset.id;
      let cantidad = parseInt(e.target.value) || 0;
      e.target.value = cantidad;
      inventario[index].cantidad = cantidad;
      guardarLocalStorage();
    }
  });

  // ------------------------------------------------------
  // AGREGAR VINO
  // ------------------------------------------------------
  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("wine-name").value;
    const categoria = document.getElementById("wine-category").value;
    const cantidad = parseInt(document.getElementById("wine-count").value);

    inventario.push({ nombre, categoria, cantidad });
    renderInventario();
    guardarLocalStorage();
    addForm.reset();
    alert("Vino agregado correctamente.");
  });

  // ------------------------------------------------------
  // BÚSQUEDA
  // ------------------------------------------------------
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = inventario.filter(v => v.nombre.toLowerCase().includes(query));

    searchResults.innerHTML = filtered.length
      ? filtered.map(v => `<div class="search-item">${v.nombre} — ${v.categoria}</div>`).join("")
      : "<div class='search-item'>No hay resultados</div>";
  });

  // ------------------------------------------------------
  // LOCAL STORAGE
  // ------------------------------------------------------
  function guardarLocalStorage() {
    localStorage.setItem("inventario", JSON.stringify(inventario));
  }

  function cargarLocalStorage() {
    const data = JSON.parse(localStorage.getItem("inventario"));
    if (data && data.length > 0) {
      data.forEach(v => inventario.push(v));
    } else {
      // Inicializar inventario desde la lista de vinos
      Object.keys(vinos).forEach(cat => {
        vinos[cat].forEach(nombre => {
          inventario.push({ nombre, categoria: cat, cantidad: 0 });
        });
      });
    }
    renderInventario();
    console.log("[app] inventario inicializado:", inventario.length, "items");
  }

  cargarLocalStorage();

});
