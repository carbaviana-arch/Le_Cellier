let lista = JSON.parse(localStorage.getItem('lista')) || [];
let presupuesto = parseFloat(localStorage.getItem('presupuesto')) || 0;

const listaEl = document.getElementById('lista');
const totalEl = document.getElementById('total-compra');
const presEl = document.getElementById('presupuesto-restante');
const modal = document.getElementById('modal-resumen');
const tabla = document.getElementById('tabla-resumen');
const btnTema = document.getElementById('btn-tema');
const btnResumen = document.getElementById('btn-resumen');

// Guardar datos
function guardarLista() { localStorage.setItem('lista', JSON.stringify(lista)); }
function guardarPres() { localStorage.setItem('presupuesto', presupuesto); }

// Renderizar lista
function renderLista() {
    listaEl.innerHTML = "";
    lista.sort((a, b) => (a.comprado === b.comprado) ? 0 : a.comprado ? 1 : -1);

    lista.forEach((item, i) => {
        const li = document.createElement("li");
        li.className = item.comprado ? "comprado" : "";

        // Nombre y categoría
        const nombreSpan = document.createElement("span");
        nombreSpan.innerHTML = `${item.nombre} <small>${item.categoria}</small>`;
        // Marcar como comprado al tocar
        nombreSpan.addEventListener("click", () => toggleComprado(i));

        // Subtotal
        const subtotal = document.createElement("span");
        subtotal.textContent = `€${item.precio.toFixed(2)} × ${item.cantidad} = €${(item.precio * item.cantidad).toFixed(2)}`;

        // Botones de cantidad y eliminar
        const btnMenos = document.createElement("button");
        btnMenos.textContent = "−";
        btnMenos.onclick = e => { e.stopPropagation(); cambiarCantidad(i, -1); };

        const cantidadSpan = document.createElement("span");
        cantidadSpan.textContent = item.cantidad;

        const btnMas = document.createElement("button");
        btnMas.textContent = "+";
        btnMas.onclick = e => { e.stopPropagation(); cambiarCantidad(i, 1); };

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "🗑";
        btnEliminar.onclick = () => eliminar(i);

        const accionesDiv = document.createElement("div");
        accionesDiv.append(btnMenos, cantidadSpan, btnMas, btnEliminar);

        li.append(nombreSpan, subtotal, accionesDiv);
        listaEl.appendChild(li);
    });

    actualizarTotales();
}

// Actualizar totales y presupuesto
function actualizarTotales() {
    const total = lista.reduce((acc, it) => acc + it.precio * it.cantidad, 0);
    totalEl.textContent = `Total: €${total.toFixed(2)}`;

    if (presupuesto > 0) {
        const rest = presupuesto - total;
        presEl.textContent = `Presupuesto restante: €${rest.toFixed(2)}`;
        presEl.classList.toggle('negative', rest < 0);
    } else {
        presEl.textContent = 'Presupuesto: —';
        presEl.classList.remove('negative');
    }
}

// Marcar/desmarcar comprado
function toggleComprado(i) {
    lista[i].comprado = !lista[i].comprado;
    guardarLista();
    renderLista();
}

// Cambiar cantidad
function cambiarCantidad(i, d) {
    lista[i].cantidad = Math.max(1, (lista[i].cantidad || 1) + d);
    guardarLista();
    renderLista();
}

// Eliminar producto
function eliminar(i) {
    if (confirm(`¿Eliminar "${lista[i].nombre}"?`)) {
        lista.splice(i, 1);
        guardarLista();
        renderLista();
    }
}

// Formulario para agregar producto
document.getElementById('form-producto').addEventListener('submit', e => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const precio = parseFloat(document.getElementById('precio').value);
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const categoria = document.getElementById('categoria').value;

    if (!nombre || isNaN(precio) || isNaN(cantidad)) return;

    lista.push({ nombre, precio, cantidad, categoria, comprado: false });
    guardarLista();
    renderLista();
    e.target.reset();
    document.getElementById('cantidad').value = 1;
    document.getElementById('nombre').focus();
});

// Modal Resumen Compra
btnResumen.textContent = "Resumen Compra";
btnResumen.addEventListener('click', () => {
    const resumen = {};
    let total = 0;

    lista.forEach(it => {
        resumen[it.categoria] = (resumen[it.categoria] || 0) + it.precio * it.cantidad;
        total += it.precio * it.cantidad;
    });

    tabla.innerHTML = Object.keys(resumen).map(cat =>
        `<tr><td>${cat}</td><td style="text-align:right">€${resumen[cat].toFixed(2)}</td></tr>`
    ).join('') + `<tr><td><strong>Total</strong></td><td style="text-align:right"><strong>€${total.toFixed(2)}</strong></td></tr>`;

    modal.style.display = 'flex';
});

// Cerrar modal
document.getElementById('cerrar-modal').addEventListener('click', () => modal.style.display = 'none');
modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

// Presupuesto
document.getElementById('btn-presupuesto').addEventListener('click', () => {
    const nuevo = prompt('Introduce tu presupuesto (€):', presupuesto || '');
    if (nuevo !== null && !isNaN(parseFloat(nuevo))) {
        presupuesto = parseFloat(nuevo);
        guardarPres();
        actualizarTotales();
    }
});

// Modo oscuro
btnTema.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    btnTema.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Inicializar
renderLista();
