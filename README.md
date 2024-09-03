# Proyecto React con Autenticación

Este proyecto es una aplicación React que utiliza Redux para la gestión del estado, junto con una autenticación de usuario. A continuación, se detallan los pasos para configurar y ejecutar el proyecto, así como la información necesaria para realizar un login exitoso.

## Requisitos

Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes programas:

- Node.js (Versión 14 o superior)
- npm (Versión 6 o superior)

## Instalación

1. Clona el repositorio en tu máquina local:
   ```bash
   git clone https://github.com/tu-usuario/nombre-del-proyecto.git
   ```
2. Accede al directorio del proyecto:

   ```bash
   cd luis-angel-velazquez-palomino-react-test
   ```

3. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

## Ejecución en Desarrollo

Para ejecutar el proyecto en modo desarrollo, utiliza el siguiente comando:

```bash
npm run dev
```

Este comando iniciará un servidor de desarrollo y la aplicación estará disponible en `http://localhost:9000` (o el puerto configurado en tu `webpack.config.js`).

## Build para Producción

Para realizar un build del proyecto para producción, ejecuta el siguiente comando:

```bash
npm run build
```

Este comando limpiará la carpeta `public` y generará los archivos optimizados para producción.

## Tests

Para ejecutar los tests, utiliza el siguiente comando:

```bash
npm run test
```

Esto ejecutará todos los tests utilizando Jest en modo observación.

## Credenciales por Defecto

Para realizar un login exitoso en la aplicación, utiliza las siguientes credenciales por defecto:

- **Usuario (Email)**: `default@example.com`
- **Contraseña**: `Default123!`

Estas credenciales se pueden utilizar para probar la funcionalidad de autenticación del proyecto.

## Otros Comandos

- **Limpiar el directorio `public`**:

  ```bash
  npm run clean
  ```

- **Iniciar el proyecto en producción**:

  ```bash
  npm start
  ```

  Esto generará los archivos optimizados para producción en la carpeta public, para desplegarlos en producción, simplemente copia los archivos generados a tu servidor estático o a la carpeta pública de tu servidor web. Asegúrate de que tu servidor esté configurado para servir estos archivos correctamente.

---

Este README proporciona toda la información necesaria para configurar, ejecutar y probar el proyecto, así como las credenciales por defecto para acceder a la aplicación.
