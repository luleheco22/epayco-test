# Usa la imagen base de Node.js
FROM node:20.11.0

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto en el que se ejecuta el servicio
EXPOSE 3002

# Comando por defecto para ejecutar la aplicación
CMD ["npm", "run", "start"]
