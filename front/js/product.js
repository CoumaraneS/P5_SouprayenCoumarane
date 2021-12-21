const itemId = new URL(window.location.href).searchParams.get("id");

//Récupération des éléments par ID et par classe
let itemImg = document.querySelector("item_img");
let img = document.createElement("img");
itemImg.appendChild(img);
let itemTitle = document.getElementById("title");
let itemPrice = document.getElementById("price");
let itemDescription = document.getElementById("description");
let itemColors = document.getElementById("colors");

console.log();