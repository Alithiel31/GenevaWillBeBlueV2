<script lang="ts">
  import logo from "$lib/assets/Geneve-Color.png";
  import { base } from "$app/paths"; // Importation de la base pour les liens internes

  const registerUrl = "https://register.geneva.willbe.blue/";
</script>

<header class="custom-header">
  <div class="header-container">
    <nav class="nav-wrapper">
      <a href="{base}/" class="brand">
        <img src={logo} alt="Geneva Blue Logo" class="logo-img" />
        <span class="brand-name"
          >GENEVA WILL BE<span class="cyan-text"> BLUE</span></span
        >
      </a>

      <ul class="nav-right">
        <li class="dropdown">
          <button class="dropdown-trigger" aria-haspopup="true">
            FAQ <span class="arrow">▾</span>
          </button>
          <ul class="dropdown-menu">
            <li><a href="/anomaly-faq">Anomaly FAQ</a></li>
            <li><a href="/general-faq">General FAQ</a></li>
            <li><a href="/coming-to-geneva">Travel Info</a></li>
          </ul>
        </li>

        <li class="nav-item-btn">
          <a
            href={registerUrl}
            class="btn-register"
            target="_blank"
            rel="noopener noreferrer"
          >
            REGISTER
          </a>
        </li>
      </ul>
    </nav>
  </div>
</header>

<style lang="scss">
  @use "$lib/styles/variables" as *;

  .custom-header {
    background: rgba(0, 0, 0, 0.7); // Légèrement plus opaque pour la lisibilité
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border-bottom: 1px solid rgba($ingress-cyan, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    height: $header-height; // Utilisation de ta variable globale

    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      height: 100%;
      padding: 0 20px;
    }

    .nav-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
    }
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    color: $white;
    transition: opacity 0.3s;

    .logo-img {
      height: 45px;
      width: auto;
    }

    .brand-name {
      font-weight: 800;
      letter-spacing: 1px;
      font-size: 1.2rem;

      .cyan-text {
        color: $ingress-cyan;
      }
    }

    &:hover {
      opacity: 0.8;
    }
  }

  .nav-right {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    gap: 25px; // Espace entre FAQ et Register
  }

  /* Style du Dropdown FAQ */
  .dropdown {
    position: relative;

    .dropdown-trigger {
      color: $ingress-cyan;
      font-weight: 700;
      background: none;
      border: none;
      padding: 0.5rem;
      cursor: pointer;
      font-family: inherit;
      font-size: 1rem;
      display: flex;
      align-items: center;
      gap: 5px;

      .arrow {
        font-size: 0.8rem;
        transition: transform 0.3s;
      }
    }

    .dropdown-menu {
      display: none;
      position: absolute;
      right: 0;
      top: 100%;
      background: rgba(10, 10, 10, 0.95);
      border: 1px solid rgba($ingress-cyan, 0.3);
      border-radius: 8px;
      min-width: 200px;
      padding: 0.5rem 0;
      list-style: none;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

      li a {
        color: $white;
        padding: 10px 20px;
        display: block;
        text-decoration: none;
        font-size: 0.9rem;

        &:hover {
          background: rgba($ingress-cyan, 0.1);
          color: $ingress-cyan;
        }
      }
    }

    &:hover {
      .dropdown-menu {
        display: block;
      }
      .arrow {
        transform: rotate(180deg);
      }
    }
  }

  /* Style spécifique du bouton REGISTER */
  .btn-register {
    color: $ingress-cyan;
    font-weight: 800;
    text-decoration: none;
    border: 1px solid $ingress-cyan;
    border-radius: 4px;
    padding: 8px 20px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    letter-spacing: 1px;

    &:hover {
      background: rgba($ingress-cyan, 0.15);
      box-shadow: 0 0 15px rgba($ingress-cyan, 0.4);
      transform: translateY(-1px);
    }
  }
</style>
