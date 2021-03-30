# Proyecto Data Warehouse

_Es una herramienta que permite a una compañia de Marketing administrar todos los contactos de sus clientes para sus campañas._

## Comenzando 🚀

_Clonar proyecto desde consola o descargar desde el repositorio:_

⌨️  git clone https://github.com/gastond23/data_warehouse.git

### Dependencias 📋

_En este proyecto se utilizaron las siguientes dependencias:_

```
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
```

### Instalación 🔧

_Una vez descargado el repositorio procedemos a instalar las dependencias mencionadas:_

```
⌨️ npm install

⌨️ npm install nodemon --save-dev nodemon
```

## Iniciando DB inicial ⚙️

_Configuración previa:_

En el archivo **.env_** se encuentran los datos de configuración e inicialies de la base de datos, en caso de ser necesario una personalización modificar los parametros del archivo:

```
APP_PORT=3000

DB_PORT=3306

DB_HOST='localhost'

DB_USER='root'

DB_PASS='betsabeXl23'

DB_NAME='data_warehouse'

DB_DIALECT='mysql'

JWT_KEY='secreto_SECRETO'
```

Una vez establecidas las configuraciones para la conexión de la DB crear una DB con phpMyAdmin o MySQLWorkbench con el nombre indicacod en la configuración **data_warehouse**, una vez creada la DB ejecutar el siguiente comando:

```
⌨️ npm restart
```

Este comando creará la conexión con la DB y añadirá los datos previos para poder trabajar en la aplicación.

## Iniciando Servidor ⚙️

_Ejecutar desde la terminal en la ubicacion de los archivos descargados:_

```
⌨️ npm start
```

### Ingreso al sitio 🔩

_La dirección del sitio_ http://localhost:3000

_Nos encontramos una login page_

Usuario con permiso Administrador:

```
Usuario: admin@mail.com

Contraseña: admin1234
```

Usuario con permisos básicos:

```
Usuario: user@mail.com

Contraseña: admin1234
```
