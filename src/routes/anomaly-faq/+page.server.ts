import type { PageServerLoad } from './$types';
// IMPORTANT : Importer le bon modèle pour la FAQ
import { AccordionItem } from '$lib/server/models/Faq'; 

export const prerender = false;
export const ssr = true;

export const load: PageServerLoad = async () => {
    const faqs = await AccordionItem.findAll({
        where: { category: 'anomaly' }, // 'general' pour l'autre fichier
        order: [['order', 'ASC']]
    });

    return {
        // On renvoie les noms exacts de la BDD pour que le front s'y retrouve
        faqs: faqs.map(f => ({
            id: f.id,
            question: f.question, // On utilise question
            answer: f.answer      // On utilise answer
        }))
    };
};