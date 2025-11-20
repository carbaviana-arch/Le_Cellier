// =============================================
// Le Celier Manager - app.js (versión inicial)
// =============================================
// Esta base permite que el dashboard funcione en local
// Más adelante conectaremos con Firestore o backend.

console.log("Le Celier Manager iniciado.");

// ------------------------------
// Mock data temporal
// ------------------------------
const db = {
  inventory: [
    { id: "v1", name: "Chardonnay 2020", stock: 12, critical: false },
    { id: "v2", name: "Tempranillo Reserva", stock: 3, critical: true },
    { id: "v3", name: "Albariño", stock: 8, critical: false }
  ],

  orders: [
    { id: "o1", supplier: "Distrib. Rioja", status: "pendiente", total: 120 }
  ],

  staff: [
    { id: "s1", name: "Adri", shift: "10:00-18:00" },
    { id: "s2", name: "Mariia", shift: "12:00-20:00" }
  ],

  events: [
    { id: "e1", title: "Cata privada", date: "2025-12-05" }
  ],

  cash: [
    { id: "c1", date: "2025-11-18", total: 842 }
  ],

  activity: []
};

// ----------------------------------
// Utilidades
// ----------------------------------
function logActivity(text) {
  db.activity.unshift({ text, timestamp: new Date() });
  renderActivity();
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

// ----------------------------------
// Navegación modular
// ----------------------------------
function openModule(moduleName) {
  const container = document.getElementById("module-container");
  container.innerHTML = "";

  // Reset dock active
  document.querySelectorAll(".dock button").forEach(b => b.classList.remove("active"));
  const dockBtn = document.querySelector(`.dock button[onclick="openModule('${moduleName}')"]`);
  if (dockBtn) dockBtn.classList.add("active");

  switch (moduleName) {
    case "inventory":
      container.innerHTML = renderInventory();
      break;
    case "orders":
      container.innerHTML = renderOrders();
      break;
    case "staff":
      container.innerHTML = renderStaff();
      break;
    case "events":
      container.innerHTML = renderEvents();
      break;
    case "cash":
      container.innerHTML = renderCash();
      break;
    default:
      container.innerHTML = "";
  }
}

// ----------------------------------
// Render: Inventario
// ----------------------------------
function renderInventory() {
  const rows = db.inventory
    .map(v => `
      <tr>
        <td>${v.name}</td>
        <td>${v.stock}</td>
        <td>${v.critical ? "⚠️" : "✔️"}</td>
      </tr>`)
    .join("");

  return `
    <h2>Inventario de Vinos</h2>
    <table>
      <thead><tr><th>Nombre</th><th>Stock</th><th>Estado</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

// ----------------------------------
// Render: Pedidos
// ----------------------------------
function renderOrders() {
  const rows = db.orders
    .map(o => `
      <tr>
        <td>${o.supplier}</td>
        <td>${o.status}</td>
        <td>${o.total} €</td>
      </tr>`)
    .join("");

  return `
    <h2>Pedidos</h2>
    <table>
      <thead><tr><th>Proveedor</th><th>Estado</th><th>Total</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

// ----------------------------------
// Render: Personal
// ----------------------------------
function renderStaff() {
  const rows = db.staff
    .map(s => `
      <tr>
        <td>${s.name}</td>
        <td>${s.shift}</td>
      </tr>`)
    .join("");

  return `
    <h2>Turnos del Personal</h2>
    <table>
      <thead><tr><th>Nombre</th><th>Turno</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

// ----------------------------------
// Render: Eventos
// ----------------------------------
function renderEvents() {
  const rows = db.events
    .map(ev => `
      <tr>
        <td>${ev.title}</td>
        <td>${formatDate(ev.date)}</td>
      </tr>`)
    .join("");

  return `
    <h2>Eventos</h2>
    <table>
      <thead><tr><th>Evento</th><th>Fecha</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

// ----------------------------------
// Render: Cierres de Caja
// ----------------------------------
function renderCash() {
  const rows = db.cash
    .map(c => `
      <tr>
        <td>${formatDate(c.date)}</td>
        <td>${c.total} €</td>
      </tr>`)
    .join("");

  return `
    <h2>Cierres de Caja</h2>
    <table>
      <thead><tr><th>Fecha</th><th>Total</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

// ----------------------------------
// Actividad reciente
// ----------------------------------
function renderActivity() {
  const box = document.getElementById("activity-list");
  if (!box) return;

  if (db.activity.length === 0) {
    box.innerHTML = "Sin actividad por ahora.";
    return;
  }

  box.innerHTML = db.activity
    .map(a => `<div>• ${a.text} <span class='muted'>(${a.timestamp.toLocaleTimeString()})</span></div>`)
    .join("");
}

// Inicializar resúmenes rápidos
function updateSummaries() {
  document.getElementById("inventory-summary").textContent = `Total: ${db.inventory.length} · Críticos: ${db.inventory.filter(v=>v.critical).length}`;
  document.getElementById("orders-summary").textContent = `Pendientes: ${db.orders.length}`;
  document.getElementById("staff-summary").textContent = `Turnos hoy: ${db.staff.length}`;
  document.getElementById("events-summary").textContent = db.events.length ? `Próx: ${db.events[0].title}` : "-";
  document.getElementById("cash-summary").textContent = db.cash.length ? `Último: ${formatDate(db.cash[0].date)}` : "-";
}

// ----------------------------------
// Inicio
// ----------------------------------
window.addEventListener("DOMContentLoaded", () => {
  updateSummaries();
  renderActivity();
});