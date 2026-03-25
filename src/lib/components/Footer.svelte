<footer class="custom-footer">
  <div class="footer-container">
    <div class="footer-section">
      <p class="copyright">
        &copy; 2026 <span class="brand">GENEVA WILL BE BLUE</span>
        <span class="faction">- Resistance Switzerland</span>
      </p>
    </div>

    <div class="footer-section links">
      <a href="mailto:genfwillbeblue@gmail.com" class="footer-contact">
        <span class="contact-label">Contact :</span> genfwillbeblue@gmail.com
      </a>
      <span class="intel-badge">Intel Ops Only</span>
    </div>
  </div>
</footer>

<style lang="scss">
    @use "$lib/styles/variables" as *;

  .custom-footer {
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border-top: 1px solid rgba($ingress-cyan, 0.2);
    width: 100%;
    padding: 30px 0;
    margin-top: auto;
    color: $white;

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-direction: column; // Mobile first
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      padding: 0 20px;

      @media (min-width: 768px) {
        flex-direction: row; // Desktop
      }
    }
  }

  .copyright {
    font-size: 0.9rem;
    margin: 0;
    opacity: 0.8;

    .brand {
      color: $ingress-cyan;
      font-weight: bold;
    }

    .faction {
      letter-spacing: 1px;
      text-transform: uppercase;
      font-size: 0.8rem;
    }
  }

  .footer-contact {
    color: $white !important;
    text-decoration: none;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;

    .contact-label {
      color: $ingress-cyan;
      font-weight: bold;
      margin-right: 8px;
    }

    &:hover {
      color: $ingress-cyan !important;
      text-shadow: 0 0 10px $ingress-cyan-glow;
      transform: translateY(-2px);
    }
  }

  .intel-badge {
    display: inline-block;
    margin-top: 10px;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #ff3e00;
    border: 1px solid rgba(#ff3e00, 0.3);
    padding: 2px 8px;
    border-radius: 4px;
    background: rgba(#ff3e00, 0.05);

    @media (min-width: 768px) {
      margin-top: 0;
      margin-left: 20px;
    }
  }

  .links {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }
</style>
