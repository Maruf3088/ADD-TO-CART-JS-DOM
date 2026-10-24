/* =========================
   MINI SHOPPING CART
   ========================= */

const productCards = document.querySelectorAll(".product-card");
const cartItems = document.getElementById("cart-items");
const totalElement = document.getElementById("total");
const clearCartButton = document.getElementById("clear-cart");

let cart = [];


/* =========================
   PRODUCT QUANTITY
   ========================= */

productCards.forEach(function (card) {

  const minusButton = card.querySelector(".product-minus");
  const plusButton = card.querySelector(".product-plus");
  const quantityElement = card.querySelector(".product-quantity");
  let quantity = Number(quantityElement.textContent);

  // Product section - button
  minusButton.addEventListener("click", function () {

    if (quantity > 1) {
      quantity--;
      quantityElement.textContent = quantity;
    }

  });


  // Product section + button
  plusButton.addEventListener("click", function () {
    quantity++;

    quantityElement.textContent = quantity;

  });

});


/* =========================
   ADD TO CART
   ========================= */

productCards.forEach(function (card) {

  const addButton = card.querySelector(".add-to-cart");
  const message = card.querySelector(".message");


  addButton.addEventListener("click", function () {

    const id = card.dataset.id;

    const name = card.querySelector("h3").textContent;

    const price = Number(
      card.querySelector(".price").textContent
    );

    const image = card.querySelector("img").src;
    const quantity = Number(
      card.querySelector(".product-quantity").textContent
    );


    /* Check if product already exists */

    const existingProduct = cart.find(function (item) {
      return item.id === id;
    });


    /* =========================
       PRODUCT ALREADY IN CART
       ========================= */

    if (existingProduct) {

      message.textContent = "Product already exists in cart.";

      message.style.color = "#dc2626";

      setTimeout(function () {
        message.textContent = "";
      }, 2000);

      return;
    }


    /* =========================
       ADD NEW PRODUCT
       ========================= */

    cart.push({

      id: id,

      name: name,

      price: price,

      quantity: quantity,

      image: image

    });


    message.textContent = "Added to cart.";

    message.style.color = "green";


    setTimeout(function () {
      message.textContent = "";
    }, 1500);


    /* Reset product quantity */

    card.querySelector(".product-quantity").textContent = "1";


    /* Update cart */

    renderCart();

  });

});


/* =========================
   RENDER CART
   ========================= */

function renderCart() {

  cartItems.innerHTML = "";


  /* =========================
     EMPTY CART
     ========================= */

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p class="empty-message">
        Your cart is empty.
      </p>
    `;

    totalElement.textContent = "0";

    return;
  }


  /* =========================
     DISPLAY CART PRODUCTS
     ========================= */

  cart.forEach(function (item) {

    const cartItem = document.createElement("div");

    cartItem.className = "cart-item";


    const subtotal = item.price * item.quantity;


    cartItem.innerHTML = `

      <div style="
        display: flex;
        align-items: center;
        gap: 12px;
      ">

        <img
          src="${item.image}"
          alt="${item.name}"
          style="
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 10px;
          "
        >

        <div style="flex: 1;">

          <h3>${item.name}</h3>

          <p style="
            margin: 4px 0 0;
            color: #6b7280;
            font-size: 13px;
          ">
            Unit Price: $${item.price}
          </p>

        </div>

      </div>


      <!-- CART QUANTITY -->

      <div class="cart-controls">

        <button class="cart-minus">
          −
        </button>

        <span class="cart-quantity">
          ${item.quantity}
        </span>

        <button class="cart-plus">
          +
        </button>

      </div>


      <!-- SUBTOTAL -->

      <p class="subtotal">
        Subtotal: $${subtotal}
      </p>


      <!-- REMOVE -->

      <button class="delete-btn">
        Remove
      </button>

    `;


    cartItems.appendChild(cartItem);


    /* =========================
       CART PLUS
       ========================= */

    const cartPlus = cartItem.querySelector(".cart-plus");


    cartPlus.addEventListener("click", function () {

      item.quantity++;

      renderCart();

    });


    /* =========================
       CART MINUS
       ========================= */

    const cartMinus = cartItem.querySelector(".cart-minus");


    cartMinus.addEventListener("click", function () {

      if (item.quantity > 1) {

        item.quantity--;

      } else {

        cart = cart.filter(function (cartProduct) {

          return cartProduct.id !== item.id;

        });

      }


      renderCart();

    });


    /* =========================
       DELETE ITEM
       ========================= */

    const deleteButton = cartItem.querySelector(".delete-btn");


    deleteButton.addEventListener("click", function () {

      cart = cart.filter(function (cartProduct) {

        return cartProduct.id !== item.id;

      });


      renderCart();

    });

  });


  /* Update total */

  calculateTotal();

}


/* =========================
   CALCULATE TOTAL
   ========================= */

function calculateTotal() {

  let total = 0;


  cart.forEach(function (item) {

    total += item.price * item.quantity;

  });


  totalElement.textContent = total;

}


/* =========================
   CLEAR CART
   ========================= */

clearCartButton.addEventListener("click", function () {

  if (cart.length === 0) {
    return;
  }


  cart = [];


  renderCart();

});