// app.js - versión robusta para navegación y debug
document.addEventListener('DOMContentLoaded', () => {
  console.log('[app] DOMContentLoaded - iniciando app');

  // LISTA INICIAL DE VINOS (puedes mantener la tuya)
  const vinos = {
    tinto: [ /* ... */ ],
    blanco: [ /* ... */ ],
    espumoso: [ /* ... */ ],
    dulce: [ /* ... */ ]
  };

  // (Si quieres mantener la lista completa, pégala aquí.
  // Para mantener este snippet corto, asumo que ya la tienes
  // en tu archivo; si no, pega la lista completa como antes.)
  // ------------------------------------------------------

  // Inventario dinámico
  const inventario = [];

  // Selección DOM
  const navButtons = document.querySelectorAll('nav button');
  const pages = document.querySelectorAll('.page');
  const wineList = document.getElementById('wine-list');
  const addForm = document.getElementById('add-wine-form');
  const searchInput = document.getElementById('search-box');
  const searchResults = document.getElementById('search-results');

  // DEBUG: informa si los elementos existen
  console.log('[app] botones nav encontrados:', navButtons.length);
  console.log('[app] páginas encontradas:', pages.length);
  console.log('[app] wineList existe?', !!wineList);
  console.log('[app] addForm existe?', !!addForm);
  console.log('[app] searchBox existe?', !!searchInput);

  // Navegación: delegación segura
  if (navButtons.length > 0 && pages.length > 0) {
    navButtons.forEach(btn => {
      btn.addEventListener('click', (ev) => {
        const target = btn.dataset.page;
        console.log('[app] clic en nav ->', target);
        if (!target) return;

        pages.forEach(p => p.classList.remove('active'));
        const pageEl = document.getElementById(target);
        if (pageEl) pageEl.classList.add('active');
      });
    });
  } else {
    console.warn('[app] No se ha inicializado la navegación (botones o páginas no encontrados).');
  }

  // Render inventario
  function renderInventario() {
    if (!wineList) return;
    wineList.innerHTML = '';
    inventario.forEach(item => {
      const div = document.createElement('div');
      div.className = 'wine-item';
      div.innerHTML = `<strong>${item.nombre}</strong> — ${item.categoria.toUpperCase()}<br>Cantidad: ${item.cantidad}`;
      wineList.appendChild(div);
    });
  }

  // Agregar vino (si existe el formulario)
  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = (document.getElementById('wine-name') || {}).value || '';
      const categoria = (document.getElementById('wine-category') || {}).value || 'tinto';
      const cantidadRaw = (document.getElementById('wine-count') || {}).value;
      const cantidad = parseInt(cantidadRaw, 10);

      if (!nombre || isNaN(cantidad)) {
        alert('Completa correctamente el nombre y la cantidad.');
        return;
      }

      inventario.push({ nombre, categoria, cantidad });
      renderInventario();
      addForm.reset();
      console.log('[app] Vino agregado:', nombre, categoria, cantidad);
    });
  }

  // Búsqueda básica (si existe caja)
  if (searchInput && searchResults) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      const allWines = Object.keys(vinos).flatMap(cat => vinos[cat].map(n => ({ nombre: n, categoria: cat })));
      const filtered = allWines.filter(w => w.nombre.toLowerCase().includes(q));
      searchResults.innerHTML = filtered.map(w => `<div class="search-item">${w.nombre} — ${w.categoria}</div>`).join('') || '<div class="search-item">No hay resultados</div>';
    });
  }

  // Inicializar inventario con cantidad 0 (si no quieres esto, quita la función)
  function initInventario() {
    Object.keys(vinos).forEach(cat => {
      vinos[cat].forEach(nombre => {
        inventario.push({ nombre, categoria: cat, cantidad: 0 });
      });
    });
    renderInventario();
    console.log('[app] inventario inicializado:', inventario.length, 'items');
  }

  initInventario();
});
