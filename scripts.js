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

    push(orderItemId, product, size, color){
        const orderItem = new OrderItem(orderItemId, product, size, color)
        this.orderItems.push(orderItem);
    }

    updateColor(orderItemId, color){
        const orderItem = this.orderItems.find(orderItem => orderItem.id === orderItemId);
        if(orderItem != null){
            orderItem.setColor(color);
        }
    }

    updateSize(orderItemId, size){
        const orderItem = this.orderItems.find(orderItem => orderItem.id === orderItemId);
        if(orderItem != null){
            orderItem.setSize(size);
        }
    }

    remove(orderItem){
        this.orderItems.splice(orderItem.id, 1);
    }

    getNextOrderId(){
        return this.orderItems.length;
    }

    clean(){
        this.orderItems = [];
    }
}

const text = 'Эти кроссовки от Nike обеспечивают отличную поддержку стопы и амортизацию благодаря современным технологиям, используемым в их производстве. Они идеально подходят для прогулок, бега и занятий спортом, предоставляя комфорт и уверенность в каждом шаге. Белый цвет кроссовок делает их универсальными и легко сочетаемыми с различной одеждой.';
const sizes = ["S", "M", "L"];
const colors = ["Белый", "Чёрный"];
const cart = new Cart();
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

  // Проверяем, какая тема была выбрана ранее, и применяем ее
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
  }
});

    // Функция для отображения товаров на странице
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
          productCard.className = "col-md-12 product-card"; // Один товар на ряд
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
              </div>
              <div class="product-action">
                <button class="add-to-cart-button bubbly-button" onclick="addOrderItem(this)">Добавить в корзину</button>
                <div class="quantity-indicator">0</div> <!-- Элемент для отображения количества -->
              </div>
            </div>
          `;
          updateSizesDropDown(productCard, product);
          productRow.appendChild(productCard);
        }
      });

      productList.appendChild(productRow);
    }

    function updateSizesDropDown(productCard, product) {
        var dropdown = productCard.querySelector("#sizes");
        var availableSizes = product.sizes;

        for (var i = 0; i < availableSizes.length; i++) {
            var option = document.createElement("option");
            option.value = availableSizes[i];
            option.text = availableSizes[i];
            dropdown.appendChild(option);
        }

         dropdown.addEventListener("change", function () {
             var selectedSize = dropdown.value;
             product.selectedSize = selectedSize;
             cart.updateSize()
         });
    }

      function updateColorsDropDown(productCard, product) {
        var dropdown = productCard.querySelector("#colors");

        var availableColors = product.colors;

        for (var i = 0; i < availableColors.length; i++) {
            var option = document.createElement("option");
            option.value = availableColors[i];
            option.text = availableColors[i];
            dropdown.appendChild(option);
        }

         dropdown.addEventListener("change", function () {
             var selectedColor = dropdown.value;
             product.selectedSize = selectedSize;
         });
    }

   function displayCartProducts(cart) {
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = ""; // Очищаем список перед добавлением новых товаров

    for (const orderItem in cart) {
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
        cartList.appendChild(orderCard); // Добавляем созданный элемент в список
    }
}

    // Обработка изменений фильтров
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

    // Показать/скрыть фильтры
    const filterMenu = document.getElementById("filterMenu");
    const showFilters = document.getElementById("showFilters");

    showFilters.addEventListener("click", () => {
      if (filterMenu.style.display === "block") {
        filterMenu.style.display = "none";
      } else {
        filterMenu.style.display = "block";
      }
    });

    // Получаем элементы
    const buttonCarousel = document.getElementById("buttonCarousel");
    const buttonsContainer = buttonCarousel.querySelector(".carousel-inner");

    // Устанавливаем начальные значения
    let isDragging = false;
    let startPosition = 0;
    let deltaX = 0;

    // Обработчики событий для мыши
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

    // Обработчики событий для сенсорных устройств (мобильных устройств)
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

    function addOrderItem(button) {
        let productCard = button.closest(".product-card");
        let selectedSize = productCard.selectedSize;
        let selectedColor = productCard.selectedColor;

        if(selectedSize === null){

        }else if(selectedColor === null){

        }else if(selectedColor === null && selectedSize === null){

        }

        let orderItemId = createOrderItem(productCard, selectedSize, selectedColor);

        const quantityIndicator = button.nextElementSibling;
        quantityIndicator.style.display = 'block';

        let quantity = parseInt(quantityIndicator.textContent);
        quantity += 1;
        quantityIndicator.textContent = quantity;
        mainBtn.show();
    }

    function createOrderItem(productId, selectedSize, selectedColor){
        const currentOrderId = cart.getNextOrderId();
        cart.push(currentOrderId, products.find(product => product.id === productId), selectedSize, selectedColor);
        return currentOrderId;
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

    // Показать все товары при загрузке страницы
    displayProducts();