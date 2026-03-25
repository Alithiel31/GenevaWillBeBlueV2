import { connectDb } from '$lib/server/db-init';
import type { Handle } from '@sveltejs/kit';

// On lance la connexion mais on ne bloque pas l'export du handle
console.log("🚀 [Hooks] Initialisation du portail de données...");
connectDb().catch(err => {
    console.error("❌ [Hooks] Erreur fatale lors de la connexion DB:", err);
});

export const handle: Handle = async ({ event, resolve }) => {
    // Optionnel : tu peux ajouter un log ici pour voir si les requêtes arrivent
    // console.log(`[Request]: ${event.url.pathname}`);
    
    const response = await resolve(event);
    return response;
};