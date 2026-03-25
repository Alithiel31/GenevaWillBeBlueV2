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
        ssl: isProduction ? { require: true, rejectUnauthorized: false } : false
    }
});

let isInitialized = false;

let initializationPromise: Promise<void> | null = null;

export const connectDB = async () => {
    // Si c'est déjà fait, on sort
    if (isInitialized) return;

    // Si une initialisation est EN COURS, on attend la fin de celle-ci
    if (initializationPromise) return initializationPromise;

    // Sinon, on crée la promesse d'initialisation
    initializationPromise = (async () => {
        try {
            await sequelize.authenticate();
            console.log('🔵 [Database]: Connexion établie.');

            // Initialisation des modèles
            initTravelModel(sequelize);
            initFaqModel(sequelize);

            // Synchronisation des tables
            await sequelize.sync({ alter: true });
            
            // --- OPTIONNEL : Ton script de SEED ici ---
            // await seedDatabase(); 

            isInitialized = true;
            console.log('✅ [Database]: Modèles chargés et tables synchronisées.');
        } catch (e) {
            console.error('❌ [Database]: Erreur fatale :', e);
            initializationPromise = null; // On permet de réessayer au prochain refresh
            throw e;
        }
    })();

    return initializationPromise;
};