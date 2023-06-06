// cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// open cart
cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

// close cart
closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

// cart working js
document.addEventListener("DOMContentLoaded", () => {
  ready();
});

// making function
function ready() {
  // remove items from cart
  let removeCartButtons = document.getElementsByClassName("cart-remove");
  for (let i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  // quantity changes
  let quantityInputs = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  // add to cart
  var addCart = document.getElementsByClassName("add-cart");
  for (let i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  updateTotal();
}

//buy button work

document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);

//but button

function buyButtonClicked(){
    alert('your order is placed');
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal();
}


// remove items from cart
function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.closest(".cart-box").remove();
    updateTotal();
}

// quantity changes
function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

// add to cart
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updateTotal();
}

function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText === title) {
      alert("You already have this item in the cart");
      return;
    }
  }

  var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <!-- remove cart -->
    <i class="bx bxs-trash-alt cart-remove"></i>`;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}

// update total
function updateTotal() {
  let cartBoxes = document.getElementsByClassName("cart-box");
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.querySelector(".cart-price");
    let quantityElement = cartBox.querySelector(".cart-quantity");
    let price = parseFloat(priceElement.innerText.replace("₹", ""));
    let quantity = quantityElement.value;
    total += price * quantity;
  }
  document.querySelector(".total-price").innerText = "₹" + total;
}

document.addEventListener("DOMContentLoaded", ready);
