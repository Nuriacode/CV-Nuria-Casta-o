"use strict";const input=document.querySelector(".js_descSearch"),placeholder="https://via.placeholder.com/210x295/ffffff/666666/?text=TV",urlCocktails="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita",btnSearch=document.querySelector(".js_btnSearch"),btnReset=document.querySelector(".js_btnReset"),textMsg=document.querySelector(".js_msg"),cocktails=document.querySelector(".js_listCocktail"),favCocktail=document.querySelector(".js_listFavorites");let listCocktailData=[],listFavCocktailData=[];const cocktailStoraged=JSON.parse(localStorage.getItem("Cocktail"));function getFavStorage(){cocktailStoraged&&(listFavCocktailData=cocktailStoraged,renderFavListCocktail(listFavCocktailData))}function initialFetch(){fetch(urlCocktails).then(t=>t.json()).then(t=>{console.log(t),listCocktailData=t.drinks,console.log(listCocktailData),renderListCocktail(listCocktailData)})}function renderListCocktail(t){cocktails.innerHTML="";for(const e of t)cocktails.innerHTML+=renderCocktail(e);eventToCocktail()}function renderCocktail(t){t.strDrinkThumb||(t.strDrinkThumb=placeholder);let e="";return e+=`<li> \n  <article class="article js_liElement" id="${t.idDrink}">\n    <img class="img" src="${t.strDrinkThumb}" alt="Foto Cocktail ${t.strDrink}"> \n    <h3>${t.strDrink}</h3>\n  </article>\n  </li>`,e}function renderFavListCocktail(t){favCocktail.innerHTML="";for(const e of t)favCocktail.innerHTML+=renderFavCocktail(e);eventoToFavCocktail()}console.log(listFavCocktailData),getFavStorage(),console.log(listFavCocktailData),console.log(cocktailStoraged),initialFetch();const handleClickSearch=t=>{const e=input.value;if(""===e)textMsg.innerHTML="";else{t.preventDefault();fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+e).then(t=>t.json()).then(t=>{console.log(t),listCocktailData=t.drinks,console.log(listCocktailData),renderListCocktail(listCocktailData)})}};btnSearch.addEventListener("click",handleClickSearch);const handleClickCocktail=t=>{console.log("Me has seleccionado"),console.log(t.currentTarget.id),t.currentTarget.classList.toggle("selected");const e=t.currentTarget.id,a=listCocktailData.find(t=>t.idDrink===e);console.log(a);const l=listFavCocktailData.findIndex(t=>t.idDrink===e);console.log(l),-1===l?(listFavCocktailData.push(a),console.log(listFavCocktailData)):listFavCocktailData.splice(l,1),renderFavListCocktail(listFavCocktailData),localStorage.setItem("Cocktail",JSON.stringify(listFavCocktailData))},eventToCocktail=()=>{const t=document.querySelectorAll(".js_liElement");for(const e of t)e.addEventListener("click",handleClickCocktail)};function handleClickReset(t){t.preventDefault(),input.value="",cocktails.innerHTML="",listFavCocktailData=[],favCocktail.innerHTML="",localStorage.removeItem("Cocktail"),initialFetch()}function renderFavCocktail(t){t.strDrinkThumb||(t.strDrinkThumb=placeholder);let e="";return e+=`<li> \n  <article class="article js_liElement" id="${t.idDrink}">\n    <p class="remove js_removeFav" id="${t.idDrink}">x</p>\n    <img class="img" src="${t.strDrinkThumb}" alt="Foto Cocktail ${t.strDrink}"> \n    <h3>${t.strDrink}</h3>\n  </article>\n  </li>`,e}function eventoToFavCocktail(){const t=document.querySelectorAll(".js_removeFav");for(const e of t)e.addEventListener("click",handeleClickRemoveFav)}function handeleClickRemoveFav(t){console.log(t.currentTarget.id);const e=t.currentTarget.id,a=listFavCocktailData.findIndex(t=>t.idDrink===e);console.log(a),a||listFavCocktailData.splice(a,1),localStorage.removeItem("Cocktail"),renderFavListCocktail(listFavCocktailData),renderListCocktail(listCocktailData)}btnReset.addEventListener("click",handleClickReset);