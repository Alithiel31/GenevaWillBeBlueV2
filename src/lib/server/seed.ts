import { AccordionItem } from './models/Faq';
import { Content } from './models/Travel';
import { anomalyFaqData, generalFaqData, travelData } from './data/seedData';

export async function runSeed() {
  try {
    console.log("⏳ Début de l'injection des données de la Résistance...");

    // 1. Injection des FAQ
    await AccordionItem.bulkCreate(
      [...anomalyFaqData, ...generalFaqData],
      {
        updateOnDuplicate: ['question', 'answer', 'category', 'order', 'isActive']
      }
    );
    console.log("✅ FAQ synchronisées.");

    // 2. Injection des infos de Voyage (Travel)
    await Content.bulkCreate(
      travelData,
      {
        updateOnDuplicate: ['title', 'content', 'icon', 'category', 'order']
      }
    );

    console.log("💎 Base de données parfaitement à jour !");
  } catch (error) {
    console.error("❌ Échec de la synchronisation :", error);
    throw error;
  }
}