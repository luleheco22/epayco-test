# Usa la imagen base de Node.js
FROM node:20.11.0

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json o yarn.lock
COPY package*.json ./ 

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . . 

# Construye la aplicación para producción
RUN npm run build

# Expone el puerto en el que se ejecuta el servicio
EXPOSE 5173

# Comando por defecto para ejecutar la aplicación en producción
CMD ["npm", "run", "preview"]
