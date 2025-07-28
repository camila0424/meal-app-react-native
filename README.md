# Recipe Explorer App

Aplicación multiplataforma (React Native + Web) para explorar recetas de comida, filtrarlas por categoría, ver detalles y estadísticas de visitas.

---

## Demo mobile

¡Así funciona la app! 👇

![Demo de la app mobile](./assets/demo/demo-mobile.gif)

## Descripción

Recipe Explorer es una app que consume la API pública de [TheMealDB](https://www.themealdb.com/api.php) para mostrar recetas de diferentes categorías. Permite filtrar las recetas, navegar a detalle de cada una y visualizar un contador de visitas por receta.

La app está desarrollada con React Native y funciona tanto en móviles (iOS/Android) como en web, con diseño responsive y optimizado para distintas resoluciones.

---

## Características principales

- Listado dinámico de recetas con imágenes, nombre, región y breve descripción.
- Filtro por categorías: Beef, Chicken, Dessert, Vegetarian, y opción "Todas".
- Contador de visitas que guarda localmente la cantidad de veces que se ha visitado cada receta.
- Navegación sencilla con stack navigator (pantalla principal y detalle).
- Diseño responsive con soporte para múltiples columnas en web.
- Animaciones suaves al mostrar las tarjetas.
- Componente de filtro centrado, con diseño adaptable y cómodo para usuario.

---

## Tecnologías usadas

- React Native (Expo)
- React Navigation (stack navigator)
- react-native-picker-select (selector de categorías)
- TheMealDB API (datos de recetas)
- React Native Safe Area Context (áreas seguras)
- Hooks y animaciones nativas
- JavaScript moderno (ES6+)

---

## Instalación y ejecución

1. Clona este repositorio:

   git clone https://github.com/camila0424/meal-app-react-native.git
   cd recipe-explorer

   npm install

2. Instala dependencias:
   npm install

3. Ejecuta la app:
   - En móvil con Expo Go:
     npm start

   - En web:
     npm run web

## Estructura del proyecto

    /components

- Main.jsx # Componente principal que lista recetas y filtro
- MealCard.jsx # Tarjeta individual de receta con animación
- MealDetail.jsx # Pantalla detalle de receta
  /form - FilteredForm.jsx # Componente filtro de categorías
  /lib
- visitTracker.js # Lógica para contar visitas locales
  App.js # Entry point con navegación

## Diseño y Responsividad

- Uso de useWindowDimensions para detectar tamaño de pantalla.

- Layout en web con flexWrap y tres columnas para mejorar visualización.

- Componente filtro centrado y adaptable con padding y ancho máximo.

- Animaciones en las tarjetas para una experiencia suave.

![Demo en la web](./assets/demo/demo-desktop.gif)

## Personalización

- Puedes cambiar categorías, estilos y endpoints API modificando los componentes principales:

- Modifica las categorías en FilteredForm.jsx en el array items.

- Cambia colores y estilos en los archivos .jsx y StyleSheet.

- Ajusta la cantidad de columnas modificando el breakpoint y los estilos en Main.jsx.

## Contribuciones

¡Bienvenidas! Si quieres aportar mejoras o reportar problemas, abre un issue o un pull request.

## Licencia

MIT License © 2025 Camila Bedoya

## Contacto

Camila Bedoya
GitHub: https://github.com/camila0424
LinkedIn: https://www.linkedin.com/in/camila-bedoya/
