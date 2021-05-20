const searchBtn = document.getElementById("search-btn");
const mealList = document.querySelector(".meal-list");
const mealDetailContent = document.querySelector(".meal-details-content");
const mealResult = document.querySelector(".meal-result");
const scroll = new SmoothScroll('a[href*="#"]');
const navbar = document.getElementById("header-nav");
// const recipeCloseButton = document.getElementById("recipe-close-btn");

// event listener
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
// recipeCloseButton.addEventListener("click", () => {
//   console.log(`parenElement is, ${mealDetailContent.parentElement.classList}`);
//   mealDetailContent.parentElement.classList.remove("showRecipe");
// });

async function getMealList() {
  let searchInputText = document.getElementById("search-input").value.trim();
  let empty = "empty";

  const cors = "https://cors-anywhere.herokuapp.com/";
  if (searchInputText === "") {
    mealHtmlData(empty);
  } else {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`
    );
    const mealDatas = await response.json();
    //   console.log(mealDatas);
    mealHtmlData(mealDatas, searchInputText);
  }
}

async function getMealRecipe(e) {
  e.preventDefault();
  let mealItem = e.target.parentElement.parentElement;
  //   console.log(mealItem);
  const cors = "https://cors-anywhere.herokuapp.com/";
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
  );
  const datas = await response.json();
  mealModalData(datas.meals);
}

function mealHtmlData(mealDatas, inputtext) {
  console.log(mealDatas);

  let html = "";

  if (mealDatas === "empty") {
    // html = `Sorry, we didn't find any meal! with keyword ${inputtext}`;
    html = `Sorry, you must input the ingredients`;

    mealList.classList.add("notFound");
    // break;
  } else if (mealDatas.meals) {
    mealDatas.meals.forEach((meal) => {
      html += `
          <div 
              class="meal-item"
              data-id = "${meal.idMeal}"
              >
              <div class="meal-img">
                  <img class="image" src="${meal.strMealThumb}" alt="food-image" />
              </div>

              <div class="meal-name" data-id = "${meal.idMeal}">
                  <h3>${meal.strMeal}</h3>
 
                  <a href="#" class="recipe-btn"> Dapatkan Resep </a>
              </div>
          </div>
          `;
    });
    mealList.classList.remove("notFound");
  } else {
    // html = `Sorry, we didn't find any meal!`;
    html = `Sorry, we can't find any meal with keyword "${inputtext}"`;

    mealList.classList.add("notFound");
  }

  mealResult.classList.remove("display-none");
  mealList.innerHTML = html;
}

function mealModalData(meal) {
  console.log(meal);
  meal = meal[0];

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
              <img class="recipe-meal-img" src="${
                meal.strMealThumb
              }" alt="recipe-image" loading="lazy"/>
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
        <a class="linkYt" href="${meal.strYoutube}" target="_blank">Watch ${
    meal.strMeal
  } Videos</a>
    </div>
  `;
  const mDetailContent = document.querySelector(".meal-details-content");
  const FragmentModal = document
    .createRange()

    .createContextualFragment(modalHtml);

  mDetailContent.append(FragmentModal);

  console.log(mealDetailContent);

  function showMore() {
    // const moreInfo = document.querySelector('.moreInfo').style.display = 'block'
    const recipeCloseButton = document.getElementById("recipe-close-btn");
    recipeCloseButton.addEventListener("click", () => {
      console.log(
        `parenElement is, ${mealDetailContent.parentElement.classList}`
      );
      mDetailContent.parentElement.classList.remove("showRecipe");
      mDetailContent.innerHTML = "";
    });
  }

  // const mDetailContent = document.querySelector(".meal-details-content");

  mDetailContent.parentElement.classList.add("showRecipe");
  showMore();
  console.log(`parenElement is, ${mDetailContent.parentElement.classList}`);
  console.log(mDetailContent.parentElement.classList);

  // mealDetailContent.classList.add("showRecipe");
}

function reset() {
  mealResult.classList.add("display-none");
}

reset();

window.onscroll = function () {
  if (window.pageYOffset > 100) {
    // vertical axis above 100px
    navbar.style.backgroundColor = "#333";
  } else {
    // scrolled = false;
    navbar.style.backgroundColor = "transparent";
  }
};
