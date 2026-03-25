import { describe, it, expect, vi, beforeEach } from 'vitest';
import { load } from './+page.server';
import { AccordionItem } from '$lib/server/models/Faq'; // ✅ On utilise AccordionItem
import type { ServerLoadEvent } from '@sveltejs/kit';

// 1. Mock de AccordionItem (doit matcher l'import dans +page.server.ts)
vi.mock('$lib/server/models/Faq', () => ({
  AccordionItem: {
    findAll: vi.fn()
  }
}));

describe('Load function: Anomaly FAQ', () => {
  const mockEvent = {} as ServerLoadEvent;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('doit transformer les données de la DB en objets simples (faqs)', async () => {
    // Données mockées avec les NOUVEAUX noms de colonnes : question / answer
    const mockDBData = [
      { id: '1', question: 'C’est quoi l’Anomaly ?', answer: 'Un event Ingress.', order: 1, category: 'anomaly' },
      { id: '2', question: 'Où ça se passe ?', answer: 'À Genève.', order: 2, category: 'anomaly' }
    ];

    // On simule le retour de findAll
    (AccordionItem.findAll as any).mockResolvedValue(mockDBData);

    const result = await load(mockEvent as any);

    // Vérification de l'appel à la BDD
    expect(AccordionItem.findAll).toHaveBeenCalledWith(expect.objectContaining({
      where: { category: 'anomaly' }
    }));

    // Vérification de la transformation (on attend question/answer maintenant)
    if (result && 'faqs' in result) {
      expect(result.faqs).toHaveLength(2);
      expect(result.faqs[0]).toEqual({ 
        id: '1',
        question: 'C’est quoi l’Anomaly ?', 
        answer: 'Un event Ingress.' 
      });
    }
  });

  it('doit renvoyer un tableau vide en cas de crash de la base', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Simulation d'une erreur SQL
    (AccordionItem.findAll as any).mockRejectedValue(new Error('DB Error'));

    const result = await load(mockEvent as any);

    if (result && 'faqs' in result) {
      expect(result.faqs).toEqual([]);
    }

    consoleSpy.mockRestore();
  });
});