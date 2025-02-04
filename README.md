# Wallet ePayco - Virtual Wallet System

Este proyecto simula una billetera virtual con dos servicios REST: uno que accede directamente a la base de datos y otro que actúa como intermediario entre el cliente y el servicio de base de datos. El sistema permite registrar clientes, cargar dinero a la billetera, realizar compras con un código de confirmación y consultar el saldo.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```bash
.
├── backend/
│ ├── wallet-db-service/ # Servicio de acceso a la base de datos
│ ├── wallet-api-service/ # Servicio que consume el servicio de base de datos
├── wallet-epayco-frontend/ # Frontend en React con TypeScript
├── docker-compose.yml # Archivo de configuración de Docker


## Requisitos Previos

- Docker instalado en tu máquina.
- Docker Compose instalado en tu máquina.

## Configuración del Proyecto

1. **Clonar el Repositorio:**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>

2. **Configurar Variables de Entorno:
 -En la carpeta backend/wallet-db-service, crea un archivo .env con las siguientes variables:

 ```bash
 PORT=3001
 MONGO_URI=mongodb://localhost:27017/wallet
 JWT_SECRET=supersecreto
 JWT_EXPIRES_IN=12h
 FRONT_URL=http://localhost:5173
 MAIL_HOST=smtp.gmail.com
 MAIL_USER=tucorreo
 MAIL_PASS=tullavesecreta

 **-Tener en cuenta que el correo que coloque debe configuarrlo la clave de aplicaciones.

 -En la carpeta backend/wallet-api-service, crea un archivo .env con las siguientes variables:

 ```bash
 WALLET_SERVICE_DB_URL=http://localhost:3001

 -En la carpeta wallet-epayco-frontend, crea un archivo .env con las siguientes variables:

 ```bash
VITE_BASE_URL=http://localhost:3002/wallet

 3. **Construir y Ejecutar los Contenedores con Docker Compose:

 -Desde la raíz del proyecto, ejecuta el siguiente comando para construir y levantar los contenedores: 

 ```bash
 docker-compose up --build

 Esto levantará los siguientes servicios:
MongoDB: Base de datos en el puerto 27017.
wallet-db-service: Servicio de acceso a la base de datos en el puerto 3001.
wallet-api-service: Servicio que consume el servicio de base de datos en el puerto 3002.
wallet-epayco-frontend: Frontend en React en el puerto 5173.

4. **Acceder a la Aplicación:

Frontend: Abre tu navegador y visita http://localhost:5173.

Servicios REST: Colección de Postman
Puedes importar la colección de Postman desde el archivo Wallet_ePayco.postman_collection.json ubicado en la raíz del proyecto para probar los endpoints.  http://localhost:3002 (wallet-api-service). en la ruta /backend/docs


**Detener los Contenedores
docker-compose down

**Notas Adicionales
Asegúrate de que los puertos 27017, 3001, 3002, y 5173 estén disponibles en tu máquina.

Si necesitas hacer cambios en el código, puedes reconstruir los contenedores con docker-compose up --build.**

## Tech Stack

**Client:** React, Contex, TailwindCSS, HeroUI

**Server:** NestJS

