<script lang="ts">
    import { page } from "$app/state";
</script>

<main class="error-main">
    <div class="cat-container">
        <img
            src="https://http.cat/{page.status || 404}"
            alt="Error Cat {page.status}"
            class="cat-img"
        />
    </div>

    <div class="error-content">
        <p class="error-description">
            <strong>ERROR_{page.status || "UNKNOWN"}:</strong> Portal Link
            severed. <br />
            Agent, even this cat can't find the page you're looking for!
        </p>

        {#if page.status === 404}
            <p class="help-text">
                The XM signature at this coordinates has vanished.
            </p>
        {:else}
            <p class="help-text">A shard has caused a system instability.</p>
        {/if}
    </div>

    <a href="/" class="btn-redeploy">Back to Intel Ops</a>
</main>

<style lang="scss">
    @use "$lib/styles/variables" as *;

    .error-main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 80vh; // Un peu plus haut pour bien centrer
        text-align: center;
        padding: 2rem;

        // On utilise tes variables d'erreur Ingress
        color: $ingress-cyan;

        .cat-container {
            margin-top: 20px;
            position: relative;
            border: 3px solid $ingress-cyan;
            box-shadow: 0 0 25px rgba($ingress-cyan, 0.4);
            border-radius: 12px;
            overflow: hidden;
            max-width: 450px;
            width: 100%;

            .cat-img {
                display: block;
                width: 100%;
                height: auto;
                transition: transform 0.3s ease;

                &:hover {
                    transform: scale(1.02) rotate(1deg);
                }
            }
        }

        .error-content {
            margin: 2rem 0;
        }

        .error-description {
            font-size: 1.2rem;
            line-height: 1.6;
            background: rgba(0, 0, 0, 0.5);
            padding: 15px 25px;
            border-radius: 8px;
            border: 1px dashed rgba($ingress-cyan, 0.3);

            strong {
                color: #ff3e00; // Un rouge alerte pour le code erreur
                font-family: monospace;
            }
        }

        .help-text {
            font-style: italic;
            opacity: 0.7;
            font-size: 0.9rem;
            margin-top: 10px;
        }

        .btn-redeploy {
            display: inline-block;
            padding: 14px 30px;
            border: 2px solid $ingress-cyan;
            color: $ingress-cyan;
            text-decoration: none;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 2px;
            transition: all 0.3s ease;

            &:hover {
                background-color: $ingress-cyan;
                color: #000;
                box-shadow: 0 0 20px $ingress-cyan;
                transform: translateY(-3px);
            }
        }
    }
</style>
