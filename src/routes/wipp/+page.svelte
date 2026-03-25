<script lang="ts">
  // Ici, on pourrait ajouter une petite animation au chargement si on voulait
</script>

<main class="wip-container">
    <article class="wip-content">
        <h1 class="wip-title">Agent ! This area is under construction</h1>
        <p class="wip-message">
            This scanner section is not yet synchronized. <br>
            Return shortly for details regarding the Geneva anomaly.
        </p>

        <div class="wip-image-container">
            <img src="https://http.cat/503"
                alt="Illustration humoristique d'un chat : Erreur 503, service temporairement indisponible."
                class="wip-image">
        </div>

        <div class="wip-coming-soon-buttons">
            <div class="coming-soon-item">
                <button type="button" class="btn btn-disabled" disabled aria-disabled="true">
                    Resistance Registration
                    <span class="coming-soon-badge">Coming Soon</span>
                </button>
            </div>
            <div class="coming-soon-item">
                <button type="button" class="btn btn-disabled" disabled aria-disabled="true">
                    Swag Shop
                    <span class="coming-soon-badge">Coming Soon</span>
                </button>
            </div>
        </div>

        <div class="wip-actions">
            <a href="/" class="btn-back">Home Page</a>
        </div>
    </article>
</main>

<style lang="scss">
    @use "$lib/styles/variables" as *;

    .wip-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1; 
        min-height: calc(100vh - 160px);
        padding: 2rem;
        text-align: center;

        .wip-content {
            max-width: 600px;
            width: 100%;
            background: rgba(0, 0, 0, 0.6);
            padding: 3rem;
            border-radius: 15px;
            border: 1px solid rgba($ingress-cyan, 0.3);
            backdrop-filter: blur(5px);
        }

        .wip-title {
            font-size: 2.25rem;
            color: $ingress-cyan;
            margin-bottom: 1rem;
            line-height: 1.2;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .wip-message {
            font-size: 1.25rem;
            color: #e0e0e0;
            margin-bottom: 2.5rem;
            line-height: 1.6;
            font-family: $font-open-sans;
        }

        .wip-image-container {
            margin-bottom: 2.5rem;

            .wip-image {
                max-width: 100%;
                height: auto;
                border-radius: 12px;
                border: 4px solid $ingress-cyan;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                transition: $transition-base;

                &:hover {
                    transform: scale(1.02);
                }
            }
        }
    }

    .btn-back {
        display: inline-block;
        padding: 1rem 2rem;
        background-color: #0072ce;
        color: $white !important;
        text-decoration: none;
        font-weight: bold;
        font-size: 1.1rem;
        border-radius: 6px;
        transition: $transition-base;
        border: none;

        &:hover {
            background-color: $ingress-cyan;
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba($ingress-cyan, 0.4);
        }
    }

    .btn.btn-disabled {
        background-color: rgba($white, 0.05) !important;
        color: rgba($white, 0.4) !important;
        border: 2px dotted rgba($white, 0.2) !important;
        cursor: not-allowed;
        opacity: 0.6;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 1rem;
        width: 100%;
    }

    .coming-soon-badge {
        display: inline-block;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        color: rgba(255, 212, 0, 0.8);
        background: rgba(255, 212, 0, 0.15);
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        letter-spacing: 0.05em;
    }

    .wip-coming-soon-buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 2rem 0;
        padding: 1.5rem;
        border: 1px solid rgba($white, 0.1);
        border-radius: 10px;
        background: rgba($white, 0.02);

        .coming-soon-item {
            display: flex;
            justify-content: center;
            
            .btn {
                min-width: 250px;
            }
        }
    }
</style>