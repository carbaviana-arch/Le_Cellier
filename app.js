// =============================================
// app.js - Controlador principal de la app modular
// =============================================

const moduleMap = {
  inventory: { html: 'modules/inventario/inventario.html', js: 'modules/inventario/inventario.js' },
  orders: { html: 'modules/pedidos/pedidos.html', js: 'modules/pedidos/pedidos.js' },
  staff: { html: 'modules/personal/personal.html', js: 'modules/personal/personal.js' },
  events: { html: 'modules/eventos/eventos.html', js: 'modules/eventos/eventos.js' },
  cash: { html: 'modules/caja/caja.html', js: 'modules/caja/caja.js' }
};

const moduleContainer = document.getElementById('module-container');
const activityList = document.getElementById('activity-list');

// Función para abrir un módulo
async function openModule(moduleKey) {
  if (!moduleMap[moduleKey]) return;

  // Destacar botón activo
  document.querySelectorAll('.dock button').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.dock button[onclick*="${moduleKey}"]`).classList.add('active');

  try {
    // Cargar HTML del módulo
    const response = await fetch(moduleMap[moduleKey].html);
    const html = await response.text();
    moduleContainer.innerHTML = html;

    // Cargar JS del módulo dinámicamente
    const script = document.createElement('script');
    script.src = moduleMap[moduleKey].js;
    document.body.appendChild(script);

    // Registrar actividad
    addActivity(`Se abrió el módulo: ${capitalize(moduleKey)}`);
  } catch (e) {
    console.error('Error cargando módulo:', e);
    moduleContainer.innerHTML = '<p>Error al cargar el módulo.</p>';
  }
}

// Función para registrar actividad reciente
function addActivity(message) {
  const div = document.createElement('div');
  div.textContent = `${new Date().toLocaleTimeString()} - ${message}`;
  activityList.prepend(div);
}

// Capitalizar nombre
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

console.log('App.js cargado correctamente');