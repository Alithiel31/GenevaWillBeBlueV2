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
                <h1>Coming to Geneva…</h1>
                <p>
                    <strong>There are lots of ways to get to Geneva!</strong><br />
                    Whether you're local, from Switzerland, or from far away.
                </p>
            </hgroup>
        </div>
        <div class="right">
            <div class="accordion">
                {#each data.options as option (option.title)}
                    <Accordion title={option.title} icon={option.icon}>
                        {@html sanitize(option.body)}
                    </Accordion>
                {/each}
            </div>
        </div>
    </div>
</section>