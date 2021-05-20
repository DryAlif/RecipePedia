class headerContent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <nav id="header-nav">
    <div class="header-nav__container">
      <h1 id="logo">
        <span class="text-primary">RESEP</span>PEDIA
        <i class="las la-utensils text-primary fork"></i>

      </h1>

      <ul>
        <li>
          <a href="#search-input" class="current">Find Food</a>
        </li>
      </ul>
    </div>
  </nav>
      <article id="header-content">
      <div class="header-content__container">
        <h1>
          Welcome to ResepPedia, Online Browse Recipe App
          <p class="lead">
            Search Food Recipe based on your favorite ingredients
          </p>
          <a href="#search-input" class="btn-main"> Lets Find </a>
        </h1>
      </div>
    </article>
          `;
  }
}

customElements.define("header-content", headerContent);
