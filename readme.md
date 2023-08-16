# MongoDB-Alquileres

## Descripcion

Sistema de alquileres de autos. Se usaron temas de: 
- Agregaciones
- Consultas interactivas
- Autenticacion JWT
- Esquemas (DTO mongo)
- Limite de solicitudes
- DTO Backend
- Middlewares de verificacion 



![Diagrama en el que se fundamento la base de datos](./img/diagrama.png)


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

## Endpoints
### `create token`

Este endpoint se utiliza para un token JWT relacionado a una coleccion especifica por parametro

- Método: **GET**
- URL: `http://localhost:8080/create/automovil`
- Resultado esperado:
  ```json
  {
  "status": 201,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXIiOjAsImJyYW5kIjoiIiwibW9kZWwiOiIiLCJ5ZWFyIjowLCJ0eXBlIjoiIiw"
  }
  ```
> ⚠️ **Importante:**
> Guarda el token generado, lo necesitaras para ser autorizado a realizar diferentes acciones (Obtener, eliminar, añadir, actualizar)


###  `validate token`
  
- Asi debes agregar el token JWT generado como un header de tipo Authorization
![Header authorization](./img/header.png)


🔔 **Listo:**
Ya estas autenticado, podras realizar los siguientes endpoints.
> ⚠️ **Importante:**
> Las consultas de tipo POST deben poseer en su body los campos requeridos de la coleccion definidos y validados en el DTO (Puedes copiar los valores JSON dados.).

## 1. Automovil

###  `obtain`
Este endpoint permite obtener todos los automoviles.

- Método: **GET**
- URL: `http://localhost:8080/automovil`

### `add`
Este endpoint permite añadir autos nuevos a la coleccion
- Método: **GET**
- URL: `http://localhost:8080/automovil/add`
- body:
  ```json
  {
  "brand": "Audi",
  "model": "A4",
  "year": 2021,
  "type": "Automovil",
  "capacity": 5,
  "rate": 100000
  }
  ```
### `delete`
Este endpoint permite eliminar autos existentes en la coleccion
- Método: **DELETE**
- URL: `http://localhost:8080/automovil/remove/:id`
- Ejemplo: `http://localhost:8080/automovil/remove/5`
> ⚠️ **Ojo:**
> El ejemplo eliminaria al automovil con id 5, en caso de no encontrarlo notificara este error.
### `update`
Este endpoint permite actualizar informacion autos existentes en la coleccion
- Método: **PATCH**
- URL: `http://localhost:8080/automovil/update/:id`
- Ejemplo: `http://localhost:8080/automovil/update/1`
- body: 
  ```json
  {
  "brand": "Renault",
  "model": "20",
  "year": 2005,
  "type": "Automovil",
  "capacity": 4,
  "rate": 1000
  }
  ```

### `Mostrar automoviles con capacidad mayor a 5`
Este endpoint permite obtener todos los automiles que contengas una capacidad mayor a 5
- Método: **GET**
- URL: `http://localhost:8080/automovil/greaterCapacity`
## Autor

**Angel David Velasco**

## Licencia

Este proyecto está bajo la Licencia ISC.