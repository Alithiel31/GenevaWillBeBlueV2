import { Sequelize } from 'sequelize';
// 1. On passe de 'static' à 'dynamic'
import { env } from '$env/dynamic/private'; 

// 2. On utilise env.DATABASE_URL au lieu de l'import direct
const dbUrl = env.DATABASE_URL;

// On détermine si on est en production
const isProduction = process.env.NODE_ENV === 'production' || (dbUrl && dbUrl.includes('railway.app'));

export const sequelize = new Sequelize(dbUrl, {
    dialect: 'postgres',
    logging: false,
    define: {
        timestamps: true,
    },
    dialectOptions: {
        ssl: isProduction ? {
            require: true,
            rejectUnauthorized: false
        } : false
    }
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        
        // Import dynamique des modèles
        await import('./models/Faq');
        await import('./models/Travel');

        // alter: true est génial en dev, 
        // mais attention en prod si tu as des données critiques !
        await sequelize.sync({ alter: true }); 
        console.log('✅ Base de données synchronisée et modèles chargés.');
    } catch (e) {
        console.error('❌ Erreur de connexion/synchronisation DB:', e);
    }
};