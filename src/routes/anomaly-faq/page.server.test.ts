import { describe, it, expect, vi, beforeEach } from 'vitest';
import { load } from './+page.server';
import { Content } from '$lib/server/models/Content';
import type { ServerLoadEvent } from '@sveltejs/kit';

// 1. Mock de Sequelize
vi.mock('$lib/server/models/Content', () => ({
  Content: {
    findAll: vi.fn()
  }
}));

describe('Load function: Anomaly FAQ', () => {
  // On simule l'event SvelteKit (vide car on ne l'utilise pas ici, mais requis par le type)
  const mockEvent = {} as ServerLoadEvent;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('doit transformer les données de la DB en objets simples (faqs)', async () => {
    const mockDBData = [
      { title: 'Opération Sirius', body: 'Détails top secrets', order: 1, category: 'anomaly' },
      { title: 'Protocole XM', body: 'Analyse du flux', order: 2, category: 'anomaly' }
    ];

    // On simule le retour de Sequelize
    (Content.findAll as any).mockResolvedValue(mockDBData);

    const result = await load(mockEvent as any);

    // Vérifications
    expect(Content.findAll).toHaveBeenCalledWith(expect.objectContaining({
      where: { category: 'anomaly' },
      order: [['order', 'ASC']]
    }));

    if (result && 'faqs' in result) {
      expect(result.faqs).toHaveLength(2);
      expect(result.faqs[0]).toEqual({ title: 'Opération Sirius', body: 'Détails top secrets' });
      // On vérifie que les champs "order" ou "category" ont bien été filtrés par ton .map()
      expect(result.faqs[0]).not.toHaveProperty('order');
    }
  });

 it('doit renvoyer un tableau vide et une erreur en cas de crash de la base', async () => {
    // 1. On espionne console.error et on remplace sa fonction par "ne rien faire" (.mockImplementation)
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // 2. On simule l'erreur de la base
    (Content.findAll as any).mockRejectedValue(new Error('PostgreSQL Connection Refused'));

    const result = await load(mockEvent as any);

    // 3. Tes vérifications habituelles
    if (result && 'faqs' in result) {
      expect(result.faqs).toEqual([]);
      expect(result).toHaveProperty('error');
    }

    // 4. IMPORTANT : On vérifie que console.error a bien été appelé (preuve que le catch fonctionne)
    expect(consoleSpy).toHaveBeenCalled();

    // 5. On restaure console.error pour les autres tests ou la suite
    consoleSpy.mockRestore();
  });
});