import DOMPurify from 'isomorphic-dompurify';

/**
 * Nettoie le HTML brut pour empêcher les failles XSS.
 * On définit une "White List" (liste blanche) de ce qui est autorisé.
 */
export function sanitize(html: string): string {
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['b', 'strong', 'i', 'em', 'p', 'br', 'ul', 'ol', 'li', 'a'],
        ALLOWED_ATTR: ['href', 'target', 'rel'],
        // Sécurité supplémentaire pour les liens externes
        ADD_ATTR: ['rel', 'noopener noreferrer'] 
    });
}