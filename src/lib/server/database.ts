import { Sequelize } from 'sequelize';
import { env } from '$env/dynamic/private';
// 1. Importe tes modèles normalement en haut
import { Content } from './models/Travel';
import { AccordionItem } from './models/Faq';

const dbUrl = env.DATABASE_URL;
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

// 2. Ta fonction connectDB devient beaucoup plus simple
export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        
        // Pas besoin d'imports dynamiques ici, Sequelize les reconnaît 
        // car ils ont été initialisés lors de l'import en haut du fichier.
        
        await sequelize.sync({ alter: true }); 
        console.log('✅ Base de données synchronisée.');
    } catch (e) {
        console.error('❌ Erreur de connexion/synchronisation DB:', e);
    }
};