import { render, fireEvent, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Accordion from './Accordion.svelte';
import { createRawSnippet } from 'svelte';

describe('Accordion Component (Svelte 5)', () => {
  // On crée un snippet factice pour simuler le contenu (children)
  const childrenSnippet = createRawSnippet(() => ({
    render: () => '<p>Contenu secret de la Résistance</p>'
  }));

  const props = {
    title: 'Question Tactique',
    icon: '🔵',
    children: childrenSnippet
  };

  it('doit afficher le titre et l\'icône au chargement', () => {
    render(Accordion, { props });
    expect(screen.getByText('🔵 Question Tactique')).toBeTruthy();
  });

  it('doit être fermé par défaut (pas de contenu)', () => {
    render(Accordion, { props });
    // On vérifie que l'élément est null
    expect(screen.queryByText('Contenu secret de la Résistance')).toBeNull();
  });

  it('doit ouvrir l\'accordéon et afficher le snippet au clic', async () => {
    render(Accordion, { props });
    
    const button = screen.getByRole('button');
    await fireEvent.click(button);

    // On vérifie que le contenu est bien présent après le clic
    expect(screen.getByText('Contenu secret de la Résistance')).toBeTruthy();
    
    // Utilisation de .getAttribute() natif
    expect(button.getAttribute('aria-expanded')).toBe('true');
  });

  it('doit avoir la classe active sur le bouton quand il est ouvert', async () => {
    render(Accordion, { props });
    const button = screen.getByRole('button');
    
    await fireEvent.click(button);
    
    // Utilisation de classList.contains() natif
    expect(button.classList.contains('active')).toBe(true);
  });
});