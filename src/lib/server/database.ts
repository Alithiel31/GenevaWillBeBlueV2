import { Sequelize } from 'sequelize';
import { env } from '$env/dynamic/private';
import { initTravelModel } from './models/Travel';
import { initFaqModel } from './models/Faq';

const dbUrl = env.DATABASE_URL;
const isProduction = process.env.NODE_ENV === 'production' || (dbUrl && dbUrl.includes('railway.app'));

export const sequelize = new Sequelize(dbUrl || '', {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: isProduction ? {
            require: true,
            rejectUnauthorized: false
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
            await sequelize.sync({ alter: true });
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