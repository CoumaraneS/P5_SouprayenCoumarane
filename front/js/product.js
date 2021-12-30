const itemId = new URL(window.location.href).searchParams.get("id");

console.log(itemId);
//Récupération des éléments par ID et par classe

let itemImg = document.createElement("img");
document.querySelector(".item__img").appendChild(itemImg);
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
        itemImg.setAttribute("src", item.imageUrl);  
        //img.src=item.imageUrl;

        itemImg.setAttribute("alt", item.altTxt);
        //img.alt=item.altTxt;

        itemTitle.textContent = item.name;
        itemPrice.textContent = item.price;
        itemDescription.textContent = item.description;
        document.title = item.name;

        console.log(item.price); 

        addToCartButton.addEventListener ("click", () => {
            addToCart(item);
        });

        for(let cur of item.colors)
           {
               let color = document.createElement("option");
               color.value=cur;
               color.textContent=cur;
               itemColors.appendChild(color);
            
            }

    });
}

//Ajout du ou des articles au panier
let addToCartButton = document.getElementById("addToCart");


function addToCart(elementCur) {
 
    let productId = itemId;
    let productColor = document.querySelector("#colors").value;
    let productQty = document.querySelector("#quantity").value;

    
//condition to verify if the quantity is 0 or less than 0 an alert if, zero or below zero

    let cartItem = {
        productId : itemId,
        productColor : productColor,
        productQty  : productQty,
        productImg : elementCur.imageUrl,
        productImgAlt : elementCur.altTxt,
        itemTitle : elementCur.name,
        productPrice : elementCur.price,

        };


    console.table(cartItem);

    if (localStorage.getItem("cart")) {

        let cart = JSON.parse(localStorage.getItem("cart"));

        if (cart.filter(el=>{return (el.productId===cartItem.productId)&&(el.productColor===cartItem.productColor)}).length>0)
        {cart.filter(el=>{return (el.productId===cartItem.productId)&&(el.productColor===cartItem.productColor)})[0].productQty = 
        parseInt(cart.filter(el=>{return (el.productId===cartItem.productId)&&(el.productColor===cartItem.productColor)})[0].productQty) +parseInt(cartItem.productQty);
        console.table(cart.filter(el=>{return (el.productId===cartItem.productId)&&(el.productColor===cartItem.productColor)})[0])
    } else  
        cart.push(cartItem);
        
        let itemCart = JSON.stringify(cart);
        localStorage.setItem("cart", itemCart);
        
    } else {
      
        let itemCart = JSON.stringify([cartItem]);
        localStorage.setItem("cart", itemCart);

    }
  
    alert("Article ajouté au panier"+ "\n" + "Quantité : " + productQty+ "\n" + "Couleur : " +  productColor);

}


