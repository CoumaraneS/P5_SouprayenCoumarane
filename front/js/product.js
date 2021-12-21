const itemId = new URL(window.location.href).searchParams.get("id");

//Récupération des éléments par ID et par classe
let itemImg = document.querySelector("item_img");
let img = document.createElement("img");
itemImg.appendChild(img);
let itemTitle = document.getElementById("title");
let itemPrice = document.getElementById("price");
let itemDescription = document.getElementById("description");
let itemColors = document.getElementById("colors");

//Récupération de l'item
getItem();

async function getItem() {
    await fetch("http://localhost:3000/api/products/" + itemId)
    .then((response) => response.json())
    .then(item => {
        img.setAttribute("src", item.imageUrl);
        img.setAttribute("alt", item.altTxt);
        itemTitle.textContent = item.name;
        itemPrice.textContent = item.price;
        itemDescription.textContent = item.description;
        document.title = item.name;

        for (let i=0; i < item.colors.length; i++) {
            let color = document.createElement("option");
            color.setAttribute("value", item.colors [i]);
            color.textContent = item.colors [i];
            itemColors.appendChild(color);
        }
    })
}


console.log();