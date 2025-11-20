# Le Celier Manager

Gestor integral para restaurantes y bodegas, diseñado para centralizar todas las tareas esenciales: inventario de vinos, pedidos de bebidas y licores, gestión de personal, eventos y cierres de caja.

Este proyecto está estructurado de manera modular para facilitar mantenimiento y escalabilidad.

---

## 📌 Módulos disponibles

- **Inventario**: Visualización y control de stock de vinos.
- **Pedidos**: Gestión de pedidos de proveedores.
- **Personal**: Control de turnos y horarios del personal.
- **Eventos**: Registro de próximos eventos y calendario.
- **Caja**: Cierres diarios y registro de ingresos.

---

## 📁 Estructura del proyecto

```
/project-root
  index.html
  styles.css
  app.js
  README.md
  /modules
    /inventario
      inventario.html
      inventario.css
      inventario.js
    /pedidos
      pedidos.html
      pedidos.css
      pedidos.js
    /personal
      personal.html
      personal.css
      personal.js
    /eventos
      eventos.html
      eventos.css
      eventos.js
    /caja
      caja.html
      caja.css
      caja.js
  /utils
    storage.js
    api.js
    helpers.js
```

---

## 🚀 Cómo usar

1. Descarga o clona el repositorio.
2. Abre `index.html` en tu navegador.
3. Usa el dock inferior para navegar entre módulos.
4. La sección de actividad reciente mostrará las acciones realizadas.

Todos los datos se almacenan en memoria o LocalStorage; al recargar la página se reinicia.

---

## 🛠️ Tecnologías usadas

- **HTML5** para la estructura de cada módulo.
- **CSS3** con variables y estilos modernos.
- **JavaScript** para la carga dinámica y lógica de cada módulo.
- Preparado para integrarse con **Firebase**, **Node.js** u otros backends.

---

## 🧩 Próximos pasos

- Separar módulos en componentes más pequeños si se escala.
- Integrar backend real (Firestore, Supabase, Node.js).
- Agregar autenticación y roles de usuario.
- Mejorar interfaz y UX con animaciones y notificaciones.
- Exportación de informes y estadísticas.

---

## 📜 Licencia

Proyecto bajo licencia **MIT**. Libre para usar, modificar y distribuir.

---

## 👨‍🍳 Autor
Proyecto desarrollado por **Francisco Carballo** y **ChatGPT**, con enfoque en gestión profesional de restaurantes y bodegas. 🍷