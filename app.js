// ==================== VARIABLES ====================
const form = document.getElementById("form");
const listaEl = document.getElementById("lista");
const presupuestoInput = document.getElementById("presupuesto");
const totalSpan = document.getElementById("total");
const gastadoSpan = document.getElementById("gastado");
const restanteSpan = document.getElementById("restante");
const resumenModal = document.getElementById("resumenModal");
const abrirResumenBtn = document.getElementById("abrirResumen");
const cerrarResumenBtn = document.getElementById("cerrarResumen");
const resumenTabla = document.getElementById("resumenTabla");
const darkModeToggle = document.getElementById("modoOscuro");

let presupuesto = parseFloat(localStorage.getItem("presupuesto")) || 0;
let compras = JSON.parse(localStorage.getItem("compras")) || [];

// ==================== MODO OSCURO ====================
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
}

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});

// ==================== GUARDAR EN LOCALSTORAGE ====================
function guardarDatos() {
    localStorage.setItem("compras", JSON.stringify(compras));
    localStorage.setItem("presupuesto", presupuesto);
}

// ==================== ESTADÍSTICAS ====================
function actualizarStats() {
    const total = compras.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    const gastado = compras.filter(item => item.comprado).reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    const restante = presupuesto - gastado;

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
    listaEl.innerHTML = "";

    const ordenados = [...compras].sort((a, b) => a.comprado - b.comprado);

    ordenados.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = item.comprado ? "comprado" : "";

        li.innerHTML = `
            <span>
                <strong>${item.nombre}</strong> (${item.categoria}) 
                - ${item.cantidad} × ${item.precio.toFixed(2)} € = ${(item.precio*item.cantidad).toFixed(2)} €
            </span>
            <div>
                <button class="comprar-btn">${item.comprado ? "✔" : "🛒"}</button>
                <button class="eliminar-btn">🗑</button>
            </div>
        `;

        li.querySelector(".comprar-btn").addEventListener("click", () => {
            compras[index].comprado = !compras[index].comprado;
            guardarDatos();
            mostrarLista();
            actualizarStats();
        });

        li.querySelector(".eliminar-btn").addEventListener("click", () => {
            if (confirm(`¿Eliminar "${item.nombre}"?`)) {
                compras.splice(index, 1);
                guardarDatos();
                mostrarLista();
                actualizarStats();
            }
        });

        listaEl.appendChild(li);
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

    guardarDatos();
    form.reset();
    mostrarLista();
    actualizarStats();
});

// ==================== PRESUPUESTO ====================
presupuestoInput.value = presupuesto > 0 ? presupuesto : "";
presupuestoInput.addEventListener("change", () => {
    presupuesto = parseFloat(presupuestoInput.value) || 0;
    guardarDatos();
    actualizarStats();
});

// ==================== MODAL DE RESUMEN ====================
abrirResumenBtn.addEventListener("click", () => {
    resumenTabla.innerHTML = compras.map(item => `
        <tr>
            <td>${item.nombre}</td>
            <td>${item.cantidad}</td>
            <td>${item.precio.toFixed(2)} €</td>
            <td>${(item.precio*item.cantidad).toFixed(2)} €</td>
        </tr>
    `).join("");
    resumenModal.style.display = "flex";
});

cerrarResumenBtn.addEventListener("click", () => {
    resumenModal.style.display = "none";
});

resumenModal.addEventListener("click", e => {
    if (e.target === resumenModal) resumenModal.style.display = "none";
});

// ==================== INICIALIZACIÓN ====================
mostrarLista();
actualizarStats();
