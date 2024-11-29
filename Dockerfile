# Usar la imagen base de Node.js
FROM node:20-alpine

# Instalar pnpm globalmente
RUN npm install -g pnpm

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