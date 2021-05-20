class recipeList extends HTMLElement {
  set recipes(recipes) {
    this._recipes = recipes;
    this.render();
  }

  set messages(messages) {
    this._messages = messages;
    this.renderError();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    // this.render();
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
    this.querySelectorAll("#modal-btn").forEach((item) => {
      item.addEventListener("click", this._newclickEvent);
    });
  }

  renderRemoveClickEvent() {
    this.querySelectorAll("#modal-btn").forEach((item) => {
      item.removeEventListener("click", this._removeClickEvent);
    });
  }
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

  renderError() {
    this.append(this._messages);
  }

  render() {
    // console.log(this._recipes);
    this.innerHTML = "";
    let recipeItemElement = "";
    this._recipes.forEach((recipe) => {
      recipeItemElement = document.createElement("div");
      recipeItemElement.setAttribute("class", "meal-item");

      recipeItemElement.innerHTML = `
        <div class="meal-img">
            <img class="image" src="${recipe.strMealThumb}" alt="food-image" />
        </div>

        <div class="meal-name" data-id = "${recipe.idMeal}">
            <h3 id="meal-title" >${recipe.strMeal}</h3>
            <a id="modal-btn" class="recipe-btn"> Get Recipe Detail </a>
        </div>
        `;

      this.append(recipeItemElement);
      this.querySelectorAll("#modal-btn").forEach((item) => {
        item.addEventListener("click", this._clickEvent);
      });
      //   this.closest("#modal-btn").addEventListener("click", this._clickEvent);
    });
    // console.log(this);
  }

  //   oldrender() {
  //     this.innerHTML = "";
  //     let recipeItemElement = "";
  //     this._recipes.forEach((recipe) => {
  //       const recipeItemElement = document.createElement("recipe-item");
  //       recipeItemElement.setAttribute("class", "meal-item");
  //       recipeItemElement.recipeItem = recipe;
  //       this.appendChild(recipeItemElement);

  //       //   this.closest("#modal-btn").addEventListener("click", this._clickEvent);
  //     });
  //   }
}

customElements.define("recipe-list", recipeList);
