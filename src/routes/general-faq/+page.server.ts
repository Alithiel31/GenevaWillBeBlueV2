import type { PageServerLoad } from './$types';
import { Content } from '$lib/server/models/Content';

export const load: PageServerLoad = async () => {
    const faqs = await Content.findAll({
        where: { category: 'general' },
        order: [['order', 'ASC']]
    });

    return {
        faqs: faqs.map(f => ({
            title: f.title,
            body: f.body
        }))
    };
};