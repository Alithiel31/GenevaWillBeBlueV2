import type { PageServerLoad } from './$types';
import { Content } from '$lib/server/models/Travel';

export const load: PageServerLoad = async () => {
    const travelOptions = await Content.findAll({
        where: { category: 'travel' },
        order: [['order', 'ASC']]
    });

    return {
        options: travelOptions.map(opt => ({
            title: opt.title,
            body: opt.body,
            icon: opt.icon ?? undefined 
        }))
    };
};