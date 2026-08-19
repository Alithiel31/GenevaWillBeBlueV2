import { describe, it, expect, vi, beforeEach } from 'vitest';
import { load } from './+page.server';
import { Content } from '$lib/server/models/Travel';
import type { ServerLoadEvent } from '@sveltejs/kit';

vi.mock('$lib/server/models/Travel', () => ({
  Content: {
    findAll: vi.fn()
  }
}));

describe('Load function: Coming to Geneva', () => {
  const mockEvent = {} as ServerLoadEvent;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('doit transformer les données de la DB en objets simples (options)', async () => {
    const mockDBData = [
      { id: 'plane', title: 'by airplane', content: { paragraphs: ['...'] }, icon: '✈️', order: 0 },
      { id: 'train', title: 'by train', content: { paragraphs: ['...'] }, icon: '🚆', order: 1 }
    ];

    (Content.findAll as any).mockResolvedValue(mockDBData);

    const result = await load(mockEvent as any);

    expect(Content.findAll).toHaveBeenCalledWith(expect.objectContaining({
      where: { category: 'travel' }
    }));

    if (result && 'options' in result) {
      expect(result.options).toHaveLength(2);
      expect(result.options[0]).toEqual({
        id: 'plane',
        title: 'by airplane',
        content: { paragraphs: ['...'] },
        icon: '✈️'
      });
    }
  });

  it('doit renvoyer un tableau vide en cas de crash de la base', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    (Content.findAll as any).mockRejectedValue(new Error('DB Error'));

    const result = await load(mockEvent as any);

    if (result && 'options' in result) {
      expect(result.options).toEqual([]);
    }

    consoleSpy.mockRestore();
  });
});
