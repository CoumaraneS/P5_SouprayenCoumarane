addItems();

// Récupération les items de l'API.
async function getItems() {
    let products = await fetch('http://localhost:3000/api/products');
    return products.json();
}

//Création et ajout de données API dans le code html (DOM).
async function addItems() {
    let result = await getItems()
    .then( (item) => {
        for (let i=0; i < item.length; i++) {		

            // Création et ajout de l'élément "a"
            let productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            productLink.href = `product.html?id=${item[i]._id}`;

            // Création et ajout de l'élément "article"
            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            // Création et ajout de l'image
            let productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = item[i].imageUrl;
            productImg.alt = item[i].altTxt;

            // Création et ajout du titre "h3"
            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.textContent = item[i].name;

            // Création et ajout de la description "p"
            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productDesc");
            productDescription.textContent = item[i].description;
        }
    })
    // Création de l'error log.
    .catch (function(error){
        return error;
    });
}