# Stage 1: Build do Frontend (React)
FROM node:20-alpine AS build-frontend
WORKDIR /app/frontend

# Copia os arquivos de dependência do frontend
COPY frontend/package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do frontend
COPY frontend .

# Executa a build de produção do frontend
RUN npm run build

# ---

# Stage 2: Servidor de Produção (Backend)
FROM node:20-alpine AS production
WORKDIR /app

# Copia os arquivos do backend
COPY backend/package*.json ./backend/
COPY backend/server.js ./backend/
COPY backend/data.json ./backend/
#COPY backend/database.js ./backend/ # Se existir

# Copia os arquivos de backend necessários (se houver)
COPY backend ./backend

# Instala apenas as dependências de produção do backend
WORKDIR /app/backend
RUN npm install --only=production

# Copia a build do frontend para a pasta 'public' do backend
COPY --from=build-frontend /app/frontend/build /app/backend/public

# Define o diretório de trabalho principal como o diretório do backend
WORKDIR /app/backend

# Expõe a porta que a sua aplicação irá usar
EXPOSE 3000

# Inicia a aplicação Node.js
CMD ["node", "server.js"]
