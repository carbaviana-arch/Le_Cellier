// ========================
//   VARIABLES GLOBALES
// ========================
let lista = JSON.parse(localStorage.getItem('lista')) || [];
let presupuesto = parseFloat(localStorage.getItem('presupuesto')) || 0;

const listaEl = document.getElementById('lista');
const totalEl = document.getElementById('total-compra');
const presEl = document.getElementById('presupuesto-restante');
const modal = document.getElementById('modal-resumen');
const tabla = document.getElementById('tabla-resumen');

// ========================
//   RENDERIZAR LISTA
// ========================
function renderLista() {
  listaEl.innerHTML = '';
  lista.forEach((item, index) => {
    const li = document.createElement('li');

    li.innerHTML = `
      <div class="nombre">${item.nombre} (x${item.cantidad})</div>
      <div class="categoria">${item.categoria}</div>
      <div class="subtotal">Subtotal: €${(item.precio * item.cantidad).toFixed(2)}</div>
    `;

    // Marcar como comprado al tocar
    li.addEventListener('click', () => {
      li.classList.toggle('comprado');
      lista.push(lista.splice(index, 1)[0]); // mover al final
      guardarLista();
      renderLista();
    });

    listaEl.appendChild(li);
  });

  actualizarTotales();
}

// ========================
//   TOTALES Y PRESUPUESTO
// ========================
function actualizarTotales() {
  const total = lista.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  totalEl.textContent = `Total: €${total.toFixed(2)}`;

  if (presupuesto > 0) {
    const restante = presupuesto - total;
    presEl.textContent = `Presupuesto: €${restante.toFixed(2)}`;
    presEl.classList.toggle('negative', restante < 0);
  } else {
    presEl.textContent = 'Presupuesto: —';
  }
}

// ========================
//   GUARDAR LISTA
// ========================
function guardarLista() {
  localStorage.setItem('lista', JSON.stringify(lista));
  localStorage.setItem('presupuesto', presupuesto);
}

// ========================
//   FORMULARIO
// ========================
document.getElementById('form-producto').addEventListener('submit', e => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const precio = parseFloat(document.getElementById('precio').value);
  const cantidad = parseInt(document.getElementById('cantidad').value);
  const categoria = document.getElementById('categoria').value;

  if (!nombre || isNaN(precio) || isNaN(cantidad) || !categoria) return;

  lista.push({ nombre, precio, cantidad, categoria });
  guardarLista();
  renderLista();

  e.target.reset();
  document.getElementById('cantidad').value = 1;
});

// ========================
//   PRESUPUESTO
// ========================
document.getElementById('btn-presupuesto').addEventListener('click', () => {
  const nuevo = prompt('Ingrese presupuesto (€):', presupuesto > 0 ? presupuesto : '');
  if (nuevo !== null && !isNaN(parseFloat(nuevo))) {
    presupuesto = parseFloat(nuevo);
    guardarLista();
    actualizarTotales();
  }
});

// ========================
//   MODAL RESUMEN
// ========================
document.getElementById('btn-resumen').addEventListener('click', () => {
  tabla.innerHTML = `
    <tr><th>Producto</th><th>Cant.</th><th>Precio</th><th>Subtotal</th></tr>
  `;

  lista.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.nombre}</td>
      <td>${item.cantidad}</td>
      <td>€${item.precio.toFixed(2)}</td>
      <td>€${(item.precio * item.cantidad).toFixed(2)}</td>
    `;
    tabla.appendChild(tr);
  });

  modal.style.display = 'flex';
});

document.getElementById('cerrar-modal').addEventListener('click', () => {
  modal.style.display = 'none';
});

// ========================
//   INICIALIZAR APP
// ========================
renderLista();

// ========================
//   SWITCH MODO OSCURO
// ========================
const toggleDark = document.getElementById('toggle-dark');

// Leer estado guardado
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  toggleDark.checked = true;
}

toggleDark.addEventListener('change', () => {
  if (toggleDark.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
});