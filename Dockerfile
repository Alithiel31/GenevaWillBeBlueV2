# On part d'une image Node.js légère
FROM node:20-slim

# On définit le dossier de travail dans le conteneur
WORKDIR /app

# On copie les fichiers de dépendances
COPY package*.json ./

# On installe les dépendances
RUN npm install

# On copie tout le reste du code
COPY . .

# On expose le port 5173 (port par défaut de SvelteKit dev)
EXPOSE 5173

# Commande pour lancer le mode développement
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]