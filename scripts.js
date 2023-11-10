let mainBtn = window.Telegram.WebApp.MainButton;
let backBtn = window.Telegram.WebApp.BackButton;
let webApp = window.Telegram.WebApp;

class Product {
    constructor(id,
                name,
                category,
                gender,
                season,
                image,
                price,
                description,
                sizes,
                colors)
    {
        this.id = id;
        this.name = name;
        this.category = category;
        this.gender = gender;
        this.season = season;
        this.image = image;
        this.price = price;
        this.description = description;
        this.sizes = sizes;
        this.colors = colors;
    }
}

class OrderItem{
       constructor(orderItemId,
                   product,
                   selectedSize,
                   selectedColor) {
        this.id = orderItemId;
        this.product = product;
        this.selectedSize = selectedSize;
        this.selectedColor = selectedColor;
    }
    setColor(color){
           this.selectedColor = color;
    }

    setSize(size){
           this.selectedSize = size;
    }
}

class Cart{
    orderItems = [];

    currentItems = [];

    constructor(products) {
        products.forEach(product =>
        {
            this.currentItems.push({key: product.id - 1, value: null});
        });
    }

    setCurrentItem(productId, itemId){
        this.currentItems[productId].value = this.orderItems[productId][itemId];
    }

    updateColor(product, color){
        var currentItem = this.currentItems[product.id].value;
        if(currentItem != null){
            currentItem.setColor(color);
        }else{
             var orderItemId = this.getNextOrderId(product.id);
             this.currentItems[product.id].value = new OrderItem(orderItemId, product, null, color);
        }
    }

    updateSize(product, size){
        var currentItem = this.currentItems[product.id].value;
        if(currentItem != null){
            currentItem.setSize(size);
        }else{
             var orderItemId = this.getNextOrderId(product.id);
             this.currentItems[product.id].value = new OrderItem(orderItemId, product, size, null);
        }
    }

  putCurrentItemToOrder(productId) {
    let currentOrder = this.currentItems[productId].value;

    if (this.orderItems.hasOwnProperty(productId)) {
        this.orderItems[productId].push(currentOrder);
    } else {
        this.orderItems[productId] = [currentOrder];
    }
}

    remove(productId, orderItem){
        this.orderItems[productId].splice(orderItem.id, 1);
    }

    getNextOrderId(productId){
        const items = this.orderItems[productId];
        return items === undefined ? 0 : items.length;
    }

    clean(){
        this.orderItems = [];
    }
}

const text = 'Эти кроссовки от Nike обеспечивают отличную поддержку стопы и амортизацию благодаря современным технологиям, используемым в их производстве. Они идеально подходят для прогулок, бега и занятий спортом, предоставляя комфорт и уверенность в каждом шаге. Белый цвет кроссовок делает их универсальными и легко сочетаемыми с различной одеждой.';
const sizes = ["S", "M", "L"];
const colors = ["Белый", "Чёрный"];

const products = [
    new Product(1, "Кроссовки Nike Белые", "обувь", "женское", "весна", "sneakers/1.jpg", 7990, text, sizes, colors),
    new Product(2, "Кроссовки New Balance Белые", "обувь", "женское", "весна", "sneakers/2.jpg", 12490, text,  sizes, colors),
    new Product(3, "Кроссовки Nike Sony", "обувь", "мужское", "весна", "sneakers/3.jpg", 15990, text,  sizes, colors),
    new Product(4, "Кроссовки Чёрные", "обувь", "мужское", "весна", "sneakers/4.jpg", 12390, text,  sizes, colors),
    new Product(5, "Кроссовки New Balance", "обувь", "мужское", "весна", "sneakers/5.jpg", 7490, "Описание товара 5", sizes, colors),
    new Product(6, "Кроссовки New Balance", "обувь", "мужское", "весна", "sneakers/6.jpg", 5490, "Описание товара 6", sizes, colors),
    new Product(7, "Штаны Чёрные Мужские", "верхняя_одежда", "мужское", "весна", "pants/1.jpg", 7990, "Описание товара 7", sizes, colors),
    new Product(8, "Кроссовки Nike Белые", "верхняя_одежда", "женское", "весна", "tshirt/1.jpg", 5490, "Описание товара 8", sizes, colors),
    new Product(9, "Кроссовки New Balance Белые", "верхняя_одежда", "женское", "весна", "tshirt/2.jpg", 7990, "Описание товара 9", sizes, colors),
    new Product(10, "Кроссовки Nike Sony", "верхняя_одежда", "мужское", "весна", "tshirt/3.jpg", 7990, "Описание товара 10", sizes, colors),
    new Product(11, "Пуховик зимний", "верхняя_одежда", "мужское", "весна", "tshirt/4.jpg", 5490, "Описание товара 11", sizes, colors),
    new Product(12, "Футболка Inspire Чёрная", "верхняя_одежда", "мужское", "весна", "tshirt/5.jpg", 5490, "Описание товара 12", sizes, colors),
    new Product(13, "Футболка Brooklyn Белая", "верхняя_одежда", "мужское", "весна", "tshirt/6.jpg", 12390, "Описание товара 13", sizes, colors),
    new Product(14, "Футболки хайповые", "верхняя_одежда", "мужское", "весна", "tshirt/7.jpg", 7990, "Описание товара 14", sizes, colors)
];

