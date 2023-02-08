window.addEventListener("DOMContentLoaded", function () {
  const cart_modal = document.querySelector(".cart-modal");
  const cart_list = document.querySelector(".cart-list");
  const btn_close = document.querySelector(".close-modal");
  const btn_search = document.querySelector(".btn-search");
  const btn_buy = document.querySelector(".btn-buy");
  const btn_delete_all = document.querySelector(".btn-delete-all");
  const subtotal_price = document.querySelector(".subtotal-price");
  let cart_cnt_icon = document.getElementById("js-cart-cnt"); //カートの個数アイコン
  let subtotal = 0;
  let cart_cnt = 0;
  let quantity = 0;
  let quantityArr = [];
  let clickedItem;

  //Functions
  // Display items
  const renderItems = function (section, img, title, price) {
    const sectionAttribute = document.querySelector(`.${section}`);
    const html = `
  <div class="card-deck ${section}">
   <div class="card mb-2 border border-0">
   <img class="card-img-top" src="${img}" alt="${title}">
   <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-price">$${price}</p>
    </div>
    <button class="btn btn-cart">Add to Cart</button>
  </div>
  </div>
  `;
    sectionAttribute.insertAdjacentHTML("beforeend", html);
  };

  //Open modal function
  const openModal = function () {
    if (subtotal !== 0) cart_modal.classList.remove("hidden");
  };

  //Close modal function
  const closeModal = function () {
    cart_modal.classList.add("hidden");
  };

  //Shopping Cart List
  const shoppingCartList = function ([item]) {
    console.log(item);
    const shoppingCart = document.querySelector(".fa-cart-shopping");

    //Show subtotal
    subtotal += item.price;
    subtotal_price.innerHTML = `$${subtotal}`;
    console.log(item.quantity);

    if (item.quantity === 1) {
      const html = `
      <li class="item-list">
        <p class="item-name">${item.title}</p>
        <p class="item-price">$${item.price}</p>
        <p class="item-quantity">${item.quantity}</p>
        <img class="item-image" src="${item.image}" alt="${item.title}" >
        <button class="btn-delete">Delete</button>
      </li>`;
      cart_list.insertAdjacentHTML("beforeend", html);
    } else {
      const item_quantity = document.querySelectorAll(".item-quantity");
      item_quantity.forEach((quantity) => (quantity.innerHTML = item.quantity));
    }

    //Open modal
    shoppingCart.addEventListener("click", openModal);

    //Close modal
    btn_close.addEventListener("click", closeModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !cart_modal.classList.contains("hidden")) {
        closeModal();
      }
    });

    const btn_delete = document.querySelectorAll(".btn-delete");
    btn_delete.forEach((btn) => btn.addEventListener("click", function () {}));
  };

  const clearCart = function () {
    clickedItem = [];
    subtotal = 0;
    cart_cnt = 0;
    closeModal();
    cart_list.innerHTML = "";
    subtotal_price.innerHTML = "";
    cart_modal.classList.add("hidden");
    cart_cnt_icon.parentNode.classList.add("hidden");
  };

  if (buyItem()) {
  }

  const buyItem = function () {
    btn_buy.addEventListener("click", function () {
      alert(`Thank you for shopping with us!! \n Your total: $${subtotal}`);
    });
  };
  buyItem();

  btn_delete_all.addEventListener("click", clearCart);

  const getItemsData = async function () {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();

      //Add object property
      data.forEach((item) => (item.quantity = quantity));

      //Render 3 new arrival items
      for (let i = 0; i < 3; i++) {
        renderItems("new_arrival", data[i].image, data[i].title, data[i].price);
      }

      //Render the rest items
      for (let i = 3; i < data.length; i++) {
        renderItems("item", data[i].image, data[i].title, data[i].price);
      }

      //Add to Cart button
      const btn_addToCart = document.querySelectorAll(".btn-cart");
      //Add to cart button eventListener
      btn_addToCart.forEach((btn, i) =>
        btn.addEventListener("click", function () {
          clickedItem = [];
          //count up everytime Add to Cart buttons are clicked
          cart_cnt++;
          //remove hidden class when cart_cnt gets 1
          if (cart_cnt >= 1) {
            cart_cnt_icon.parentNode.classList.remove("hidden");
          }
          cart_cnt_icon.innerHTML = cart_cnt;

          clickedItem.push({
            title: data[i].title,
            price: data[i].price,
            image: data[i].image,
            quantity: ++data[i].quantity,
          });
          //Show list
          shoppingCartList(clickedItem);
          console.log(clickedItem);
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
  getItemsData();
});
