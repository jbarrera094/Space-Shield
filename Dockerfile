# Usar la imagen base de Node.js
FROM node:14-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto en el que correrá la aplicación
EXPOSE 80

# Comando para correr la aplicación
CMD ["npm", "start"]