let mainBtn = window.Telegram.WebApp.MainButton;
let backBtn = window.Telegram.WebApp.BackButton;
let webApp = window.Telegram.WebApp;

class Product {
    constructor(id,
                name,
                brand,
                category,
                subCategory,
                gender,
                season,
                images,
                price,
                description,
                sizes,
                colors)
    {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.category = category;
        this.subCategory = subCategory;
        this.gender = gender;
        this.season = season;
        this.images = images;
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
const images = ["sneakers/1.jpg","sneakers/2.jpg","sneakers/3.jpg","sneakers/4.jpg","sneakers/5.jpg","sneakers/6.jpg","sneakers/7.jpg"];

const products = [
    new Product(1, "Кроссовки Nike Белые", "Nike", "обувь", "кроссовки","женское", "весна", images, 7990, text, sizes, colors),
    new Product(2, "Кроссовки Nike Белые", "Nike","обувь","кроссовки", "женское", "зима", images, 8990, text, sizes, colors),
    new Product(3, "Кроссовки Nike Белые", "Nike","обувь","кроссовки", "женское", "лето", images, 6990, text, sizes, colors),
    new Product(4, "Кроссовки Nike Белые", "Nike","обувь", "кроссовки","женское", "осень", images, 15990, text, sizes, colors),
    new Product(5, "Кроссовки Nike Белые", "Nike","обувь", "кроссовки", "женское", "весна", images, 15990, text, sizes, colors),
    new Product(6, "Кроссовки Nike Белые", "Nike","обувь", "кроссовки", "женское", "весна", images, 7990, text, sizes, colors),
    new Product(7, "Штаны","Nike", "одежда",  "Штаны", "женское", "весна", images, 7990, text, sizes, colors),
    new Product(8, "Футболка", "Nike", "одежда", "Футболки",  "женское", "весна", images, 7990, text, sizes, colors),
    new Product(9, "Футболка", "Nike", "одежда", "Футболки",  "женское", "весна", images, 7990, text, sizes, colors),
    new Product(10, "Футболка", "Nike", "одежда", "Футболки",  "женское", "весна", images, 7990, text, sizes, colors),
    new Product(11, "Футболка", "Nike", "одежда", "Футболки",  "женское", "весна", images, 7990, text, sizes, colors),
    new Product(12, "Футболка", "Nike", "одежда", "Футболки",  "женское", "весна", images, 7990, text, sizes, colors),
    new Product(13, "Футболка", "Nike", "одежда", "Футболки",  "женское", "весна", images, 7990, text, sizes, colors),
    new Product(14, "Футболка", "Nike", "одежда", "Футболки",  "женское", "весна", images, 7990, text, sizes, colors)
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
              <div class="slider-container">
                        <div class="slider">
                            ${product.images.map(image => `
                                <img src="${image}" class="card-img-top" alt="${product.name}">
                            `).join('')}
                        </div>
                        <i class="prev-button" aria-label="Посмотреть предыдущий слайд">&lt;</i>
                        <i class="next-button" aria-label="Посмотреть следующий слайд">&gt;</i>
                    </div>
              <div class="card-info">
                <div class="">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-description-text ">${product.description}</p>
                <p class="card-price">${product.price}₽</p>
              </div>
              <div class="order-data">
                <select id="sizes" name="sizes" class="comboBox">
                    <option value="" disabled selected>Размер</option>
                </select>

                <select id="colors" name="colors" class="comboBox">
                    <option value="" disabled selected>Цвет</option>  
                </select>
                
                <select id="order-items" name="order-items" class="comboBox">
                    <option value="" disabled selected>0</option>
                </select>
              </div>
              <div class="product-action">
                <button class="add-to-cart-button bubbly-button" id="add-to-cart-button" onclick="addOrderItem(this)">Добавить в корзину</button>
                <button class="add-to-cart-button bubbly-button" id="update-order-item-button" onclick="updateOrderItem(this)" style="display: none">Сохранить</button>
                <button class="add-to-cart-button bubbly-button" id="delete-order-item-button" onclick="deleteOrderItem(this)" style="display: none">Удалить</button>
              </div>
              </div>
              
            </div>
          `;
          initSlider(productCard);
          updateDropDowns(productCard, product);
          productRow.appendChild(productCard);
        }
      });

      productList.appendChild(productRow);
    }

    function initSlider(productCard){
        const slider = productCard.querySelector('.slider');
        const prevButton = productCard.querySelector('.prev-button');
        const nextButton = productCard.querySelector('.next-button');
        const slides = Array.from(slider.querySelectorAll('img'));
        const slideCount = slides.length;
        let slideIndex = 0;

        prevButton.addEventListener('click', ()=>{
            slideIndex = (slideIndex - 1 + slideCount) % slideCount;
            updateSlider(slides, slideIndex);
        });
        nextButton.addEventListener('click', ()=>{
           slideIndex = (slideIndex + 1) % slideCount;
            updateSlider(slides, slideIndex);
        });

        updateSlider(slides, slideIndex);
    }

    function updateSlider(slides, slideIndex) {
        slides.forEach((slide, index) => {
            if (index === slideIndex) {
            slide.style.display = 'block';
            } else {
            slide.style.display = 'none';
            }
        });
    }

    function updateDropDowns(productCard, product) {
        var sizesDropdown = productCard.querySelector("#sizes");
        var colorsDropdown = productCard.querySelector("#colors");
        var orderItemsDropdown = productCard.querySelector("#order-items");

        var addToCartButton = productCard.querySelector("#add-to-cart-button");
        var updateOrderItemButton = productCard.querySelector("#update-order-item-button");
        var deleteOrderItemButton = productCard.querySelector("#delete-order-item-button");

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

        updateOrderItemDropDown(orderItemsDropdown, cart.orderItems[productCard.dataset.id]);

         orderItemsDropdown.addEventListener("change", function () {
             var orderItemId = parseInt(orderItemsDropdown.value);
             cart.setCurrentItem(product.id, orderItemId - 1);

             sizesDropdown.value = cart.currentItems[product.id].value.selectedSize;
             colorsDropdown.value = cart.currentItems[product.id].value.selectedColor;
             addToCartButton.style.display = "none";
             updateOrderItemButton.style.display = "block";
             deleteOrderItemButton.style.display = "block";
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
  const cartList = document.getElementById("cart-container");
  cartList.innerHTML = "";

  for (const productId in cart.orderItems) {
    const orderCard = document.createElement("div");
    orderCard.className = "cart-item";
    const product = cart.orderItems[productId][0].product;
    const orderItem = cart.orderItems[productId][0];

    // Create unique IDs for each cartContent
    const cartContentId = `cartContent_${productId}`;

    orderCard.innerHTML = `
      <img class="item1" src="${orderItem.product.image}" alt="${orderItem.product.name}">
      <div class="item-details item2">
        <div class="item-title"><strong>${orderItem.product.name}</strong></div>
        <div class="item-info item5">
            <div class="item-price ">${orderItem.product.price}</div>
        </div>
        <div class="expand-button" onclick="toggleCart('${orderCard}', '${productId}', ${cartContentId}, this)">Показать</div>
      </div>
      <div class="item4" id='${cartContentId}'>
        
      </div>
    `;

    cartList.appendChild(orderCard);
  }
}

function createSelect(options, selectedValue, parentElement) {
  const select = document.createElement('select');
  select.classList.add("comboBox");
  options.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option;
    optionElement.text = option;

    if (option === selectedValue) {
      optionElement.selected = true;
    }

    select.add(optionElement);
  });

  parentElement.appendChild(select);

  return select;
}


function toggleCart(orderCard, productId, productContainer, btn) {
   productContainer.style.display = productContainer.style.display === 'none' ? 'block' : 'none';

   if (productContainer.style.display === 'block') {
       updateItemCart(productContainer, productId);
   }

   btn.textContent = productContainer.style.display === 'none' ? 'Показать' : 'Скрыть';
}

    function updateItemCart(productContainer, productId){
        productContainer.innerHTML = '';
        const orderItems = cart.orderItems[productId];
        const sizeColorList = document.createElement('ul');
        orderItems.forEach(orderItem => {
            const listItem = document.createElement('li');
            const sizeSelect = createSelect(orderItem.product.sizes, orderItem.selectedSize, listItem);
            const colorSelect = createSelect(orderItem.product.colors, orderItem.selectedColor, listItem);

            const deleteButton = document.createElement('button');
                deleteButton.classList.add("fa");
                deleteButton.classList.add("fa-trash-o");
                deleteButton.classList.add("fa-lg");
                deleteButton.classList.add("cart-item-delete-button");
                deleteButton.ariaHidden = 'true';
                deleteButton.addEventListener('click', function() {
                    updateItemCart(productContainer, productId);
                    cart.remove(productId, orderItem);
                });

            sizeSelect.addEventListener('change', function () {
                orderItem.selectedSize = this.value;
            });

            colorSelect.addEventListener('change', function () {
                orderItem.selectedColor = this.value;
            });

            listItem.innerHTML = '';
            listItem.appendChild(sizeSelect);
            listItem.appendChild(colorSelect);
            listItem.appendChild(deleteButton);
            sizeColorList.appendChild(listItem);
        });

        productContainer.appendChild(sizeColorList);
    }

    document.getElementById("showAll").addEventListener("click", () => {
      displayProducts();
    });

    document.getElementById("showClothing").addEventListener("click", () => {
      displayProducts("одежда");
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

    let isDragging = false;
    let startPosition = 0;
    let deltaX = 0;

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

        mainBtn.show();
    }

    function updateOrderItem(button){
        let productCard = button.closest(".product-card");
        let orderItemsDropdown = productCard.querySelector("#order-items");
        let addToCartButton = productCard.querySelector("#add-to-cart-button");
        let deleteOrderItemButton = productCard.querySelector("#delete-order-item-button");

        updateOrderItemDropDown(orderItemsDropdown, cart.orderItems[productCard.dataset.id]);
        resetOrderItemOption(productCard);

        button.style.display = "none";
        deleteOrderItemButton.style.display = "none";
        addToCartButton.style.display = "block";
    }

    function deleteOrderItem(button){
        let productCard = button.closest(".product-card");
        let orderItemsDropdown = productCard.querySelector("#order-items");
        let addToCartButton = productCard.querySelector("#add-to-cart-button");
        let updateOrderItemButton = productCard.querySelector("#update-order-item-button");

        cart.remove(productCard.dataset.id, cart.currentItems[productCard.dataset.id]);

        updateOrderItemDropDown(orderItemsDropdown, cart.orderItems[productCard.dataset.id]);
        resetOrderItemOption(productCard);

        button.style.display = "none";
        updateOrderItemButton.style.display = "none";
        addToCartButton.style.display = "block";
    }

    function updateOrderItemDropDown(orderItemsDropDown, orderItems) {

        if(orderItems === null || orderItems === undefined){
            return;
        }
    orderItemsDropDown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.text = orderItems.length;
    orderItemsDropDown.add(defaultOption);

    orderItems.forEach((order, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.text = `${index + 1}. ${order.selectedColor} ${order.selectedSize}`;
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
        displayProducts();
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

    displayProducts();