import "./search-box.js";
import "./recipe-list.js";

class recipeDetail extends HTMLElement {
  set recipeData(recipeData) {
    this._recipeData = recipeData;
    // console.log(this._recipeData[0]); //
    this.renderRecipeDetail();
  }

  set searchElement_clickEvent(event) {
    this._searchElement_clickEvent = event;
  }

  set recipeDetail_clickEvent(event) {
    this._recipeDetail_clickEvent = event;
    // this.render();
  }

  renderRecipeDetail() {
    let meal = this._recipeData[0];
    const ingredients = [];

    // Get all ingredients from the object. Up to 20
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        // Stop if there are no more ingredients
        break;
      }
    }

    let modalHtml = `

    <div class="modal-header">
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <button
            type="button"
            class="btn recipe-close-btn"
            id="recipe-close-btn"
        > 
            <i>&times;</i>
        </button>
    </div>

        <div class="modal-main">
                <div class="recipe-flex">

                    <div class="recipe-meal">
                        <img 
                            class="recipe-meal-img" 
                            src="${meal.strMealThumb}" 
                            alt="recipe-image" 
                            loading="lazy"/>
                    </div>

                    <br>

                    <div class="recipe-ingredients">
                        <h3>Ingredients:</h3>
                        <ul>
                            ${ingredients
                              .map((ingredient) => `<li>${ingredient}</li>`)
                              .join("")}
                        </ul>
                    </div>
                </div>
        
            <div class="recipe-instruct">
                <h3>Instruction:</h3>
                <p>${meal.strInstructions}</p>
            </div>

            <div class="recipe-categories">
                <h3>Categories:</h3>
                <p class="recipe-category">${meal.strCategory}</p>
            </div>

        </div>

        <br>

        <div class="recipe-link">
            <a class="linkYt" 
            href="${meal.strYoutube}" 
            target="_blank">
            Watch ${meal.strMeal} Videos</a>
        </div>
        `;

    const FragmentModal = document
      .createRange()
      .createContextualFragment(modalHtml);

    const recipeListElement = document.querySelector("recipe-list");
    const searchElement = document.querySelector("search-box");
    // const mDetailContent = document.querySelector(".meal-details-content");
    const mDetailContent = document.querySelector(".meal-details__container");
    const body = document.querySelector("body");

    const overlay = document.createElement("div");
    overlay.className = "overlay";

    mDetailContent.append(FragmentModal);
    modalHtml = "";
    mDetailContent.classList.add("showRecipe");
    console.log("mDetailContent", mDetailContent.parentElement.classList);
    body.append(overlay);
    // buttonSearchElement.removeEventListener("click", onButtonSearchClicked);

    searchElement.removeClickEvent = this._searchElement_clickEvent;
    recipeListElement.removeClickEvent = this._recipeDetail_clickEvent;
    // body.querySelectorAll("#modal-btn").forEach((item) => {
    //   item.removeEventListener("click", this._clickEvent);
    // });

    this._showMore();
  }

  _showMore() {
    // const moreInfo = document.querySelector('.moreInfo').style.display = 'block'
    // const mDetailContent = document.querySelector(".meal-details-content");
    const mDetailContent = document.querySelector(".meal-details__container");
    const recipeCloseButton = document.getElementById("recipe-close-btn");
    const recipeListElement = document.querySelector("recipe-list");
    const searchElement = document.querySelector("search-box");

    let overlay = document.querySelector(".overlay");

    recipeCloseButton.addEventListener("click", () => {
      mDetailContent.classList.remove("showRecipe");
      document.body.removeChild(overlay);
      //   modalHtml = "";
      mDetailContent.innerHTML = "";

      searchElement.newClickEvent = this._searchElement_clickEvent;
      recipeListElement.newClickEvent = this._recipeDetail_clickEvent;

      //   console.log(recipeListElement);

      //   buttonSearchElement.addEventListener("click", onButtonSearchClicked);
      // recipeListElement.addEventListener("click", onRecipeDeatilClicked);
    });
  }

  //   _removeEventClick() {
  //     this.shadowRoot.querySelector('#toggle-info').removeEventListener();

  //   }
}

customElements.define("recipe-detail", recipeDetail);
