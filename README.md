# 💠 Geneva Will Be Blue - SvelteKit Portal

[Français](#français) | [English](#english)

---

<a name="français"></a>
## 🇫🇷 Français

Bienvenue sur le portail d'informations de la Résistance pour l'anomalie à Genève. Cette application web centralise les informations stratégiques et les FAQs pour les agents de terrain. Le projet utilise SvelteKit pour une interface réactive et moderne, couplé à une base de données PostgreSQL gérée par l'ORM Sequelize pour la persistance des données tactiques.

### 🛠️ Installation et Démarrage Rapide

Le projet est entièrement conteneurisé avec Docker, ce qui garantit un environnement de développement identique pour tous les agents. Vous n'avez pas besoin d'installer Node.js ou PostgreSQL sur votre machine hôte.

1. **Clonage du dépôt** : Executez `git clone https://github.com/alithiel31/GenevaWillBeBlueV2.git` puis `cd GenevaWillBeBlueV2`.
2. **Configuration** : Copiez `.env.example` en `.env` (`cp .env.example .env`) et renseignez au minimum `POSTGRES_PASSWORD`.
3. **Lancement** : Exécutez la commande `docker-compose up --build`. Une fois le conteneur prêt, le portail est accessible sur votre navigateur à l'adresse **http://localhost:8888**.

---

<a name="english"></a>
## 🇺🇸 English

Welcome to the information portal for Geneva Anomaly. This web application centralizes strategic information and FAQs for field agents. The project leverages SvelteKit for a reactive and modern interface, combined with a PostgreSQL database managed by the Sequelize ORM for tactical data persistence.

### 🛠️ Quick Start & Installation

The project is fully containerized using Docker, ensuring an identical development environment for all agents. There is no need to install Node.js or PostgreSQL on your host machine.

1. **Clone the repository**: Run `git clone https://github.com/alithiel31/GenevaWillBeBlueV2.git` then `cd GenevaWillBeBlueV2`.
2. **Configuration**: Copy `.env.example` to `.env` (`cp .env.example .env`) and fill in at least `POSTGRES_PASSWORD`.
3. **Launch**: Run `docker-compose up --build`. Once the container is ready, the portal is available in your browser at **http://localhost:8888**.