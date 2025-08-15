// ==================== VARIABLES ====================
const form = document.getElementById("form-producto");
const listaEl = document.getElementById("lista");
const totalEl = document.getElementById("total-compra");
const presEl = document.getElementById("presupuesto-restante");
const modal = document.getElementById("modal-resumen");
const tabla = document.getElementById("tabla-resumen");
const btnTema = document.getElementById("btn-tema");
const btnPresupuesto = document.getElementById("btn-presupuesto");
const btnResumen = document.getElementById("btn-resumen");
const btnCerrar = document.getElementById("cerrar-modal");

let lista = JSON.parse(localStorage.getItem("lista")) || [];
let presupuesto = parseFloat(localStorage.getItem("presupuesto")) || 0;

// ==================== MODO OSCURO ====================
if (localStorage.getItem("darkMode") === "true") document.body.classList.add("dark-mode");
btnTema.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    btnTema.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

// ==================== GUARDAR DATOS ====================
function guardarLista(){ localStorage.setItem("lista", JSON.stringify(lista)); }
function guardarPres(){ localStorage.setItem("presupuesto", presupuesto); }

// ==================== ESTADÍSTICAS ====================
function actualizarTotales(){
    const total = lista.reduce((sum,it)=>sum+it.precio*it.cantidad,0);
    totalEl.textContent = `Total: €${total.toFixed(2)}`;
    if(presupuesto>0){
        const rest = presupuesto-total;
        presEl.textContent = `Presupuesto restante: €${rest.toFixed(2)}`;
        presEl.classList.toggle("negative", rest<0);
    } else {
        presEl.textContent = "Presupuesto: —";
        presEl.classList.remove("negative");
    }
}

// ==================== MOSTRAR LISTA ====================
function renderLista(){
    listaEl.innerHTML = "";
    lista.sort((a,b)=>(a.comprado===b.comprado)?0:a.comprado?1:-1);
    lista.forEach((item,i)=>{
        const li = document.createElement("li");
        li.className = item.comprado?"comprado":"";
        const subtotal = (item.precio*item.cantidad).toFixed(2);
        li.innerHTML = `
            <span>${item.nombre} (${item.categoria}) - €${item.precio.toFixed(2)} × ${item.cantidad} = €${subtotal}</span>
            <div>
                <button class="comprar-btn">${item.comprado?"✔":"🛒"}</button>
                <button class="eliminar-btn">🗑</button>
            </div>
        `;
        li.querySelector(".comprar-btn").addEventListener("click", ()=>{
            lista[i].comprado = !lista[i].comprado;
            guardarLista();
            renderLista();
            actualizarTotales();
        });
        li.querySelector(".eliminar-btn").addEventListener("click", ()=>{
            if(confirm(`¿Eliminar "${item.nombre}"?`)){
                lista.splice(i,1);
                guardarLista();
                renderLista();
                actualizarTotales();
            }
        });
        listaEl.appendChild(li);
    });
    actualizarTotales();
}

// ==================== AGREGAR PRODUCTO ====================
form.addEventListener("submit", e=>{
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const precio = parseFloat(document.getElementById("precio").value);
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const categoria = document.getElementById("categoria").value;
    if(!nombre || isNaN(precio) || isNaN(cantidad)) return;
    lista.push({nombre, precio, cantidad, categoria, comprado:false});
    guardarLista();
    renderLista();
    e.target.reset();
    document.getElementById("cantidad").value = 1;
    document.getElementById("nombre").focus();
});

// ==================== PRESUPUESTO ====================
btnPresupuesto.addEventListener("click", ()=>{
    const nuevo = prompt("Introduce tu presupuesto (€):", presupuesto||"");
    if(nuevo!==null && !isNaN(parseFloat(nuevo))){
        presupuesto = parseFloat(nuevo);
        guardarPres();
        actualizarTotales();
    }
});

// ==================== RESUMEN ====================
btnResumen.addEventListener("click", ()=>{
    let total = 0;
    const resumen = {};
    lista.forEach(it=>{
        resumen[it.categoria] = (resumen[it.categoria]||0)+it.precio*it.cantidad;
        total += it.precio*it.cantidad;
    });
    tabla.innerHTML = Object.keys(resumen).map(cat=>
        `<tr><td>${cat}</td><td style="text-align:right">€${resumen[cat].toFixed(2)}</td></tr>`
    ).join('') + `<tr><td><strong>Total</strong></td><td style="text-align:right"><strong>€${total.toFixed(2)}</strong></td></tr>`;
    modal.classList.add("show");
});

btnCerrar.addEventListener("click", ()=> modal.classList.remove("show"));
modal.addEventListener("click", e=>{ if(e.target===modal) modal.classList.remove("show"); });

// ==================== INICIALIZACIÓN ====================
renderLista();
actualizarTotales();
