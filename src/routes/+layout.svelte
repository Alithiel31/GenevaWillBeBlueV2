<script lang="ts">
    import favicon from "$lib/assets/Geneve-Color.png";
    import "$lib/styles/app.scss";
    

    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <title>Geneva Will Be Blue | Resistance Switzerland </title>
</svelte:head>

<div class="app-layout">
    <Header />

    <main class="content-area">
        {@render children()}
    </main>

    <Footer />
</div>

<style lang="scss">
    @use "$lib/styles/variables" as *;

    .app-layout {
        display: flex;
        flex-direction: column;
        min-height: 100vh; // Force le layout à faire toute la hauteur de l'écran
        width: 100%;
        overflow-x: hidden; // Évite les scrolls horizontaux parasites sur mobile
    }

    .content-area {
        flex: 1;

        padding-top: 70px;

        // Animation de transition douce entre les pages
        animation: fadeInPage 0.5s ease-out;
    }

    @keyframes fadeInPage {
        from {
            opacity: 0;
            transform: translateY(5px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
