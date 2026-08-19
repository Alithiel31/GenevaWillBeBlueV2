import { describe, it, expect, vi, beforeEach } from 'vitest';
import { load } from './+page.server';
import { AccordionItem } from '$lib/server/models/Faq';
import type { ServerLoadEvent } from '@sveltejs/kit';

vi.mock('$lib/server/models/Faq', () => ({
  AccordionItem: {
    findAll: vi.fn()
  }
}));

describe('Load function: General FAQ', () => {
  const mockEvent = {} as ServerLoadEvent;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('doit transformer les données de la DB en objets simples (faqs)', async () => {
    const mockDBData = [
      { id: '1', question: 'Y aura-t-il un Mission Day ?', answer: 'Probablement.', order: 1, category: 'general' },
      { id: '2', question: 'Le van sera présent ?', answer: 'On le demande.', order: 2, category: 'general' }
    ];

    (AccordionItem.findAll as any).mockResolvedValue(mockDBData);

    const result = await load(mockEvent as any);

    expect(AccordionItem.findAll).toHaveBeenCalledWith(expect.objectContaining({
      where: { category: 'general' }
    }));

    if (result && 'faqs' in result) {
      expect(result.faqs).toHaveLength(2);
      expect(result.faqs[0]).toEqual({
        id: '1',
        question: 'Y aura-t-il un Mission Day ?',
        answer: 'Probablement.'
      });
    }
  });

  it('doit renvoyer un tableau vide en cas de crash de la base', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    (AccordionItem.findAll as any).mockRejectedValue(new Error('DB Error'));

    const result = await load(mockEvent as any);

    if (result && 'faqs' in result) {
      expect(result.faqs).toEqual([]);
    }

    consoleSpy.mockRestore();
  });
});
