//Ici je crée une liste pour changer les phrases de manières agréable :
const accroche = ["Excellent choix ! ", "Super ! C'est notre coup de coeur cette année ! ", "Celui-ci est à tomber ! ", "Très bon choix ! "]

const produitsList = document.querySelectorAll(".productItem"); //Je crée
//Ce tableau en prenant pour chaque produit la division entière pour pouvoir ensuite
//mieux optimiser mon code
console.log(produitsList);
let quantitiesList = document.querySelectorAll(".quantity");//Je fais le tableau des valeurs des quantités - ici valeur numérique

let pricesList = document.querySelectorAll(".productPrice"); //Tableau des valeurs des prix des produits - ici string
let subtotalText = document.querySelectorAll(".myPrice");
let phrase = document.querySelectorAll(".inNotInCart");
let availability = document.querySelectorAll(".productAvailability");

let listsLength = produitsList.length;

let itemStocks = [4, 2, 6, 9];


//Fonction ajouter au panier
function addToQty(positionDeLarticle) {
    let quantity = parseInt(quantitiesList[positionDeLarticle].value);
    console.log("Quantite avant click" + quantity);
    console.log("Stock maximum" + itemStocks[positionDeLarticle]);
    if (quantity < itemStocks[positionDeLarticle]) {
        quantity++;
        quantitiesList[positionDeLarticle].value = quantity;
        calculateSubTotal();
    }
    console.log("quantite apres click" + quantity);
}

//Attribuer les stocks d'item au max des input :
function attribStockQte() {
    let inputMax = document.querySelectorAll("input");
    for (let i = 0; i < listsLength; i++) {
        let stockMax = itemStocks[i];
        inputMax[i].setAttribute("max", stockMax);
        console.log(stockMax);

    }
}

attribStockQte();

function changeText() {
    let i = 0;
    for (i; i < listsLength; i++) {
        console.log("ce qu'il y a dans le switch" + (itemStocks[i] - parseInt(quantitiesList[i].value)));
        switch (itemStocks[i] - parseInt(quantitiesList[i].value)) {
            case 2:
                availability[i].innerHTML = ' Plus que 2 articles !';
                break
            case 1:
                availability[i].innerHTML = ' Dernier article !';
                break
            case 0:
                availability[i].innerHTML = ' Plus d\'article en stock mais revenez le mois prochain pour les nouveautés !';
                availability[i].style = "color: red;";
                break
            default:
                availability[i].innerHTML = 'Disponible';
                break
        }
    }
}



// Fonction calcule le sous-total par catégorie grâce aux déclarations précédentes
function calculateSubTotal() {
    produitsList.forEach((element, index) => {
        let i = index;
        let quantity = parseInt(quantitiesList[i].value);
        let price = parseInt(pricesList[i].innerHTML);
        let newSubTotal = quantity * price;
        console.log(newSubTotal);
        subtotalText[i].innerText = quantity * price;
        if (quantity > 0) {
            phrase[i].innerHTML = accroche[i] + " N'hésitez pas à nous envoyer une photo portée et nous contacter sur instagroom !"; //Petit kiff perso !
        } else {
            phrase[i].innerHTML = "Vous n'avez pas encore ajouté ce produit dans votre panier... Ce serait dommage de passer à côté !" //Petit kiff perso !
        }
    });
    changeText();
}


//Fonction pour changer la couleur du disponible ou non disponible  !!!! (non aboutie) !!!
function changeColor() {
    if (availability.innerHTML === 'Indisponible') {
        availability.setAttribute("style", "color:gray");
    }
}

//Fonction de calcul des totaux :
let sum = 0;

function calculateTotal() {
    let priceDisplayed = document.getElementById("totalPrice");
    for (let i = 0; i < produitsList.length; i++) {
        console.log(subtotalText[i].innerHTML);
        sum += parseInt(subtotalText[i].innerHTML);
    }
    if (sum <= 50) {
        priceDisplayed.setAttribute("style", "color:lightGreen");
    } else if (sum > 50 && sum <= 75) {
        priceDisplayed.setAttribute("style", "color:orange");
    } else {
        priceDisplayed.setAttribute("style", "color:red")
    }
    console.log(sum);
    document.getElementById('totalPrice').innerHTML = sum;
    return sum = 0; // hyper important sinon le bouton calculate ajoute de nouveau tous les articles.
}

//Fonction reset //FONCTIONNE !!! Bonus 2
function reset() {
    let inputButtons = document.querySelectorAll('.quantity');
    for (let i = 0; i < quantitiesList.length; i++) {
        inputButtons[i].value = 0;
        calculateSubTotal();
    }
    calculateTotal();
}


//Fonction limitedQuantity
function limitedQuantity() {
    let cartQuantite = 0;
    for (let i = 0; i <= quantitiesList.length - 1; i++) {
        cartQuantite += quantitiesList[i].value;
        if (cartQuantite === 16) {
            alert('Attention, vous avez atteint le maximum d\'articles dans votre panier');
        }
    }
}
