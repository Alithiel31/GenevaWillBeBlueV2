<script lang="ts">
    import { onMount } from "svelte";

    const targetDate = new Date("2026-06-20T14:00:00").getTime(); // Format ISO plus robuste

    let days = $state(0);
    let hours = $state(0);
    let minutes = $state(0);
    let seconds = $state(0);
    let isExpired = $state(false);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            isExpired = true;
            return;
        }

        days = Math.floor(distance / (1000 * 60 * 60 * 24));
        hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((distance % (1000 * 60)) / 1000);
    }

    onMount(() => {
        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    });
</script>

<main class="main-content">
    <h1>Countdown for Geneva Anomaly <br /><span>20th June 2026</span></h1>

    {#if !isExpired}
        <div class="countdown-container" role="timer">
            <div class="time-box">
                <span>{days.toString().padStart(2, "0")}</span>
                <small>Days</small>
            </div>
            <div class="time-box">
                <span>{hours.toString().padStart(2, "0")}</span>
                <small>Hours</small>
            </div>
            <div class="time-box">
                <span>{minutes.toString().padStart(2, "0")}</span>
                <small>Minutes</small>
            </div>
            <div class="time-box">
                <span>{seconds.toString().padStart(2, "0")}</span>
                <small>Seconds</small>
            </div>
        </div>
    {:else}
        <div id="message">🚀 THE ANOMALY HAS BEGUN! 🚀</div>
    {/if}

    <nav class="button-group">
        <a href="/coming-soon" class="btn" aria-disabled="true"
            >Resistance Registration</a
        >
        <a href="/coming-soon" class="btn" aria-disabled="true">Swag Shop</a>

        <a href="/coming-to-geneva" class="btn">Coming to Geneva</a>
        <a href="/anomaly-faq" class="btn">Anomaly FAQ</a>
        <a href="/general-faq" class="btn">General FAQ</a>
    </nav>
</main>

<style lang="scss">
@use "$lib/styles/variables" as *;

    .countdown-container {
        display: flex;
        justify-content: center;
        gap: 1.25rem;
        background: $bg-glass;
        padding: 2.5rem;
        border-radius: 1.25rem;
        flex-wrap: wrap;
        box-shadow: $shadow;
        border: 1px solid #444;
        backdrop-filter: blur(10px);

        .time-box {
            span {
                font-size: 3.5rem;
                font-weight: 800;
                color: $ingress-cyan;
                display: block;
                text-align: center;
            }

            small {
                font-size: 0.875rem;
                text-transform: uppercase;
                color: #cccccc;
                display: block;
                text-align: center;
                letter-spacing: 0.05em;
            }
        }
    }

    .button-group {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 2rem;
        flex-wrap: wrap;
        width: 100%;
        padding: 0 1rem;

        & > a {
            position: relative;
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            gap: 0.35rem;
        }
    }

    .btn {
        padding: 0.8rem 1.6rem;
        background: rgba($white, 0.1);
        border: 2px solid $ingress-cyan-glow;
        color: $white;
        text-decoration: none;
        border-radius: 2rem;
        font-size: 1rem;
        font-weight: 600;
        transition: $transition-base;
        display: inline-block;
        position: relative;

        &:hover,
        &:focus-visible {
            background: $ingress-cyan;
            color: #000;
            box-shadow: 0 0 20px $ingress-cyan-glow;
            transform: translateY(-3px);
        }

        &:focus-visible {
            outline: 3px solid $white;
            outline-offset: 4px;
        }

        &[aria-disabled="true"] {
            background: rgba($ingress-cyan, 0.15) !important;
            color: $white !important;
            border: 2px dotted $ingress-cyan-border !important;
            cursor: not-allowed;
            pointer-events: none;

            &::before {
                content: "Coming Soon";
                position: absolute;
                top: -8px;
                right: -8px;
                font-size: 0.6rem;
                font-weight: 700;
                text-transform: uppercase;
                color: $white;
                background: rgba(0, 148, 178);
                padding: 0.2rem 0.4rem;
                border-radius: 3px;
                letter-spacing: 0.05em;
                white-space: nowrap;
            }

            &:hover,
            &:focus-visible {
                transform: none;
                box-shadow: none;
            }
        }
    }

    #message {
        font-size: 2.5rem;
        color: $ingress-cyan;
        font-weight: bold;
        text-align: center;
        margin-top: 1.25rem;
        backdrop-filter: blur(10px);
        background: rgba(0, 0, 0, 0.7);
        padding: 2rem;
        border-radius: 1rem;
        border: 2px solid $ingress-cyan;
        box-shadow: 0 0 30px $ingress-cyan-glow;
        max-width: 90%;
    }

    .main-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;

        h1 {
            display: flex;
            flex-direction: column;
            padding-bottom: 1.25rem;
            font-weight: 800;
            font-size: 2rem;
            text-align: center;
            line-height: 1.2;
        }
    }
</style>
