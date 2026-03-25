import { sequelize } from './database';
import { AccordionItem, Content } from './models'; // Import centralisé
import { runSeed } from './seed'; // Notre nouveau script d'injection

const seedDatabase = async () => {
    // On vérifie si l'une des tables est vide
    const faqCount = await AccordionItem.count();
    const contentCount = await Content.count();
    
    if (faqCount === 0 || contentCount === 0) {
        console.log('🌱 [Database]: Table(s) vide(s) détectée(s). Lancement du seed...');
        await runSeed();
    } else {
        console.log('✅ [Database]: Les données existent déjà (skip seed).');
    }
};

export const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('🔵 [Database]: Connection established.');
        
        // sync({ alter: true }) est pratique en dev pour mettre à jour les colonnes
        await sequelize.sync({ alter: true });
        
        // On remplit la base si besoin
        await seedDatabase();
        
    } catch (error) {
        console.error('❌ [Database]: Connection failed:', error);
    }
};