// ==================== VARIABLES ====================
const form = document.getElementById("form");
const lista = document.getElementById("lista");
const presupuestoInput = document.getElementById("presupuesto");
const totalSpan = document.getElementById("total");
const restanteSpan = document.getElementById("restante");
const gastadoSpan = document.getElementById("gastado");
const resumenModal = document.getElementById("resumenModal");
const abrirResumenBtn = document.getElementById("abrirResumen");
const cerrarResumenBtn = document.getElementById("cerrarResumen");
const resumenTabla = document.getElementById("resumenTabla");

let presupuesto = 0;
let compras = [];

// ==================== MODO OSCURO ====================
const darkModeToggle = document.getElementById("modoOscuro");
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

// ==================== ACTUALIZAR ESTADÍSTICAS ====================
function actualizarStats() {
    let total = compras.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    let gastado = compras.filter(i => i.comprado).reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    let restante = presupuesto - gastado;

    totalSpan.textContent = total.toFixed(2) + " €";
    gastadoSpan.textContent = gastado.toFixed(2) + " €";
    restanteSpan.textContent = restante.toFixed(2) + " €";

    if (restante < 0) {
        restanteSpan.classList.add("negative");
    } else {
        restanteSpan.classList.remove("negative");
    }
}

// ==================== MOSTRAR LISTA ====================
function mostrarLista() {
    lista.innerHTML = "";

    // Orden: no comprados primero, luego comprados
    const ordenados = [...compras].sort((a, b) => a.comprado - b.comprado);

    ordenados.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${item.nombre}</strong> - ${item.categoria}  
            <span>${item.cantidad} × ${item.precio.toFixed(2)} € = ${(item.precio * item.cantidad).toFixed(2)} €</span>
            <button class="comprar-btn">${item.comprado ? "✔" : "🛒"}</button>
            <button class="eliminar-btn">🗑</button>
        `;

        if (item.comprado) li.classList.add("comprado");

        // Botón comprar
        li.querySelector(".comprar-btn").addEventListener("click", () => {
            compras[index].comprado = !compras[index].comprado;
            mostrarLista();
            actualizarStats();
        });

        // Botón eliminar
        li.querySelector(".eliminar-btn").addEventListener("click", () => {
            compras.splice(index, 1);
            mostrarLista();
            actualizarStats();
        });

        lista.appendChild(li);
    });
}

// ==================== AGREGAR ITEM ====================
form.addEventListener("submit", e => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const precio = parseFloat(document.getElementById("precio").value);
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const categoria = document.getElementById("categoria").value;

    if (!nombre || isNaN(precio) || isNaN(cantidad)) {
        alert("Por favor completa todos los campos");
        return;
    }

    compras.push({
        nombre,
        precio,
        cantidad,
        categoria,
        comprado: false
    });

    form.reset();
    mostrarLista();
    actualizarStats();
});

// ==================== PRESUPUESTO ====================
presupuestoInput.addEventListener("change", () => {
    presupuesto = parseFloat(presupuestoInput.value) || 0;
    actualizarStats();
});

// ==================== MODAL DE RESUMEN ====================
abrirResumenBtn.addEventListener("click", () => {
    resumenTabla.innerHTML = compras.map(item => `
        <tr>
            <td>${item.nombre}</td>
            <td>${item.cantidad}</td>
            <td>${item.precio.toFixed(2)} €</td>
            <td>${(item.precio * item.cantidad).toFixed(2)} €</td>
        </tr>
    `).join("");
    resumenModal.style.display = "flex";
});

cerrarResumenBtn.addEventListener("click", () => {
    resumenModal.style.display = "none";
});
