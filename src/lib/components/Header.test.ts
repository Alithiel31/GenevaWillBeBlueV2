import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Header from './Header.svelte';

describe('Header Component', () => {
  it('doit afficher le logo de la Résistance', () => {
    render(Header);
    const logo = screen.getByRole('img');
    expect(logo).toBeTruthy();
  });
});