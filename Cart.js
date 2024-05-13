//Robert Onofrei Work

//This loads the webpage first so we still access the elements on the page
if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}

function ready() {
    //This runs the function removeCartItem function when the remove button is clicked
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    //This loops for all the remove cart item buttons and runs the removeCartItem function when clicked
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem) 

    }
    //this runs the function quantityChanged function when the quantity input is changed
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    //This loops for all the quantity inputs and runs the quantityChanged function when the quantity input is changed
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged)
    }
}

//This function removes the item from the cart, and from the local web storage
function removeCartItem(){
    var buttonClicked = event.target;
    //This reads from the main parent element of the cart item
    var cartItem = buttonClicked.parentElement.parentElement;
    //This reads the title of the item from the cart item that has the class name cart-item-title
    var title = cartItem.getElementsByClassName('cart-item-title')[0].innerText;
    var cartItems = JSON.parse(localStorage.getItem('cartItems'));

    //Find the index of the item to be removed
    var index = cartItems.findIndex(function(item) {
        return item.title === title;
    });

    //Remove the item from the cartItems array
    if (index !== -1) {
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    //Remove the HTML element from the cart
    cartItem.remove();
    
    //This runs the function updateCartTotal function, which updates the cart total
    updateCartTotal()
};

//This function updates the quantity of the item in the cart so it can go below one
function quantityChanged(event) {
 var input = event.target
 if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
 }
 updateCartTotal();
}

//This displays the items in the cart
function displayCartItems() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems'));
    //Returns the first item in the cartItems array
    var cartContainer = document.querySelector('.cart-items');



    cartItems.forEach(function(item) { 
        var cartRow = document.createElement('div');

        //This is the html that displays the items in the cart
        var cartRowContents = `
        <div class="cart-items">
        <div class="cart-row">
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${item.imageSrc}" width="100" height="100">
                <span class="cart-item-title">${item.title}</span>
            </div>
            <span class="cart-price cart-column">${item.price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>
        </div>`;
        cartRow.innerHTML = cartRowContents;
        cartContainer.append(cartRow);
    });
}
displayCartItems();

//This updates the total price of the items in the cart
function updateCartTotal() {
var cartItemContainer = document.getElementsByClassName('cart-items')[0];
var cartRows = cartItemContainer.getElementsByClassName('cart-row');
var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        console.log(priceElement)
        total = total + (price * quantity);
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

//This is what allows the purchase button to work
document.querySelector("#show-Card").addEventListener("click", function() {
    document.querySelector(".popup").classList.add("active");
});
document.querySelector(".popup .close-btn").addEventListener("click", function() {
    document.querySelector(".popup").classList.remove("active");
});

//This confirms the purchase and clears the cart
function confirmation(){
    alert("Thank you for your purchase!");
    document.querySelector(".popup").classList.remove("active");
    localStorage.clear();
    window.location.reload();
}