const cart = new Cart(products);

webApp.setHeaderColor('#000000');
mainBtn.text_color = '#FFFFFF';
mainBtn.color = '#3953f8';
mainBtn.text = 'Перейти в корзину';
mainBtn.onClick(mainBtnClicked);
backBtn.onClick(backBtnClicked);

document.addEventListener("DOMContentLoaded", function() {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  themeToggle.addEventListener("click", function() {
    body.classList.toggle("dark-theme");
    toggleTheme();
  });

  // Функция для сохранения текущей темы в локальном хранилище
  function toggleTheme() {
    if (body.classList.contains("dark-theme")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
  }
});

    function displayProducts(categoryFilter = "", genderFilter = "", seasonFilter = "") {
      const productList = document.getElementById("productList");
      productList.innerHTML = "";

      const productRow = document.createElement("div");
      productRow.className = "row";
      products.forEach(product => {
        if (
          (!categoryFilter || product.category === categoryFilter) &&
          (!genderFilter || product.gender === genderFilter) &&
          (!seasonFilter || product.season === seasonFilter)
        ) {
          const productCard = document.createElement("div");
          productCard.className = "col-md-12 product-card";
          productCard.innerHTML = `
            <div class="product-card" 
                 id="productCard"
                 data-id="${product.id}"
                 data-price="${product.price}"
                 data-name="${product.name}"
                 data-image="${product.image}"
                 data-description="${product.description}"
                 data-season="${product.season}"
                 data-category="${product.category}"
                 data-category="${product.gender}">
              <img src="${product.image}" class="card-img-top" alt="${product.name}">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-description-text ">${product.description}</p>
                <p class="card-text">${product.price}₽</p>
              </div>
              <div class="order-data">
                <select id="sizes" name="sizes" class="comboBox">
                    <option value="" disabled selected>Размер</option>
                </select>

                <select id="colors" name="colors" class="comboBox">
                    <option value="" disabled selected>Цвет</option>  
                </select>
                
                <select id="order-items" name="order-items" class="comboBox">
                    <option value="" disabled selected>В корзине</option>
                </select>
              </div>
              <div class="product-action">
                <button class="add-to-cart-button bubbly-button" onclick="addOrderItem(this)">Добавить в корзину</button>
                <div class="quantity-indicator">0</div> <!-- Элемент для отображения количества -->
              </div>
            </div>
          `;
          updateDropDowns(productCard, product);
          productRow.appendChild(productCard);
        }
      });

      productList.appendChild(productRow);
    }

    function updateDropDowns(productCard, product) {
        var sizesDropdown = productCard.querySelector("#sizes");
        var colorsDropdown = productCard.querySelector("#colors");
        var orderItemsDropdown = productCard.querySelector("#order-items");
        var availableSizes = product.sizes;
        var availableColors = product.colors;

        for (var i = 0; i < availableSizes.length; i++) {
            var sizeOption = document.createElement("option");
            sizeOption.value = availableSizes[i];
            sizeOption.text = availableSizes[i];
            sizesDropdown.appendChild(sizeOption);
        }

        for (var j = 0; j < availableColors.length; j++) {
            var colorOption = document.createElement("option");
            colorOption.value = availableColors[j];
            colorOption.text = availableColors[j];
            colorsDropdown.appendChild(colorOption);
        }

         orderItemsDropdown.addEventListener("change", function () {
             var orderItemId = parseInt(orderItemsDropdown.value);
             cart.setCurrentItem(product.id, orderItemId);

             sizesDropdown.value = cart.currentItems[product.id].value.selectedSize;
             colorsDropdown.value = cart.currentItems[product.id].value.selectedColor;
         });

         sizesDropdown.addEventListener("change", function () {
             var selectedSize = sizesDropdown.value;
             cart.updateSize(product, selectedSize)
         });

         colorsDropdown.addEventListener("change", function () {
             var selectedColor = colorsDropdown.value;
             cart.updateColor(product, selectedColor)
         });
    }

   function displayCartProducts(cart) {
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = "";

    for (const orderItem in cart.orderItems) {
        const orderCard = document.createElement("div");
        orderCard.className = "cart-item";
        orderCard.innerHTML = `
          <div class="cart-block">
               <div class="row-cart">
                        <div class="element-cart" style="width: 50%;">
                            <picture>
                                <img src="${orderItem.product.image}" 
                                     alt="${orderItem.product.name}" 
                                     class="cart-item-img">
                                <canvas width="32" height="32"></canvas>
                            </picture>
                        </div>
                        <div class="element-cart" style="width: 50%;">
                            <h5 class="cart-item-title" style="white-space: normal; position: relative; top: -20px;">${orderItem.product.name}</h5>
                            <h7>$Цена{orderItem.product.price}₽</h7>
                            <h7>Цвет: ${orderItem.selectedColor}₽</h7>
                            <h7>Размер: ${orderItem.selectedSize}₽</h7>
                        </div>
               </div>
          </div>
        `;
        cartList.appendChild(orderCard);
    }
}

    document.getElementById("showAll").addEventListener("click", () => {
      displayProducts();
    });

    document.getElementById("showClothing").addEventListener("click", () => {
      displayProducts("верхняя_одежда");
    });

    document.getElementById("showShoes").addEventListener("click", () => {
      displayProducts("обувь");
    });

    document.getElementById("showAccessories").addEventListener("click", () => {
      displayProducts("аксессуары");
    });

    const filterMenu = document.getElementById("filterMenu");
    const showFilters = document.getElementById("showFilters");

    showFilters.addEventListener("click", () => {
      if (filterMenu.style.display === "block") {
        filterMenu.style.display = "none";
      } else {
        filterMenu.style.display = "block";
      }
    });

    const buttonCarousel = document.getElementById("buttonCarousel");
    const buttonsContainer = buttonCarousel.querySelector(".carousel-inner");

    let isDragging = false;
    let startPosition = 0;
    let deltaX = 0;

    buttonsContainer.addEventListener("mousedown", (e) => {
        isDragging = true;
        ctartPosition = e.clientX - deltaX;
        buttonsContainer.style.cursor = "grabbing";
    });

    buttonsContainer.addEventListener("mouseup", () => {
        isDragging = false;
        buttonsContainer.style.cursor = "grab";
    });

    buttonsContainer.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const x = e.clientX;
        deltaX = x - startPosition;
        buttonsContainer.style.transform = `translateX(${deltaX}px)`;
    });

    buttonsContainer.addEventListener("mouseleave", () => {
        if (!isDragging) return;
        isDragging = false;
        buttonsContainer.style.cursor = "grab";
    });

    buttonsContainer.addEventListener("touchstart", (e) => {
        isDragging = true;
        startPosition = e.touches[0].clientX - deltaX;
    });

    buttonsContainer.addEventListener("touchend", () => {
        isDragging = false;
    });

    buttonsContainer.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const x = e.touches[0].clientX;
        deltaX = x - startPosition;
        buttonsContainer.style.transform = `translateX(${deltaX}px)`;
    });

    function highlightDropDown(dropDown){
        dropDown.classList.add('comboBox-highlighted');
    }

    function removeHighlight(dropDown){
        dropDown.classList.remove('comboBox-highlighted');
    }

    function addOrderItem(button) {
        let productCard = button.closest(".product-card");
        let orderItemsDropdown = productCard.querySelector("#order-items");
        let sizesDropdown = productCard.querySelector("#sizes");
        let colorsDropdown = productCard.querySelector("#colors");

        let sizesUnselected = sizesDropdown.options.selectedIndex === 0;
        let colorsUnselected = colorsDropdown.options.selectedIndex === 0;

        if(sizesUnselected){
            highlightDropDown(sizesDropdown);
        }else{
            removeHighlight(sizesDropdown);
        }

        if(colorsUnselected){
            highlightDropDown(colorsDropdown);
        }else{
            removeHighlight(colorsDropdown);
        }

        if(sizesUnselected && colorsUnselected){
            return;
        }

        cart.putCurrentItemToOrder(productCard.dataset.id);

        updateOrderItemDropDown(orderItemsDropdown, cart.orderItems[productCard.dataset.id]);

        resetOrderItemOption(productCard);

        const quantityIndicator = button.nextElementSibling;
        quantityIndicator.style.display = 'block';

        let quantity = parseInt(quantityIndicator.textContent);
        quantity += 1;
        quantityIndicator.textContent = quantity;
        mainBtn.show();
    }

    function updateOrderItemDropDown(orderItemsDropDown, orderItems) {

    orderItemsDropDown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.text = 'В корзине';
    orderItemsDropDown.add(defaultOption);

    orderItems.forEach((order, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = `index. ${order.selectedColor} ${order.selectedSize}`;
        orderItemsDropDown.add(option);
    });
}

    function resetOrderItemOption(productCard){
        cart.currentItems[productCard.dataset.id].value = null;
        productCard.querySelector("#sizes").options.selectedIndex = 0;
        productCard.querySelector("#colors").options.selectedIndex = 0;
    }

    function mainBtnClicked(){
        $('.catalogue').hide();
        mainBtn.text = "Оформить заказ";
        displayCartProducts(cart);
        $('.order_view').show();
        backBtn.show();
    }

     function backBtnClicked(){
        $('.order_view').hide();
        backBtn.hide();
        $('.catalogue').show();
        mainBtn.text = "Перейти в корзину";
    }

    function calculateTotal() {
        let total = 0;
        for (const productId in cart) {
            total += cart[productId].product.price * cart[productId].quantity;
        }
        return total;
    }

    function resetDropDowns(){

    }

    // Показать все товары при загрузке страницы
    displayProducts();