<script lang="ts">
    import Accordion from "$lib/components/Accordion.svelte";
    import { sanitize } from "$lib/utils/sanitize";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();
</script>

<section class="coming">
    <div class="grid">
        <div class="left">
            <hgroup>
                <h1>General FAQ</h1>
                <p>
                    More general questions about the event and the Resistance
                    faction.
                </p>
            </hgroup>
        </div>
        <div class="right">
            <div class="accordion">
                {#each data.faqs as faq (faq.title)}
                    <Accordion title={faq.title}>
                        {@html sanitize(faq.body)}
                    </Accordion>
                {/each}
            </div>
        </div>
    </div>
</section>