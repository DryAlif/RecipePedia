const axios = require("axios");
class DataSource {
  static searchRecipe(searchInputText) {
    if (searchInputText == "") {
      return Promise.reject(`Sorry, you must input the ingredients`);
    }

    //Make a request for a user with a given Input
    return axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.meals) {
          // handle success

          // return res.data.meals;
          return Promise.resolve(res.data.meals);
        }

        return Promise.reject();
      })
      .catch((error) => {
        // handle error
        console.log(error);

        return Promise.reject(
          //   `${searchInputText} is not found`
          `Sorry, we can't find any meal with keyword "${searchInputText}"`
        );
      });

    // return fetch(
    //   // `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputText}`
    //   `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`
    // )
    //   .then((response) => {
    //     return response.json();
    //     // console.log(response);
    //   })
    //   .then((responseJson) => {
    //     // console.log(responseJson);
    //     console.log(responseJson.meals);
    //     if (responseJson.meals) {
    //       return Promise.resolve(responseJson.meals);
    //     } else {
    //       return Promise.reject(
    //         //   `${searchInputText} is not found`
    //         `Sorry, we can't find any meal with keyword "${searchInputText}"`
    //       );
    //     }
    //   });
  }

  static searchRecipeDetail(recipeDetailItem) {
    // Make a request for a user with a given ID
    return axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeDetailItem}`
      )
      .then((response) => {
        // handle success
        console.log(response.data.meals);
        return Promise.resolve(response.data.meals);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });

    // return fetch(
    //   `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeDetailItem}`
    // )
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((responseJson) => {
    //     return Promise.resolve(responseJson.meals);
    //   });
  }

  // const checkOnlineStatus = async () => {
  //   try {
  //     const online = await fetch("/1pixel.png");
  //     return online.status >= 200 && online.status < 300; // either true or false
  //   } catch (err) {
  //     return false; // definitely offline
  //   }
  // };
}

export default DataSource;
