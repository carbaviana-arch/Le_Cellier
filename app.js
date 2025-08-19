{
  "name": "Le Cellier - Lista de Compras",
  "short_name": "Le Cellier",
  "description": "Gestor de lista de compras moderno, con presupuesto y resumen por categoría.",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#f2f2f7",
  "theme_color": "#0a84ff",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
let lista = JSON.parse(localStorage.getItem('lista')) || [];
let presupuesto = parseFloat(localStorage.getItem('presupuesto')) || 0;

const listaEl = document.getElementById('lista');
const totalEl = document.getElementById('total-compra');
const presEl = document.getElementById('presupuesto-restante');
const modal = document.getElementById('modal-resumen');
const tabla = document.getElementById('tabla-resumen');
const btnTema = document.getElementById('btn-tema');

function guardarLista(){ localStorage.setItem('lista', JSON.stringify(lista)); }
function guardarPres(){ localStorage.setItem('presupuesto', presupuesto); }

function renderLista(){
  listaEl.innerHTML = '';
  lista.sort((a,b)=>(a.comprado===b.comprado)?0:a.comprado?1:-1);

  lista.forEach((item,i)=>{
    const li = document.createElement('li');

    if(item.comprado) li.classList.add('comprado');

    const nombre = document.createElement('span');
    nombre.className = 'nombre';
    nombre.textContent = item.nombre;
    nombre.addEventListener('click', ()=> toggleComprado(i));

    const categoria = document.createElement('span');
    categoria.className = 'categoria';
    categoria.textContent = item.categoria;

    const subtotal = document.createElement('span');
    subtotal.className = 'subtotal';
    subtotal.textContent = `€${(item.precio*item.cantidad).toFixed(2)}`;

    const btnMenos = document.createElement('button');
    btnMenos.textContent = '−';
    btnMenos.className = 'btn-cant';
    btnMenos.onclick = e=> { e.stopPropagation(); cambiarCantidad(i,-1); };

    const cantidad = document.createElement('span');
    cantidad.textContent = item.cantidad;

    const btnMas = document.createElement('button');
    btnMas.textContent = '+';
    btnMas.className = 'btn-cant';
    btnMas.onclick = e=> { e.stopPropagation(); cambiarCantidad(i,1); };

    const cantWrapper = document.createElement('div');
    cantWrapper.style.display = 'flex';
    cantWrapper.style.gap = '4px';
    cantWrapper.append(btnMenos,cantidad,btnMas);

    li.append(nombre, categoria, subtotal, cantWrapper);
    listaEl.appendChild(li);

    // --- Swipe to delete ---
    let startX=0, currentX=0, threshold=100;
    li.addEventListener('touchstart', e=>{ startX=e.touches[0].clientX; });
    li.addEventListener('touchmove', e=>{
      currentX = e.touches[0].clientX;
      const dx = currentX - startX;
      li.style.transform = `translateX(${dx}px)`;
      li.classList.toggle('swiping', dx < -10);
    });
    li.addEventListener('touchend', ()=>{
      const dx = currentX - startX;
      li.style.transform = `translateX(0)`;
      li.classList.remove('swiping');
      if(dx < -threshold){
        if(confirm(`¿Eliminar "${item.nombre}"?`)){
          lista.splice(i,1);
          guardarLista();
          renderLista();
        }
      }
    });
  });

  actualizarTotales();
}

function actualizarTotales(){
  const total = lista.reduce((acc,it)=>acc+it.precio*it.cantidad,0);
  totalEl.textContent = `Total: €${total.toFixed(2)}`;
  if(presupuesto>0){
    const rest = presupuesto - total;
    presEl.textContent = `Presupuesto restante: €${rest.toFixed(2)}`;
    presEl.classList.toggle('negative', rest<0);
  } else {
    presEl.textContent = 'Presupuesto: —';
    presEl.classList.remove('negative');
  }
}

function toggleComprado(i){
  lista[i].comprado = !lista[i].comprado;
  guardarLista();
  renderLista();
}

function cambiarCantidad(i,d){
  lista[i].cantidad = Math.max(1,(lista[i].cantidad||1)+d);
  guardarLista();
  renderLista();
}

document.getElementById('form-producto').addEventListener('submit', e=>{
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const precio = parseFloat(document.getElementById('precio').value);
  const cantidad = parseInt(document.getElementById('cantidad').value);
  const categoria = document.getElementById('categoria').value;
  if(!nombre || isNaN(precio) || isNaN(cantidad)) return;
  lista.push({ nombre, precio, cantidad, categoria, comprado:false });
  guardarLista();
  renderLista();
  e.target.reset();
  document.getElementById('cantidad').value=1;
  document.getElementById('nombre').focus();
});

document.getElementById('btn-resumen').addEventListener('click', ()=>{
  const resumen = {};
  let total = 0;
  lista.forEach(it=>{
    resumen[it.categoria]=(resumen[it.categoria]||0)+it.precio*it.cantidad;
    total += it.precio*it.cantidad;
  });
  tabla.innerHTML = Object.keys(resumen).map(cat=>
    `<tr><td>${cat}</td><td style="text-align:right">€${resumen[cat].toFixed(2)}</td></tr>`
  ).join('') + `<tr><td><strong>Total</strong></td><td style="text-align:right"><strong>€${total.toFixed(2)}</strong></td></tr>`;
  modal.style.display='flex';
});

document.getElementById('cerrar-modal').addEventListener('click', ()=> modal.style.display='none');
modal.addEventListener('click', e=>{ if(e.target===modal) modal.style.display='none'; });

document.getElementById('btn-presupuesto').addEventListener('click', ()=>{
  const nuevo = prompt('Introduce tu presupuesto (€):', presupuesto||'');
  if(nuevo!==null && !isNaN(parseFloat(nuevo))){
    presupuesto = parseFloat(nuevo);
    guardarPres();
    actualizarTotales();
  }
});

btnTema.addEventListener('click', ()=>{
  document.body.classList.toggle('dark-mode');
  btnTema.textContent = document.body.classList.contains('dark-mode')?'☀️':'🌙';
});

renderLista();
