<script lang="ts">
    import Accordion from "$lib/components/Accordion.svelte";
    import { sanitize } from "$lib/utils/sanitize";
    import type { PageData } from "./$types";

    // 1. Définition de l'interface pour le typage
    interface FaqItem {
        id: string;
        question: string;
        answer: string;
    }

    let { data }: { data: PageData } = $props();

    // 2. Utilisation de $derived pour la réactivité Svelte 5 et le typage
    let faqs = $derived((data.faqs as unknown as FaqItem[]) ?? []);
</script>

<section class="coming">
    <div class="grid">
        <div class="left">
            <hgroup>
                <h1>General FAQ</h1>
                <p>More general questions about the event and the Resistance faction.</p>
            </hgroup>
        </div>
        <div class="right">
            <div class="accordion">
                {#each faqs as faq (faq.id)}
                    <Accordion title={faq.question}>
                        <div class="faq-content">
                            {@html sanitize(faq.answer)}
                        </div>
                    </Accordion>
                {/each}
            </div>
        </div>
    </div>
</section>

<style>
    /* Optionnel : pour espacer un peu les paragraphes à l'intérieur de l'answer */
    .faq-content :global(p) {
        margin-bottom: 0.75rem;
    }
    .faq-content :global(p:last-child) {
        margin-bottom: 0;
    }
</style>