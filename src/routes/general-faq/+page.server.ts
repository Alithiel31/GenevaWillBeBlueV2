import type { PageServerLoad } from './$types';
import { AccordionItem } from '$lib/server/models/Faq'; 

export const prerender = false;
export const ssr = true;

export const load: PageServerLoad = async () => {
    try {
        const faqs = await AccordionItem.findAll({
            where: { category: 'general' }, // 'anomaly' pour l'autre fichier
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
    } catch (error) {
        console.error('Erreur lors du chargement des FAQs General:', error);

        // On renvoie un tableau vide pour que l'utilisateur voie quand même la page
        // (même vide) plutôt que de faire planter le rendu si la base est indisponible.
        return {
            faqs: []
        };
    }
};