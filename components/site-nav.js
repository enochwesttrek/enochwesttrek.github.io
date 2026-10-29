class SiteNav extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return;

    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        :host { display: block; width: 100%; color: white; font-family: "Viga", "Helvetica Neue", Arial, sans-serif; }
        .nav-links { display: flex; align-items: center; justify-content: center; }
        .nav-links a, .drop-menu { color: white; text-decoration: none; margin: 20px; font-size: 16px; text-shadow: 2px 2px 2px #111; }
        .logo { width: 200px; filter: drop-shadow(4px 2px 2px #111); }
        .halve-container { display: flex; justify-content: end; width: 35vw; gap: 20px; border-bottom: solid; }
        .halve-container-right-side { justify-content: start; }
        .drop-menu { cursor: pointer; position: relative; }
        .dropped-menu { display: none; position: absolute; left: -27px; flex-direction: column; width: 210px; background: white; z-index: 2; }
        .dropped-menu a { color: black; text-shadow: none; }
        .drop-menu:hover .dropped-menu, .drop-menu:focus-within .dropped-menu { display: flex; }
        .phone-menu-icon, .phone-menu-item { display: none; }
        @media (max-width: 1000px) {
          :host { width: auto; }
          .nav-links { display: none; position: fixed; z-index: 1000; inset: 0 0 0 auto; width: 80%; height: 100vh; box-sizing: border-box; overflow-y: auto; padding: 40px; flex-direction: column; align-items: flex-start; justify-content: flex-start; background: #0a0a0a; }
          .nav-links.active { display: flex; }
          .nav-links a, .drop-menu { margin: 15px 0; padding: 8px 0; font-size: 12px; }
          .halve-container { width: auto; flex-direction: column; border: 0; }
          .nav-links .logo-link { display: none; }
          .drop-menu { position: static; }
          .dropped-menu { position: static; background: #000; }
          .dropped-menu a { color: white; }
          .phone-menu-icon { display: block; margin: 30px; padding: 0; border: 0; background: transparent; color: white; font: inherit; font-size: 28px; cursor: pointer; }
          .phone-menu-item { display: none; width: 100%; }
          .phone-menu-item.visible { display: flex; justify-content: flex-end; }
          .phone-menu-exit-icon { border: 0; background: transparent; color: white; font-size: 28px; cursor: pointer; }
        }
      </style>
      <nav aria-label="Site navigation">
        <div class="nav-links">
          <div class="phone-menu-item">
            <button class="phone-menu-exit-icon" type="button" aria-label="Close menu">×</button>
          </div>
          <div class="halve-container">
            <a href="theme.html">Yoked with Him</a>
            <a href="itinerary.html">Import Dates</a>
            <a href="packing.html">Packing List</a>
          </div>
          <a class="logo-link" href="index.html"><img class="logo" src="images/logo.avif" alt="Enoch West Trek" /></a>
          <div class="halve-container halve-container-right-side">
            <div class="drop-menu">
              <span>General Information</span>
              <div class="dropped-menu">
                <a href="preparation.html">Physical & Spiritual Preparation</a>
                <a href="participation-form.html">Participation Form</a>
                <a href="wyoming-trail.html">Trekking at the Wyoming Mormon Trail Sites</a>
                <a href="rules.html">Trek Rules</a>
                <a href="medical.html">Medical Information</a>
                <a href="contacts.html">Contacts</a>
              </div>
            </div>
            <a href="clothing.html">Pioneer Clothing</a>
            <a href="faq.html">FAQ</a>
          </div>
        </div>
        <button class="phone-menu-icon" type="button" aria-label="Open menu">☰</button>
      </nav>
    `;

    // A component-local copy of phone-menu.js. Query within this shadow root
    // so the handlers control this component rather than page-level elements.
    const phoneMenuIcon = root.querySelector(".phone-menu-icon");
    const navLinks = root.querySelector(".nav-links");
    const phoneMenuItem = root.querySelector(".phone-menu-item");
    const phoneMenuExitIcon = root.querySelector(".phone-menu-exit-icon");

    phoneMenuIcon.addEventListener("click", () => {
      console.log("got here");
      navLinks.classList.toggle("active");
      phoneMenuItem.style.display = "flex";
      phoneMenuItem.classList.add("visible");
    });

    phoneMenuExitIcon.addEventListener("click", () => {
      navLinks.classList.remove("active");
      phoneMenuItem.style.display = "none";
      phoneMenuItem.classList.remove("visible");
    });

    document.addEventListener("click", (event) => {
      const path = event.composedPath();
      if (!path.includes(navLinks) && !path.includes(phoneMenuIcon)) {
        navLinks.classList.remove("active");
        phoneMenuItem.style.display = "none";
        phoneMenuItem.classList.remove("visible");
      }
    });
  }
}

customElements.define("site-nav", SiteNav);
