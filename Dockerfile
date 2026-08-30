# Usar la imagen base de Node.js
FROM node:20-alpine

# Instalar una versión fija de pnpm
RUN npm install -g pnpm@10.30.3

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación
RUN pnpm run build

# Exponer el puerto en el que correrá la aplicación
EXPOSE 80

# Comando para correr la aplicación
CMD ["pnpm", "start"]