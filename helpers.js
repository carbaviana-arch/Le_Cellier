// Funciones auxiliares reutilizables para toda la app

const Helpers = {
  // Formatea números a moneda local
  formatCurrency(value) {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value);
  },

  // Formatea fechas a formato local corto
  formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
  },

  // Genera un ID aleatorio tipo UUID simple
  generateId() {
    return 'id-' + Math.random().toString(36).substr(2, 9);
  },

  // Muestra alertas rápidas en consola o interfaz
  notify(message) {
    console.log('NOTIFY:', message);
    // Aquí se puede conectar con sistema visual de notificaciones
  }
};

console.log('Helpers.js cargado correctamente');