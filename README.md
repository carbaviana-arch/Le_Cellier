Le Celier Manager

Gestor integral para restaurantes y bodegas, diseñado para centralizar las tareas esenciales de un establecimiento: inventario de vinos, pedidos, horarios del personal, eventos y cierres de caja.

Este proyecto es la base inicial del sistema, listo para escalar y conectarse a un backend real (por ejemplo, Firebase Firestore).

⸻

📌 Características principales

✔️ Inventario de vinos
	•	Visualización del stock actual
	•	Detección de productos en estado crítico
	•	Preparado para extender con formulario de altas/bajas

✔️ Pedidos de proveedores
	•	Lista de pedidos pendientes o completados
	•	Estructura base para añadir nuevos pedidos

✔️ Gestión del personal
	•	Vista de turnos del día
	•	Estructura inicial para añadir/editar turnos

✔️ Eventos y calendario
	•	Próximos eventos (catas, reservas grandes, celebraciones)
	•	Preparado para añadir calendario completo

✔️ Cierres de caja
	•	Registro de cierres diarios
	•	Total recaudado por día

✔️ Actividad reciente
	•	Historial de acciones mostradas en la barra lateral

⸻

📁 Estructura del proyecto

/
  index.html
  styles.css
  app.js
  README.md

Más adelante se recomienda pasar a una estructura modular:

/public
  index.html
/src
  /css
    styles.css
  /js
    app.js
    /modules
      inventory.js
      orders.js
      staff.js
      events.js
      cash.js
README.md


⸻

🚀 Cómo usar
	1.	Descarga o clona el repositorio.
	2.	Simplemente abre index.html en tu navegador.
	3.	Todos los datos son mock (almacenados en memoria) y se reinician con cada recarga.

No requiere servidor ni instalación adicional.

⸻

🛠️ Tecnologías usadas
	•	HTML5 para la estructura principal
	•	CSS3 (estilo bohemio/moderno inspirado en bodegas de vino)
	•	JavaScript puro para manejar la interfaz y el estado local
	•	Preparado para integrarse con Firebase, Node.js o Supabase si el proyecto escala

⸻

🧩 Próximos pasos recomendados

🔹 Corto plazo
	•	Separar módulos en distintos archivos JS
	•	Agregar formularios reales (alta/modificación)
	•	Añadir confirmaciones y diálogos
	•	Mejorar el dock inferior con iconos SVG definitivos
	•	Añadir modo offline con localStorage

🔹 Medio plazo
	•	Autenticación de usuarios (Firebase Auth)
	•	Base de datos en Firestore
	•	Sistema de roles (gestor, camarero, cocina)
	•	Exportación de informes en PDF/CSV

🔹 Largo plazo
	•	Migración a React + Firebase
	•	Progressive Web App (PWA)
	•	Multiestablecimiento
	•	Integración con TPV o PMS (si aplica)

⸻

📜 Licencia

Este proyecto está bajo licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente.

⸻

👨‍🍳 Autor

Proyecto desarrollado en colaboración entre Francisco Carballo y ChatGPT. Diseñado para uso real en restaurantes con un enfoque profesional, elegante y escalable.

¡Salud y buenos vinos! 🍷