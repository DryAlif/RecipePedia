import axios from "axios";
import DataSource from "../data/data-source.js";
import "../component/header-content.js";
import "../component/search-box.js";
import "../component/recipe-list.js";

import "../component/recipe-detail.js";
// import "../component/club-list.js";
// import "../component/meal-list.js";
// import "../component/search-bar.js";
// import "../component/search-recipe.js";
// import DataSource from "../data/data-source.js";
import "../component/footer-box.js";

const main = () => {
  const buttonSearchElement = document.querySelector("#search-btn");
  // const mDetailContent = document.querySelector(".meal-details-content");
  const mDetailContent = document.querySelector(".meal-details__container");

  //  const searchElement = document.querySelector("#search-input");

  const searchElement = document.querySelector("search-box");

  // const mealListElement = document.querySelector(".meal-list");
  const recipeListElement = document.querySelector("recipe-list");
  const recipeDetail = document.querySelector("recipe-detail");
  // const recipeItemElement = document.querySelector("recipe-item");
  // console.log(recipeItemElement);

  const mealResult = document.querySelector(".meal-result");
  const body = document.querySelector("body");
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const navbar = document.getElementById("header-nav");

  //   const scroll = new SmoothScroll('a[href*="#"]');

  const onButtonSearchClicked = async () => {
    recipeListElement.innerHTML = "";
    recipeListElement.classList.remove("notFound");

    try {
      const result = await DataSource.searchRecipe(searchElement.value.trim());

      recipeListElement.clickEvent = onRecipeDeatilClicked;

      console.log("result", result);
      renderResult(result);

      // recipeItemElement.addEventListener("click", onRecipeDeatilClicked);

      // recipeItemElement.clickEvent = onRecipeDeatilClicked;
    } catch (message) {
      fallbackResult(message);
    }
  };

  const onRecipeDeatilClicked = async (e) => {
    e.preventDefault();

    // const searchElt = document.querySelector("search-box");
    // let btn = searchElt.querySelector(".search-btn").removeEventListener();
    // btn.removeEventListener();
    // console.log(btn);
    // console.log(recipeDetailItem);

    // let recipeDetailItem = e.target.parentElement.parentElement.dataset.id;

    if (e.target.classList.contains("recipe-btn")) {
      let recipeDetailItem = e.target.closest(".meal-name").dataset.id;

      console.log(recipeDetailItem);

      const detailResult = await DataSource.searchRecipeDetail(
        recipeDetailItem
      );

      // console.log(detailResult);

      //////////////////////////////////////////////////////////////////////////////////////
      // Membuat Modal Overlay unclickable button Effect with cheap setter&getter Hacks hehe
      // belum menguasai membuat modal dengan shadow dom
      recipeDetail.searchElement_clickEvent = onButtonSearchClicked;
      recipeDetail.recipeDetail_clickEvent = onRecipeDeatilClicked;
      recipeDetail.recipeData = detailResult;
    }
  };

  const renderResult = (results) => {
    recipeListElement.recipes = results;

    // recipeListElement.classList.add("");
    // let arr = "";
  };

  const fallbackResult = (message) => {
    recipeListElement.messages = message;
    recipeListElement.classList.add("notFound");
  };

  const renderRecipeDetail = (results) => {
    let meal = results[0];
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
            <i class="fas fa-times"></i>
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
    // const mDetailContent = document.querySelector(".meal-details-content");

    function showMore() {
      // const moreInfo = document.querySelector('.moreInfo').style.display = 'block'
      const recipeCloseButton = document.getElementById("recipe-close-btn");

      recipeCloseButton.addEventListener("click", () => {
        mDetailContent.parentElement.classList.remove("showRecipe");
        document.body.removeChild(overlay);
        modalHtml = "";
        mDetailContent.innerHTML = "";

        buttonSearchElement.addEventListener("click", onButtonSearchClicked);
        // recipeListElement.addEventListener("click", onRecipeDeatilClicked);
      });
    }

    mDetailContent.append(FragmentModal);
    modalHtml = "";
    mDetailContent.parentElement.classList.add("showRecipe");
    console.log(mDetailContent.parentElement.classList);
    body.append(overlay);
    buttonSearchElement.removeEventListener("click", onButtonSearchClicked);
    // recipeListElement.removeEventListener("click", onRecipeDeatilClicked);

    showMore();
    // mDetailContent.innerHTML = "";
  };

  ////////////////////////////////////////////////////////////////////////

  searchElement.clickEvent = onButtonSearchClicked;

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 40) {
      // vertical axis above 100px
      navbar.style.backgroundColor = "#333";
    } else {
      // scrolled = false;
      navbar.style.backgroundColor = "transparent";
    }
  });
};

export default main;
