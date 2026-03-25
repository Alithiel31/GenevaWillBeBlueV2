<script lang="ts">
    import Accordion from "$lib/components/Accordion.svelte";
    import { sanitize } from "$lib/utils/sanitize";
    import type { PageData } from "./$types";

    // On définit l'interface pour correspondre à ta structure seedData.ts
    interface TravelContent {
        paragraphs?: string[];
        intro?: string;
        pricing_info?: string;
        budget_options?: { name: string; url: string }[];
        camping?: {
            name: string;
            url: string;
            description: string;
            icon: string;
        };
        benefits?: string[];
        commute_info?: string;
    }

    let { data }: { data: PageData } = $props();

    // On s'assure que TypeScript comprend que 'content' suit notre interface
    
// 1. Définis l'interface (si tu ne l'as pas déjà fait)
interface TravelOption {
    id: string;
    title: string;
    icon: string;
    content: TravelContent; // Utilise l'interface TravelContent définie plus haut
}

// 2. Utilise la rune $derived
let options = $derived((data.options as unknown as TravelOption[]) ?? []);
</script>

<section class="coming">
    <div class="grid">
        <div class="left">
            <hgroup>
                <h1>Coming to Geneva…</h1>
                <p>
                    <strong>There are lots of ways to get to Geneva!</strong><br
                    />
                    Whether you're local, from Switzerland, or from far away.
                </p>
            </hgroup>
        </div>
        <div class="right">
            <div class="accordion">
                {#each options as option (option.id)}
                    <Accordion title={option.title} icon={option.icon}>
                        <div class="accordion-inner">
                            {#if option.content.paragraphs}
                                {#each option.content.paragraphs as p}
                                    <p class="mb-4">{@html sanitize(p)}</p>
                                {/each}
                            {:else if option.id === "stay"}
                                <p class="mb-2 text-lg">
                                    {@html sanitize(option.content.intro ?? "")}
                                </p>
                                <p class="mb-4 font-bold text-blue-600">
                                    {option.content.pricing_info}
                                </p>

                                <ul class="list-disc ml-5 mb-4">
                                    {#each option.content.budget_options ?? [] as hotel}
                                        <li class="mb-1">
                                            <a
                                                href={hotel.url}
                                                target="_blank"
                                                class="underline hover:text-blue-500"
                                            >
                                                {hotel.name}
                                            </a>
                                        </li>
                                    {/each}
                                </ul>

                                {#if option.content.camping}
                                    <div
                                        class="bg-slate-100 p-4 rounded-lg mb-4 border-l-4 border-green-500"
                                    >
                                        <p>
                                            {option.content.camping.icon}
                                            <strong
                                                >{option.content.camping
                                                    .name}</strong
                                            >
                                            :
                                            {option.content.camping.description}
                                        </p>
                                    </div>
                                {/if}

                                {#each option.content.benefits ?? [] as benefit}
                                    <p
                                        class="italic text-sm text-slate-600 mb-2 border-l-2 border-slate-300 pl-3"
                                    >
                                        {benefit}
                                    </p>
                                {/each}

                                <p class="mt-4 text-xs opacity-75">
                                    {option.content.commute_info}
                                </p>
                            {/if}
                        </div>
                    </Accordion>
                {/each}
            </div>
        </div>
    </div>
</section>

<style>
    /* Petit correctif pour l'espacement dans l'accordéon */
    .accordion-inner p {
        margin-bottom: 1rem;
    }
    .accordion-inner ul {
        margin-bottom: 1.5rem;
    }
</style>
