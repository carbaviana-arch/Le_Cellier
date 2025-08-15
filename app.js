// Modo oscuro
const toggleDark = document.getElementById("toggle-dark");
if (localStorage.getItem("dark-mode") === "true") {
    document.body.classList.add("dark-mode");
}
toggleDark.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode"));
});

// Elementos
const lista = document.getElementById("lista");
const productoInput = document.getElementById("producto");
const precioInput = document.getElementById("precio");
const cantidadInput = document.getElementById("cantidad");
const categoriaInput = document.getElementById("categoria");
const agregarBtn = document.getElementById("agregar");

const totalEl = document.getElementById("total");
const restanteEl = document.getElementById("restante");

let items = [];

// Agregar producto
agregarBtn.addEventListener("click", () => {
    const producto = productoInput.value.trim();
    const precio = parseFloat(precioInput.value) || 0;
    const cantidad = parseInt(cantidadInput.value) || 1;
    const categoria = categoriaInput.value;

    if (!producto) return;

    const subtotal = precio * cantidad;
    items.push({ producto, precio, cantidad, subtotal, categoria, comprado: false });
    renderLista();

    productoInput.value = "";
    precioInput.value = "";
    cantidadInput.value = 1;
});

// Renderizar lista
function renderLista() {
    lista.innerHTML = "";
    let total = 0;
    let gastado = 0;

    items.forEach((item, index) => {
        if (!item.comprado) total += item.subtotal;
        if (item.comprado) gastado += item.subtotal;

        const li = document.createElement("li");
        if (item.comprado) li.classList.add("comprado");

        li.innerHTML = `
            <span>${item.producto} (${item.categoria}) - ${item.cantidad} x ${item.precio.toFixed(2)}€</span>
            <strong>${item.subtotal.toFixed(2)}€</strong>
            <button onclick="toggleComprado(${index})">✅</button>
            <button onclick="eliminarItem(${index})">🗑️</button>
        `;

        lista.appendChild(li);
    });

    totalEl.textContent = total.toFixed(2);
    restanteEl.textContent = (total - gastado).toFixed(2);
}

// Marcar como comprado
function toggleComprado(index) {
    items[index].comprado = !items[index].comprado;
    items.sort((a, b) => a.comprado - b.comprado);
    renderLista();
}

// Eliminar item
function eliminarItem(index) {
    items.splice(index, 1);
    renderLista();
}
