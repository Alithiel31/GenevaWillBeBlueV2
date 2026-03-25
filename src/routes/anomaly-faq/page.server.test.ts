import { describe, it, expect, vi, beforeEach } from 'vitest';
import { load } from './+page.server';
import { Content } from '$lib/server/models/Travel';
import type { ServerLoadEvent } from '@sveltejs/kit';

// 1. Mock de Sequelize : Le chemin doit être identique à l'import dans +page.server.ts
vi.mock('$lib/server/models/Travel', () => ({
  Content: {
    findAll: vi.fn()
  }
}));

describe('Load function: Anomaly FAQ', () => {
  // On simule l'event SvelteKit requis par le type PageServerLoad
  const mockEvent = {} as ServerLoadEvent;

  beforeEach(() => {
    // On réinitialise les mocks avant chaque test pour éviter les interférences
    vi.clearAllMocks();
  });

  it('doit transformer les données de la DB en objets simples (faqs)', async () => {
    // Données brutes telles qu'elles sortiraient de Sequelize
    const mockDBData = [
      { title: 'Opération Sirius', content: 'Détails top secrets', order: 1, category: 'anomaly' },
      { title: 'Protocole XM', content: 'Analyse du flux', order: 2, category: 'anomaly' }
    ];

    // On force le type en "any" pour accéder aux méthodes de mock de Vitest
    (Content.findAll as any).mockResolvedValue(mockDBData);

    const result = await load(mockEvent as any);

    // Vérification que la requête DB a été faite avec les bons filtres
    expect(Content.findAll).toHaveBeenCalledWith(expect.objectContaining({
      where: { category: 'anomaly' },
      order: [['order', 'ASC']]
    }));

    // Vérification de la transformation des données
    if (result && 'faqs' in result) {
      expect(result.faqs).toHaveLength(2);
      expect(result.faqs[0]).toEqual({ 
        title: 'Opération Sirius', 
        body: 'Détails top secrets' 
      });
      
      // On vérifie que les champs superflus (order, category) ont été supprimés par le .map()
      expect(result.faqs[0]).not.toHaveProperty('order');
      expect(result.faqs[0]).not.toHaveProperty('category');
    }
  });

  it('doit renvoyer un tableau vide et une erreur en cas de crash de la base', async () => {
    // 1. On espionne console.error pour ne pas polluer la console pendant le test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // 2. On simule un crash de la base de données (ex: timeout ou mauvais mot de passe)
    (Content.findAll as any).mockRejectedValue(new Error('PostgreSQL Connection Refused'));

    const result = await load(mockEvent as any);

    // 3. Vérifications du comportement de secours (fallback)
    if (result && 'faqs' in result) {
      expect(result.faqs).toEqual([]);
      expect(result).toHaveProperty('error', "Impossible de charger les données.");
    }

    // 4. On vérifie que l'erreur a bien été logguée pour le debug
    expect(consoleSpy).toHaveBeenCalled();

    // 5. On restaure le comportement normal de console.error
    consoleSpy.mockRestore();
  });
});