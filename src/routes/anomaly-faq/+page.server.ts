import type { PageServerLoad } from './$types';
import { AccordionItem } from '$lib/server/models/Faq'; 

export const prerender = false;
export const ssr = true;

export const load: PageServerLoad = async () => {
    try {
        const faqs = await AccordionItem.findAll({
            where: { category: 'anomaly' }, 
            order: [['order', 'ASC']]
        });

        return {
            faqs: faqs.map(f => ({
                id: f.id,
                question: f.question,
                answer: f.answer
            }))
        };
    } catch (error) {
        // Cela permet de voir l'erreur dans les logs du serveur Railway
        console.error('Erreur lors du chargement des FAQs Anomaly:', error);
        
        // On renvoie un tableau vide pour que le test "crash de la base" passe
        // et que l'utilisateur voie quand même la page (même si elle est vide)
        return {
            faqs: []
        };
    }
};