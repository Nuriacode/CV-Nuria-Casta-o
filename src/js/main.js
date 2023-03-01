"use strict";

//Global variables: getting from HTML
const input = document.querySelector(".js_descSearch"); //what of someone type insside input
const placeholder =
  "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"; //img url of random image
const urlCocktails = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`;
const btnSearch = document.querySelector(".js_btnSearch"); //search button
const btnReset = document.querySelector(".js_btnReset"); //reset button
const textMsg = document.querySelector(".js_msg");
const cocktails = document.querySelector(".js_listCocktail"); //cocktails list
const favCocktail = document.querySelector(".js_listFavorites"); //Favorites cocktail list
const logBtn = document.querySelector(".js_log");

let listCocktailData = []; //cocktail array
let listFavCocktailData = []; //favorites cocktail array

//Getting localstorage
const cocktailStoraged = JSON.parse(localStorage.getItem("Cocktail"));
console.log(listFavCocktailData);

function getFavStorage() {
  if (cocktailStoraged) {
    listFavCocktailData = cocktailStoraged;
    renderFavListCocktail(listFavCocktailData);
  }
}
getFavStorage();

console.log(listFavCocktailData);
console.log(cocktailStoraged);

//1-Getting information from the server. The information will show when user load the page. Each cocktail objets will be in cocktail array, (listCocktailData). Then, the function renderListCocktail, show the objetcs in the screen.
initialFetch();
function initialFetch() {
  fetch(urlCocktails)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      listCocktailData = data.drinks;
      console.log(listCocktailData);

      renderListCocktail(listCocktailData);
    });
}

//Function that render the list of the array of objects
function renderListCocktail(listCocktailData) {
  cocktails.innerHTML = "";
  for (const cocktail of listCocktailData) {
    cocktails.innerHTML += renderCocktail(cocktail);
  }
  eventToCocktail();
}

//Function that render each object (cocktail) from the server.
function renderCocktail(cocktail) {
  let ingredientes = `${cocktail.strIngredient1}, ${cocktail.strIngredient2} y ${cocktail.strIngredient3}`;
  if ( cocktail.strIngredient4){
    ingredientes = `${cocktail.strIngredient1}, ${cocktail.strIngredient2}, ${cocktail.strIngredient3} y ${cocktail.strIngredient4}`;
  }
  if (!cocktail.strDrinkThumb) {
    cocktail.strDrinkThumb = placeholder;
  }
  let html = "";
  html += `<li> 
  <article class="article js_liElement" id="${cocktail.idDrink}">
    <img class="img" src="${cocktail.strDrinkThumb}" alt="Foto Cocktail ${cocktail.strDrink}"> 
    <h3>${cocktail.strDrink}</h3>
    <p> Ingredientes: ${ingredientes}</p>
  </article>
  </li>`;

  return html;
}

//function of the favourites list
function renderFavListCocktail(listFavCocktail) {
  favCocktail.innerHTML = "";
  for (const item of listFavCocktail) {
    favCocktail.innerHTML += renderFavCocktail(item);
  }
  eventoToFavCocktail();
}

//click search handler function
const handleClickSearch = (ev) => {
  //console.log("funciona");
  const valueDesc = input.value;
  if (valueDesc === "") {
    textMsg.innerHTML = "";
  } else {
    ev.preventDefault();
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${valueDesc}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        listCocktailData = data.drinks;
        console.log(listCocktailData);

        renderListCocktail(listCocktailData);
      });
  }
};

//2- Event click on the search button.
btnSearch.addEventListener("click", handleClickSearch);

//eventToCocktail handler function
const handleClickCocktail = (ev) => {
  console.log("Me has seleccionado");
  console.log(ev.currentTarget.id);
  ev.currentTarget.classList.toggle("selected");
  const idSelected = ev.currentTarget.id;
  //search for the object of the selected cocktail in the entire cocktail list
  const cocktailSelected = listCocktailData.find(
    (cocktail) => cocktail.idDrink === idSelected
  );
  console.log(cocktailSelected);
  //look for the position of the cocktail in my list of favourites. if it is -1 it is not in that list and you have to put it in
  const indexCocktail = listFavCocktailData.findIndex(
    (cocktail) => cocktail.idDrink === idSelected
  );
  console.log(indexCocktail);
  if (indexCocktail === -1) {
    listFavCocktailData.push(cocktailSelected);
    console.log(listFavCocktailData);
  } else {
    listFavCocktailData.splice(indexCocktail, 1);
  }
  //paint the favourites list with function renderFavListCocktail
  renderFavListCocktail(listFavCocktailData);
  //4Localstorage:  what to save and when to save it. Save the list of favourites when one of the items is clicked.
  localStorage.setItem("Cocktail", JSON.stringify(listFavCocktailData));
};

//function that is executed once the data is taken from the server and includes a click event in each cocktail.
const eventToCocktail = () => {
  const liElementCocktail = document.querySelectorAll(".js_liElement"); //elementos de li
  //loop to select all elements and add a click event to each of them
  for (const item of liElementCocktail) {
    item.addEventListener("click", handleClickCocktail);
  }
};

//Reset button
function handleClickReset(ev) {
  ev.preventDefault();
  //console.log("resetea");
  input.value = "";
  cocktails.innerHTML = "";
  listFavCocktailData = [];
  favCocktail.innerHTML = "";
  localStorage.removeItem("Cocktail");

  initialFetch();
}

btnReset.addEventListener("click", handleClickReset);

//1-paint the X (inside the article) when it enters the favourites array. function paint
//

//Function that render each object (cocktail) from the server.
function renderFavCocktail(cocktail) {
  if (!cocktail.strDrinkThumb) {
    cocktail.strDrinkThumb = placeholder;
  }
  let html = "";
  html += `<li> 
  <article class="article js_liElement" id="${cocktail.idDrink}">
    <p class="remove js_removeFav" id="${cocktail.idDrink}">x</p>
    <img class="img" src="${cocktail.strDrinkThumb}" alt="Foto Cocktail ${cocktail.strDrink}"> 
    <h3>${cocktail.strDrink}</h3>
  </article>
  </li>`;
  return html;
}

function eventoToFavCocktail() {
  const removeFav = document.querySelectorAll(".js_removeFav");
  for (const item of removeFav) {
    item.addEventListener("click", handeleClickRemoveFav);
  }
}

function handeleClickRemoveFav(ev) {
  console.log(ev.currentTarget.id);
  const idFavSelected = ev.currentTarget.id;
  const indexFavCocktail = listFavCocktailData.findIndex(
    (favCocktail) => favCocktail.idDrink === idFavSelected
  );
  console.log(indexFavCocktail);
  if (!indexFavCocktail) {
    listFavCocktailData.splice(indexFavCocktail, 1);
  }
  localStorage.removeItem("Cocktail");
  renderFavListCocktail(listFavCocktailData);
  renderListCocktail(listCocktailData);
}

function handleclickLgBtn(ev) {
  ev.preventDefault();
  console.log(`Tienes:${listFavCocktailData.length} favoritos`);
}

logBtn.addEventListener("click", handleclickLgBtn);
