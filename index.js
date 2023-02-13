window.addEventListener("DOMContentLoaded", function () {
  const cart_modal = document.querySelector(".cart-modal");
  const cart_list = document.querySelector(".cart-list");
  const btn_close = document.querySelector(".close-modal");
  const btn_buy = document.querySelector(".btn-buy");
  const btn_delete_all = document.querySelector(".btn-delete-all");
  const subtotal_price = document.querySelector(".subtotal-price");
  let cart_cnt_icon = document.getElementById("js-cart-cnt");
  let subtotal = 0;
  let cart_cnt = 0;
  let itemData = [];
  let cartItem = [];

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
  const shoppingCartList = function (item) {
    if (item.quantity === 1) cartItem.push(item);
    else
      cartItem.map((product) =>
        product.id === item.id ? { ...item } : product
      );

    // console.log(item);
    // console.log(cartItem);

    const shoppingCart = document.querySelector(".fa-cart-shopping");

    //Show subtotal
    subtotal += item.price;
    subtotal_price.innerHTML = `$${subtotal.toFixed(2)}`;

    if (item.quantity === 1) {
      //Create cart-list el <li class="item-list"></li>
      const itemListEl = document.createElement("li");
      itemListEl.classList.add("item-list");
      itemListEl.classList.add(`id-${item.id}`);
      cart_list.appendChild(itemListEl);
      const item_lists = cart_list.querySelectorAll(".item-list");

      // --------- Inside of item-list ---------------------------------------------------------
      //Create image el
      const itemImgEl = document.createElement("img");
      itemImgEl.classList.add("item-image");
      itemImgEl.src = item.image;
      itemImgEl.alt = item.title;
      item_lists.forEach((list) => list.appendChild(itemImgEl));

      //Create title el <p class="item-name">${item.title}</p>
      const itemNameEl = document.createElement("p");
      itemNameEl.classList.add("item-name");
      itemNameEl.innerHTML = item.title;
      item_lists.forEach((list) => list.appendChild(itemNameEl));

      //Create price el <p class="item-price id-${item.id}-price">$${item.price}</p>
      const itemPriceEl = document.createElement("p");
      itemPriceEl.classList.add("item-price");
      itemPriceEl.classList.add(`id-${item.id}-price`);
      itemPriceEl.innerHTML = `$${item.price}`;
      item_lists.forEach((list) => list.appendChild(itemPriceEl));

      //Create quantity div <div class="quantity-container"></div>
      const quantityContainerEl = document.createElement("div");
      quantityContainerEl.classList.add("quantity-container");
      item_lists.forEach((list) => list.appendChild(quantityContainerEl));
      const quantity_containers = document.querySelectorAll(
        ".quantity-container"
      );

      //Create quantity el <p class="item-quantity id-${item.id}-quantity">${item.quantity}</p>
      const itemQuantityEl = document.createElement("p");
      itemQuantityEl.classList.add("item-quantity");
      itemQuantityEl.classList.add(`id-${item.id}-quantity`);
      itemQuantityEl.innerHTML = item.quantity;
      quantity_containers.forEach((container) =>
        container.appendChild(itemQuantityEl)
      );

      //Create delete button el <button class="btn-delete">Delete</button>
      const btnDeleteEl = document.createElement("button");
      btnDeleteEl.classList.add("btn-delete");
      btnDeleteEl.innerHTML = "Delete";
      item_lists.forEach((list) => list.appendChild(btnDeleteEl));

      // ------------------------------------------------------------------------------------------

      //   const html = `
      //   <li class="item-list">
      //     <img class="item-image" src="${item.image}" alt="${item.title}" >
      //     <p class="item-name">${item.title}</p>
      //     <p class="item-price id-${item.id}-price">$${item.price}</p>
      //     <div class="quantity-container">
      //       <p class="item-quantity id-${item.id}-quantity">${item.quantity}</p>
      //     </div>
      //     <button class="btn-delete">Delete</button>
      //   </li>`;
      //   cart_list.insertAdjacentHTML("beforeend", html);
    }
    if (item.quantity > 1) {
      // const cartItem = Array.from(cart_list.childNodes).at(-1);
      const newQuantity = document.querySelectorAll(`.id-${item.id}-quantity`);
      const newPrice = document.querySelectorAll(`.id-${item.id}-price`);
      newQuantity.innerHTML = item.quantity;
      newPrice.innerHTML = `$${item.price}`;
      newQuantity.forEach((quantity) => (quantity.innerHTML = item.quantity));
      newPrice.forEach(
        (price) => (price.innerHTML = `$${item.price * item.quantity}`)
      );
    }

    //Delete by 1
    // const addedItem = Array.from(cart_list.childNodes).at(-1);
    const itemListById = document.querySelector(`.id-${item.id}`);
    const btn_delete = itemListById.querySelector(".btn-delete");
    btn_delete.addEventListener("click", function () {
      console.log(item);
      itemListById.innerHTML = "";
      subtotal -= item.price;
      item.quantity = 0;
      cart_cnt--;
      cart_cnt_icon.innerHTML = cart_cnt;
      console.log(itemData);
      if (cart_cnt !== 0) {
        subtotal_price.innerHTML = `$${subtotal.toFixed(2)}`;
      } else clearCart();
    });

    //Open modal
    shoppingCart.addEventListener("click", openModal);

    //Close modal
    btn_close.addEventListener("click", closeModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !cart_modal.classList.contains("hidden")) {
        closeModal();
      }
    });
  };

  //Clear cart
  const clearCart = function () {
    subtotal = 0;
    cart_cnt = 0;
    closeModal();
    cart_list.innerHTML = "";
    subtotal_price.innerHTML = "";
    cart_modal.classList.add("hidden");
    cart_cnt_icon.parentNode.classList.add("hidden");
    //Set quantity = 0;
    itemData.forEach((item) => (item.quantity = 0));
  };

  //Buy button
  const buyItem = function () {
    btn_buy.addEventListener("click", function () {
      alert(
        `Thank you for shopping with us!! \n Your total: $${subtotal.toFixed(
          2
        )}`
      );
      clearCart();
    });
  };
  buyItem();

  btn_delete_all.addEventListener("click", clearCart);

  //Get data from Api
  const getItemsData = async function () {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      itemData = await res.json();

      //Add object property
      itemData.forEach((item) => (item.quantity = 0));

      //Render 3 new arrival items
      for (let i = 0; i < 3; i++) {
        renderItems(
          "new_arrival",
          itemData[i].image,
          itemData[i].title,
          itemData[i].price
        );
      }

      //Render the rest items
      for (let i = 3; i < itemData.length; i++) {
        renderItems(
          "item",
          itemData[i].image,
          itemData[i].title,
          itemData[i].price
        );
      }

      //Add to Cart button
      const btn_addToCart = document.querySelectorAll(".btn-cart");
      //Add to cart button eventListener
      btn_addToCart.forEach((btn, i) =>
        btn.addEventListener("click", function () {
          //count up everytime Add to Cart buttons are clicked
          cart_cnt++;
          //remove hidden class when cart_cnt gets 1
          if (cart_cnt >= 1) {
            cart_cnt_icon.parentNode.classList.remove("hidden");
          }
          cart_cnt_icon.innerHTML = cart_cnt;

          //Update quantity
          itemData[i].quantity += 1;

          // const data = {
          //   id: itemData[i].id,
          //   title: itemData[i].title,
          //   price: itemData[i].price,
          //   image: itemData[i].image,
          //   quantity: itemData[i].quantity,
          // };

          //Show list
          shoppingCartList(itemData[i]);
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
  getItemsData();
});
