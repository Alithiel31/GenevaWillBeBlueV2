<script lang="ts">
    // On définit les propriétés que le composant reçoit
    let { title, icon = "", children } = $props();

    // État local réactif pour savoir si cet accordéon est ouvert
    let isOpen = $state(false);
</script>

<div class="accordion">
    <h3>
        <button
            type="button"
            class="accordion-header {isOpen ? 'active' : ''}"
            onclick={() => (isOpen = !isOpen)}
            aria-expanded={isOpen}
        >
            {icon}
            {title}
        </button>
    </h3>

    {#if isOpen}
        <div class="accordion-content active" role="region">
            <div class="content-padding">
                {@render children()}
            </div>
        </div>
    {/if}
</div>

<style lang="scss">
    @use "$lib/styles/variables" as *;

    .accordion {
        background: rgba($white, 0.95);
        border-radius: 10px;
        overflow: hidden;
        margin-top: 3.125rem;
        box-shadow: $shadow;

        &-header {
            color: $text-dark;
            width: 100%;
            padding: 1.125rem 1.375rem;
            border: none;
            background: $white;
            text-align: left;
            cursor: pointer;
            font-size: 1rem;
            border-bottom: 1px solid $border-color;
            transition: $transition-base;
            font-weight: 700;
            outline-offset: -2px;

            &:focus-visible {
                outline: 3px solid $res-blue;
                background: $res-blue-light;
            }

            &:hover {
                background: $res-blue-hover;
                color: $res-blue;
            }

            &.active {
                background: $res-blue-light;
                color: $res-blue;
                border-bottom: 2px solid $res-blue;
                animation: fadeIn 0.4s ease;
            }
          
        }

        &-content {
            display: none;
            padding: 1rem;
            background: $white;
            font-size: 0.9375rem;
            line-height: 1.6;
            color: $text-muted;
            text-align: left;
            font-family: $font-open-sans;

            &.active {
                display: block !important;
                animation: slideDown 0.3s ease-out;
            }

            // Correction ici : Utilisation de :global() pour les éléments du snippet
            :global(p) {
                color: $text-dark;
                margin-bottom: 1.2rem;
                line-height: 1.6;

                &:last-child {
                    margin-bottom: 0;
                }
            }

            :global(li) {
                color: $text-dark;
            }

            :global(a:focus-visible) {
                outline: 2px solid #0000ee;
                outline-offset: 2px;
            }
        }
    }
</style>