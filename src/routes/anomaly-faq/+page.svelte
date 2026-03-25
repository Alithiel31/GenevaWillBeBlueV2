<script lang="ts">
    import Accordion from "$lib/components/Accordion.svelte";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();
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
                {#each data.faqs as faq}
                    <Accordion title={faq.title}>
                        {@html faq.body}
                    </Accordion>
                {/each}
            </div>
        </div>
    </div>
</section>
