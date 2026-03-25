import type { PageServerLoad } from './$types';
import { Content } from '$lib/server/models/Content';

export const load: PageServerLoad = async () => {
    try {
        const faqs = await Content.findAll({
            where: { category: 'anomaly' },
            order: [['order', 'ASC']]
        });

        return {
            // Utiliser JSON.parse(JSON.stringify()) est une astuce de "vieux loup" 
            // pour être sûr que les données sont de purs objets JSON sans fonctions cachées
            faqs: faqs.map(f => ({
                title: f.title,
                body: f.body
            }))
        };
    } catch (error) {
        console.error("Erreur lors du chargement des FAQs Anomaly:", error);
        return {
            faqs: [],
            error: "Impossible de charger les données."
        };
    }
};