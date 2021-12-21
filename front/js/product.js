const itemId = new URL(window.location.href).searchParams.get("id");

//Récupération des éléments par ID et par classe
let itemImg = document.querySelector(".item__img");
let img = document.createElement("img");
itemImg.appendChild(img);
let itemTitle = document.getElementById("title");
let itemPrice = document.getElementById("price");
let itemDescription = document.getElementById("description");
let itemColors = document.getElementById("colors");

//Récupération de l'item
getProduct();

async function getProduct() {
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
    });
}

//Ajout du ou des articles au panier
let addToCartButton = document.getElementById("addToCart");
addToCartButton.addEventListener ("click", () => {
    addToCart();
});

function addToCart() {

    if (localStorage.getItem("cart")) {

        let cart = localStorage.getItem("cart");
        console.log(cart);
        
    } else {
        
        let productId = itemId;
        let productColor = document.querySelector("#colors").value;
        let productQty = document.querySelector("#quantity").value;

        console.log(productId, productColor, productQty);

        let cartItem = {
            productId : itemId,
            productColor : productColor,
            productQty  : productQty
        };

        console.log(cartItem);

        let itemCart = JSON.stringify(cartItem);
        localStorage.setItem("cart", itemCart);

        alert("Article ajouté au panier");
    }
}
