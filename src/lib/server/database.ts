import { Sequelize } from 'sequelize';
import { env } from '$env/dynamic/private';
import { initTravelModel } from './models/Travel';
import { initFaqModel } from './models/Faq';

const dbUrl = env.DATABASE_URL;
const isProduction = process.env.NODE_ENV === 'production' || (dbUrl && dbUrl.includes('railway.app'));

// Par défaut, on vérifie le certificat TLS du serveur Postgres (protection MITM).
// Certains hébergeurs (ex: proxy Railway) utilisent un certificat auto-signé ;
// dans ce cas uniquement, désactiver la vérification explicitement via l'env.
const rejectUnauthorized = env.DATABASE_SSL_REJECT_UNAUTHORIZED !== 'false';

export const sequelize = new Sequelize(dbUrl || '', {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: isProduction ? {
            require: true,
            rejectUnauthorized
        } : false
    }
});

let isInitialized = false;
let initializationPromise: Promise<void> | null = null;

export const connectDB = async () => {
    if (isInitialized) return;
    if (initializationPromise) return initializationPromise;

    initializationPromise = (async () => {
        try {
            await sequelize.authenticate();
            console.log('🔵 [Database]: Connexion établie.');

            // 1. Initialisation structurelle des modèles
            initTravelModel(sequelize);
            initFaqModel(sequelize);

            // 2. Synchronisation physique des tables (création/mise à jour colonnes)
            // 'alter: true' est pratique en dev pour ajuster les colonnes automatiquement,
            // mais risqué en production (peut modifier/perdre des données de façon imprévisible).
            // En production on se contente de créer les tables manquantes ; toute évolution
            // de schéma doit passer par une vraie migration Sequelize.
            await sequelize.sync({ alter: !isProduction });
            console.log('✅ [Database]: Tables synchronisées.');

            // 3. INJECTION DES DONNÉES (SEED)
            // On importe runSeed dynamiquement ici pour éviter les erreurs au Build
            const { runSeed } = await import('./seed'); 
            await runSeed();
            
            isInitialized = true;
            console.log('💎 [Database]: Seed terminé, base de données prête !');
        } catch (e) {
            console.error('❌ [Database]: Erreur fatale :', e);
            initializationPromise = null; 
            throw e;
        }
    })();

    return initializationPromise;
};