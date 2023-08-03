# MongoDB-Alquileres

## Descripcion

Sistema de alquileres de autos. Se realizaron: 
- Referencias
- 20 Consultas interactivas
- Sistemas de agrupacion
- Insercion de datos
- Y mas



![Diagrama en el que se fundamento la base de datos](./diagrama.png)


## Configuración 

> ⚠️ **Importante:**
> Antes de ejecutar consultas en MongoDB, es necesario configurar el entorno adecuado. Aquí tienes los pasos para asegurarte de que tienes todo lo necesario para trabajar con MongoDB en tu computadora:

1. Clona este repositorio en tu máquina local:

   ```shell
   git clone https://github.com/tu-usuario/nombre-del-proyecto.git
   ```

2. Navega hasta el directorio del proyecto:

   ```shell
   cd nombre-del-proyecto
   ```


1. **Instalar MongoDB**: Asegúrate de tener MongoDB instalado en tu computadora. Puedes seguir el tutorial en el siguiente enlace: [Instalación de MongoDB en Windows](https://www.youtube.com/watch?v=LibtQECAR1U). Si ya tienes MongoDB instalado, puedes pasar al siguiente paso.

2. **Extension MongoDB**: Es recomendable tener instalada la extensión "MongoDB for VS Code" para una mejor experiencia de desarrollo. Puedes instalarla desde el Marketplace de VS Code.

3. **Configurar una conexión a la base de datos**:
   - Abre la extensión "MongoDB for VS Code" desde el panel izquierdo de VS Code (ícono de la hoja).
   - En "Connections", abre el panel "New Connection".
   - Si ya tienes una conexión configurada en MongoDB Atlas, copia el string de la conexión con los datos de usuario y contraseña del perfil creado. Si vas a utilizar la conexión de la base de datos actual, usa el siguiente link:
     ```
     mongodb+srv://admin:Admin123456@cluster0.y7pgxmx.mongodb.net/
     ```
   - Si no tienes una conexión configurada y deseas hacerlo de manera local, selecciona la opción avanzada y luego presiona "Connect" para configurar los datos de la conexión.

6. **Ejecutar consultas**:
   - Navega hasta el archivo de la creacion de los documentos y consultas en la ruta `db/alquiler.mongodb.js`.
   - Selecciona la consulta que deseas ejecutar, incluyendo el comando `use("db_campus_alquiler");` al inicio del archivo.

Con estos pasos, tendrás todo configurado para ejecutar consultas en MongoDB. Asegúrate de seguir las instrucciones y configurar correctamente la conexión para que puedas interactuar con la base de datos sin problemas.

## Autor

**Angel David Velasco**

## Licencia

Este proyecto está bajo la Licencia ISC.