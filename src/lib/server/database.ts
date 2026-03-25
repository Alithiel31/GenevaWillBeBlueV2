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

export const connectDB = async () => {
    if (isInitialized) return;

    try {
        await sequelize.authenticate();
        
        // On initialise les modèles avec l'instance
        initTravelModel(sequelize);
        initFaqModel(sequelize);
        
        await sequelize.sync({ alter: true });
        isInitialized = true;
        console.log('✅ DB Initialisée');
    } catch (e) {
        console.error('❌ Erreur DB:', e);
    }
};