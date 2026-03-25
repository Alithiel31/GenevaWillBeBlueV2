import { connectDB } from '$lib/server/database';

// On lance l'initialisation dès que le container Docker démarre
const dbPromise = connectDB();

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
    // ON ATTEND QUE LA DB SOIT PRÊTE !
    // Si la DB n'est pas prête, SvelteKit attend ici avant de lancer le load() de tes pages
    await dbPromise;

    const response = await resolve(event);
    return response;
};