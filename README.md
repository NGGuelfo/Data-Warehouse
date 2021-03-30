# Proyecto Data Warehouse

Herramienta de Administracion de base de datos de una compañia de Marketing

# Paso a Paso
# Clonamos

Clonar proyecto desde consola o descargar desde el repositorio:_

git clone https://github.com/NGGuelfo/Data-Warehouse

## Instalación 🔧

Una vez descargado el repositorio, instalamos las dependencias:

"dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "cookie-parser": "^1.4.5",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "ejs": "^3.1.5",
    "ejs-lint": "^1.1.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "multer": "^1.4.2",
    "mysql2": "^2.2.5",
    "sequelize": "^6.3.5"
  },
  "devDependencies": {
    "nodemon": "^2.0.6"
  }
## EJEMPLO

npm install

npm install nodemon --save-dev nodemon

# Base de Datos

En el archivo .env se encuentran los datos de configuración de la base de datos. En caso de necesitar, se pueden modificar desde alli.

Puerto = 3000

Puerto de la base de datos = 3306

Host = '127.0.0.1'

Usuario = 'root'

nombre base de datos = 'data_warehouse'

Lenguaje = 'mysql'

## POST Base de Datos Creada

Para poder incializar la pagina correctamente y que see conecte con la base, debemos utilizar los siguientes comandos:

npm restart

npm start

## Usuarios

# ADMIN

Usuario: admin@mail.com
Contraseña: admin1234

# USER COMUN

Usuario: user@mail.com
Contraseña: admin1234
