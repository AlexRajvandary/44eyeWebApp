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
const sizes = "S,M,L";
const colors = "Белый,Чёрный";
const images = "sneakers/1.jpg,sneakers/2.jpg,sneakers/3.jpg,sneakers/4.jpg,sneakers/5.jpg,sneakers/6.jpg,sneakers/7.jpg";

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
var productsFromApi;

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

async function getProducts(){
    var url = 'https://alexraj22.pythonanywhere.com/products'
    try{
        var response = await fetch(url);
        if (!response.ok) {
            response = await fetch(url);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        }
        productsFromApi = await response.json();
    }catch(error){
        console.error('There was a problem with the fetch operation:', error);
    }
}

 function searchProducts(searchText) {
            var productList = document.getElementById('productList').children[0].children;
            var count = 0;
            for (var i = 0; i < productList.length; i++) {
                var brand = productList[i].children[0].dataset.brand.toLowerCase();
                var name = productList[i].children[0].dataset.name.toLowerCase();
                var id = productList[i].children[0].dataset.id.toLowerCase();
                var gender = productList[i].children[0].dataset.gender.toLowerCase();

                var matchesSearch = brand.includes(searchText) || name.includes(searchText) || id.includes(searchText) || gender.includes(searchText);

                productList[i].style.display = matchesSearch ? 'block' : 'none';

                if(matchesSearch){
                    count++;
                }
            }
        }

     async function displayProducts(categoryFilter = "", genderFilter = "", seasonFilter = "", load = true, itemsPerRow = 1) {
      const productList = document.getElementById("productList");
      productList.innerHTML = "";

      const productRow = document.createElement("div");
      productRow.className = "row";
      if(load){
          await getProducts();
      }
      productsFromApi.forEach(product => {
        if (
          (!categoryFilter || product.category === categoryFilter) &&
          (!genderFilter || product.gender === genderFilter) &&
          (!seasonFilter || product.season === seasonFilter)
        ) {
            const colClass = `col-md-${12 / itemsPerRow}`;

          const productCard = document.createElement("div");
            productCard.className = `product-card ${colClass}`;
          productCard.innerHTML = `
            <div class="product-card" 
                 id="productCard"
                 data-id="${product.id}"
                 data-price="${product.price}"
                 data-name="${product.name}"
                 data-image="${product.images}"
                 data-description="${product.description}"
                 data-season="${product.season}"
                 data-category="${product.category}"
                 data-gender="${product.gender}"
                 data-brand="${product.brand}">
             <div class="swiper mySwiper">
                        <div class="swiper-wrapper">
                            ${product.images.split(',').map(image => `
                                <div class="swiper-slide"> 
                                    <img src="catalogue/${product.vendorCode}/${image.trim()}" class="card-img-top" alt="${product.name}">
                                </div>
                            `).join('')}
                        </div>
                        <div class="swiper-pagination"></div>
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

          updateDropDowns(productCard, product);
          productRow.appendChild(productCard);
        }
      });

      productList.appendChild(productRow);
      initSwiper();
    }

   function initSwiper() {
        var swiper = new Swiper(".mySwiper", {
              spaceBetween: 10,
              effect: "coverflow",
              loop: true,
              pagination: {
                  el: ".swiper-pagination",
                  clickable: true,
              },
        });
    }

     function initSwiper2() {
        var swiper = new Swiper(".mySwiper2", {
              spaceBetween: 10,
              effect: "coverflow",
              loop: true,
              pagination: {
                  el: ".swiper-pagination",
                  clickable: true,
              },
        });
    }

    function updateDropDowns(productCard, product) {
        var sizesDropdown = productCard.querySelector("#sizes");
        var colorsDropdown = productCard.querySelector("#colors");
        var orderItemsDropdown = productCard.querySelector("#order-items");

        var addToCartButton = productCard.querySelector("#add-to-cart-button");
        var updateOrderItemButton = productCard.querySelector("#update-order-item-button");
        var deleteOrderItemButton = productCard.querySelector("#delete-order-item-button");

        var availableSizes = product.sizes.split(',');
        var availableColors = product.colors.split(',');

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

        updateOrderItemDropDown(orderItemsDropdown, cart.orderItems[product.id]);

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
  let totalAmount = 0;

  for (const productId in cart.orderItems) {
    const orderCard = document.createElement("div");
    orderCard.className = "cart-item-2";
    const product = cart.orderItems[productId][0].product;
    const orderItem = cart.orderItems[productId][0];
    const length = cart.orderItems[productId].length;
    const price = length * product.price;
    totalAmount+= price;
    // Create unique IDs for each cartContent
    const cartContentId = `cartContent_${productId}`;

    orderCard.innerHTML = `
                  <div class="left">
                      <div class="swiper mySwiper2">
                         <div class="swiper-wrapper">
                            ${product.images.split(',').map(image => `
                                <div class="swiper-slide"> 
                                    <img src="catalogue/${product.vendorCode}/${image.trim()}" class="card-img-top" alt="${product.name}">
                                </div>
                            `).join('')}
                        </div>
                        <div class="swiper-pagination"></div>
                  </div>
                 </div>
                 <div class="right">
                     <div class="item-details">
                        <div class="item-title">${orderItem.product.name}</div>
                        <div class="item-desc">
                            <div class="text-at-bottom">Количество ${length}<br>Стоимость ${price}₽</div>
                        </div>
                    </div>
                 </div>
    `;

    cartList.appendChild(orderCard);
  }

   const total = document.createElement("div");


    total.innerHTML = `
    
      <div class="item-details item2">
          <div class="item-title" style="text-align: right; padding: 10px;">Итого ${totalAmount}₽</div>
      </div>
    `;

    cartList.appendChild(total);

  initSwiper2();
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

    var categorySelect = document.getElementById("categoryFilter");
    var seasonSelect = document.getElementById("seasonFilter");
    var genderSelect = document.getElementById("genderFilter");

    async function onFilterChanged(){
        await displayProducts(categorySelect.value, genderSelect.value, seasonSelect.value);
    }

    categorySelect.addEventListener("change", onFilterChanged);
    seasonSelect.addEventListener("change", onFilterChanged);
    genderSelect.addEventListener("change", onFilterChanged);

    const filterMenu = document.getElementById("filterMenu");
    const showFilters = document.getElementById("showFilters");

    showFilters.addEventListener("click", () => {
      if (filterMenu.style.display === "block") {
        filterMenu.style.display = "none";
      } else {
        filterMenu.style.display = "block";
      }
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

    async function backBtnClicked(){
        $('.order_view').hide();
        backBtn.hide();
        await displayProducts("","","",false,1);
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

    var scrollBtn = document.getElementById("scrollToTopBtn");

    scrollBtn.addEventListener('click', function () {
        scrollToTop(1000); // 1000 миллисекунд = 1 секунда
    });

    function scrollToTop(duration) {
        var start = window.scrollY,
        startTime = performance.now();

        function animateScroll() {
            var now = performance.now(),
                progress = (now - startTime) / duration;

            window.scrollTo(0, easeInOutCubic(progress, start, -start, 1));

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        }

        function easeInOutCubic(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }

        requestAnimationFrame(animateScroll);
    }

    window.onscroll = function() {
        var scrollToTopBtn = document.getElementById("scrollToTopBtn");

         if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
             scrollToTopBtn.style.visibility = "visible";
         } else {
            scrollToTopBtn.style.visibility = "hidden";
        }
    };


    displayProducts("","","",true,1);
