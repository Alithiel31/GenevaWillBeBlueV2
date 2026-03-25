import { Sequelize } from 'sequelize';
import { DATABASE_URL } from '$env/static/private';

// On détermine si on est en production (sur Railway) pour activer le SSL
const isProduction = process.env.NODE_ENV === 'production' || DATABASE_URL.includes('railway.app');

export const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    define: {
        timestamps: true,
    },
    // AJOUT CRUCIAL POUR LE DÉPLOIEMENT
    dialectOptions: {
        ssl: isProduction ? {
            require: true,
            rejectUnauthorized: false // Indispensable pour la plupart des PaaS
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