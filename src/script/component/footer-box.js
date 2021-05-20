class FooterBox extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <footer>
      <p>Belajar Fundamental Pemrograman Web &#169; 2021, Dicoding Academy</p>
    </footer>
        `;
  }
}

customElements.define("footer-box", FooterBox);
