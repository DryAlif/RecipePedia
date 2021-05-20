class SearchBox extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  ////////////////////////////////////////////////////////////////
  // Modal Overlay unclickable button Effect with cheap Hacks hehe
  // belum menguasai membuat modal dengan shadow dom
  set newClickEvent(addNewevent) {
    this._newclickEvent = addNewevent;
    this.renderNewClickEvent();
  }

  set removeClickEvent(removeEvent) {
    this._removeClickEvent = removeEvent;
    this.renderRemoveClickEvent();
  }

  renderNewClickEvent() {
    this.querySelector("#search-btn").addEventListener(
      "click",
      this._newclickEvent
    );
    const searchinput = document.getElementById("search-input");
    searchinput.disabled = false;
  }

  renderRemoveClickEvent() {
    this.querySelector("#search-btn").removeEventListener(
      "click",
      this._removeClickEvent
    );
    const searchinput = document.getElementById("search-input");
    searchinput.disabled = true;
  }

  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

  get value() {
    return this.querySelector("#search-input").value;
  }

  render() {
    this.innerHTML = `
    <h2 class="title">SEARCH BY YOUR FAVOURITE Ingredients</h2>
    <blockquote>
      Real Food doesnt have ingredients, real food is ingredients
      <br />
     
      <cite>- Jamie Oliver</cite>
    </blockquote>
    <br />
   
      <div class="meal-search-box">
          <input
            type="text"
            name=""
            id="search-input"
            class="search-control"
            placeholder="Enter an ingredient"
          />
          <button type="submit" class="search-btn btn" id="search-btn">
          <i class="las la-search"></i>
          </button>
    </div>
    <blockquote>
    for example Input something like egg, chicken breast, milk
    </blockquote>
    `;
    this.querySelector("#search-btn").addEventListener(
      "click",
      this._clickEvent
    );
  }
}

customElements.define("search-box", SearchBox);
