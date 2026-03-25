<script lang="ts">
    import Accordion from "$lib/components/Accordion.svelte";
    import { sanitize } from "$lib/utils/sanitize";
    import type { PageData } from "./$types";

    interface FaqItem {
        id: string;
        question: string;
        answer: string;
    }

    let { data }: { data: PageData } = $props();

    let faqs = $derived((data.faqs as unknown as FaqItem[]) ?? []);
</script>

<section class="coming">
    <div class="grid">
        <div class="left">
            <hgroup>
                <h1>Anomaly FAQ</h1>
                <p>Everything you need to know about the Geneva Anomaly.</p>
            </hgroup>
        </div>
        <div class="right">
            <div class="accordion">
                {#each faqs as faq (faq.id)}
                    <Accordion title={faq.question}>
                        {@html sanitize(faq.answer)}
                    </Accordion>
                {/each}
            </div>
        </div>
    </div>
</section>