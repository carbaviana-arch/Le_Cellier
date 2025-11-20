// Utilidades para almacenar y recuperar datos en LocalStorage

const Storage = {
  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error guardando en LocalStorage:', e);
    }
  },

  load(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error cargando desde LocalStorage:', e);
      return null;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error eliminando del LocalStorage:', e);
    }
  },

  clearAll() {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error limpiando LocalStorage:', e);
    }
  }
};

console.log('Storage.js cargado correctamente');