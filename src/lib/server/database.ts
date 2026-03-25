import { Sequelize } from 'sequelize';
import { DATABASE_URL } from '$env/static/private';

// 1. On crée l'instance d'abord
export const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    define: {
        timestamps: true,
    }
});

// 2. Fonction de synchronisation
export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        
        // IMPORTANT : On importe les modèles ICI, à l'intérieur de la fonction.
        // Cela garantit que 'sequelize' est déjà exporté et disponible pour les modèles.
        await import('./models/Agent');
        await import('./models/AccordionItem');
        await import('./models/Content'); // Si tu décides de le garder

        await sequelize.sync({ alter: true }); 
        console.log('✅ Base de données synchronisée et modèles chargés.');
    } catch (e) {
        console.error('❌ Erreur de connexion/synchronisation DB:', e);
    }
};