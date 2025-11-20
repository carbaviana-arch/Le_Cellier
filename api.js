// Funciones para conectarse a una API o backend (preparado para Firebase, Node.js, etc.)

const Api = {
  async get(endpoint) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Error en GET: ' + response.status);
      return await response.json();
    } catch (e) {
      console.error('Error GET:', e);
      return null;
    }
  },

  async post(endpoint, data) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Error en POST: ' + response.status);
      return await response.json();
    } catch (e) {
      console.error('Error POST:', e);
      return null;
    }
  },

  async put(endpoint, data) {
    try {
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Error en PUT: ' + response.status);
      return await response.json();
    } catch (e) {
      console.error('Error PUT:', e);
      return null;
    }
  },

  async delete(endpoint) {
    try {
      const response = await fetch(endpoint, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error en DELETE: ' + response.status);
      return await response.json();
    } catch (e) {
      console.error('Error DELETE:', e);
      return null;
    }
  }
};

console.log('Api.js cargado correctamente');