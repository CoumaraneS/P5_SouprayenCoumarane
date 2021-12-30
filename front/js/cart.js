//Initialisation et récupération du stockage local
let itemLocalStorage = JSON.parse(localStorage.getItem("cart"));
console.table(itemLocalStorage);

const cartEmpty = document.querySelector("#cart__items");

// Vérification du panier
function getCart(){
if (itemLocalStorage === null || itemLocalStorage == 0) {
    const emptyCart = `<p>Votre panier est vide. <br> Ajoutez des articles à votre panier.</p>`;
    cartEmpty.innerHTML = emptyCart;

} else {

for (let product in itemLocalStorage){
    // Affecter et insérer l'élément "article"
    let productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute('data-id', itemLocalStorage[product].productId);

     // Affecter et insérer l'élément "div"
    let productDiv = document.createElement("div");
    productArticle.appendChild(productDiv);
    productDiv.className = "cart__item__img";

    // Attribuer et insérer une image
    let productImg = document.createElement("img");
    productDiv.appendChild(productImg);
    productImg.src = itemLocalStorage[product].productImg;
    productImg.alt = itemLocalStorage[product].productImgAlt;
    
    // Affecter et insérer l'élément "div"
    let itemContent = document.createElement("div");
    productArticle.appendChild(itemContent);
    itemContent.className = "cart__item__content";

    // Affecter et insérer l'élément "div"
    let itemContentTitlePrice = document.createElement("div");
    itemContent.appendChild(itemContentTitlePrice);
    itemContentTitlePrice.className = "cart__item__content__titlePrice";
    
    // Attribuer et insérer du titre h2
    let productTitle = document.createElement("h2");
    itemContentTitlePrice.appendChild(productTitle);
    productTitle.textContent = itemLocalStorage[product].itemTitle;

    // Attribuer et insérer de la couleur
    let productColor = document.createElement("p");
    productTitle.appendChild(productColor);
    productColor.textContent = itemLocalStorage[product].productColor;
    productColor.style.fontSize = "20px";

    // Attribuer et insérer du prix
    let productPrice = document.createElement("p");
    itemContentTitlePrice.appendChild(productPrice);
    productPrice.textContent = itemLocalStorage[product].productPrice + " €";

    // Affecter et insérer l'élément "div"
    let itemContentSettings = document.createElement("div");
    itemContent.appendChild(itemContentSettings);
    itemContentSettings.className = "cart__item__content__settings";

    // Affecter et insérer l'élément "div"
    let itemContentSettingsQuantity = document.createElement("div");
    itemContentSettings.appendChild(itemContentSettingsQuantity);
    itemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
    
    // Attribuer et insérer la quantité de produit
    let itemQty = document.createElement("p");
    itemContentSettingsQuantity.appendChild(itemQty);
    itemQty.textContent = "Quantité : ";

    // Attribuer et insérer la quantité de produit
    let productQuantity = document.createElement("input");
    itemContentSettingsQuantity.appendChild(productQuantity);
    productQuantity.value = itemLocalStorage[product].productQty;
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");

    // Affecter et insérer l'élément "div"
    let itemContentSettingsDelete = document.createElement("div");
    itemContentSettings.appendChild(itemContentSettingsDelete);
    itemContentSettingsDelete.className = "cart__item__content__settings__delete";

    // Attribuez et insérez le « Supprimer »
    let productSupprimer = document.createElement("p");
    itemContentSettingsDelete.appendChild(productSupprimer);
    productSupprimer.className = "deleteItem";
    productSupprimer.textContent = "Supprimer";

    console.log(productArticle, productImg, productTitle, productColor, productPrice, productQuantity);
}
}}
getCart();

function getTotal(){

    // Calculer et récupérer la quantité totale des produits
    let elementQty = document.getElementsByClassName('itemQuantity');
    let elementLength = elementQty.length,
    totalQty = 0;

    for (let i = 0; i < elementLength; ++i) {
        totalQty += elementQty[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.textContent = totalQty;
    console.log(totalQty);

    // Calculer et récupérer le prix total des produits
    totalPrice = 0;

    for (let i = 0; i < elementLength; ++i) {
        totalPrice += (elementQty[i].valueAsNumber * itemLocalStorage[i].productPrice);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.textContent = totalPrice;
    console.log(totalPrice);
}
getTotal();

// Modification d'une quantité de produit
function modifyQty() {
    let modifyQuantity = document.querySelectorAll(".itemQuantity");

    for (let m = 0; m < modifyQuantity.length; m++){
        modifyQuantity[m].addEventListener("change" , (event) => {
            event.preventDefault();

          
            let qtyModified = parseInt(itemLocalStorage[m].productQty);
            let modifiedValue = parseInt(modifyQuantity[m].valueAsNumber);
            
            const itemResult = itemLocalStorage.find((el) => el.modifiedValue !== qtyModified);

            itemResult.productQty = modifiedValue;
            itemLocalStorage[m].productQty = parseInt(itemResult.productQty);

            localStorage.setItem("cart", JSON.stringify(itemLocalStorage));
        
         
        })
    }
}
modifyQty();

// Suppression d'un produit
function deleteProduct() {
    let deleteBtn = document.querySelectorAll(".deleteItem");

    for (let d = 0; d < deleteBtn.length; d++){
        deleteBtn[d].addEventListener("click" , (event) => {
            event.preventDefault();

            
            let deleteId = itemLocalStorage[d].productId;
            let deleteColor = itemLocalStorage[d].productColor;

            itemLocalStorage = itemLocalStorage.filter( el => el.productId !== deleteId || el.productColor !== deleteColor );
            
            localStorage.setItem("cart", JSON.stringify(itemLocalStorage));

            //Alerte produit supprimé 
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })
    }
}
deleteProduct();
