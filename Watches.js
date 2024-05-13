/*Qahraman Taha https://www.w3schools.com/jsref/met_win_open.asp opens cart.html when event (onclick) is clicked */function openCart() {

window.open("Cart.html");

}

//Robert Onofreis Work

//This reads from the class buyNow and runs the addToCartClicked function when the button is clicked
var addToCartButtons = document.getElementsByClassName('buyNow');
console.log(addToCartButtons)
//This loops for all the add to cart buttons and runs the addToCartClicked function when the button
for (var i = 0; i < addToCartButtons.length; i++){
    var button = addToCartButtons[i];
    //This runs the addToCartClicked function when the button is clicked
    button.addEventListener('click', addToCartClicked)
}

//This is where all the information about the items is stored
function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    console.log(title,  price, imageSrc)

    addItemToCart(title, price, imageSrc)
}

//This is where all the information about the items is stored and send to the local storage in a array
function addItemToCart(title, price, imageSrc){
    var cartItems = JSON.parse(localStorage.getItem('cartItems'))
    var item = {title, price, imageSrc};
    //This confirms that the item has been clicked so we know it works
    console.log('clicked')
    cartItems = cartItems? cartItems : [];
    //This adds the item to the cartItems array
    cartItems.push(item);
    //This converts the cartItems array to a string and stores it in the local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

//This confirms that you have signed up
function login(){
    alert("Congrats you have signed up!")
}