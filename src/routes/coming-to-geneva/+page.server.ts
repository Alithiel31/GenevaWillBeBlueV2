import type { PageServerLoad } from './$types';
import { Content } from '$lib/server/models/Travel';

export const prerender = false;
export const ssr = true;

export const load: PageServerLoad = async () => {
    const travelOptions = await Content.findAll({
        where: { category: 'travel' },
        order: [['order', 'ASC']]
    });

    return {
        options: travelOptions.map(opt => ({
            id: opt.id,
            title: opt.title,
            content: opt.content, // Utilise 'content' (pas 'body') pour correspondre au JSON
            icon: opt.icon ?? undefined 
        }))
    };
};