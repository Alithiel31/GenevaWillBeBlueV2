# --- Étape 1 : Construction (Builder) ---
FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Étape 2 : Exécution (Runner) ---
FROM node:20-slim AS runner
WORKDIR /app

# On ne copie que le build et les dépendances nécessaires
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Railway et les autres injectent dynamiquement le PORT
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# On lance l'application compilée
CMD ["node", "build"]