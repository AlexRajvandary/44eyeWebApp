let mainBtn = window.Telegram.WebApp.MainButton;
let backBtn = window.Telegram.WebApp.BackButton;
let webApp = window.Telegram.WebApp;

class Product {
    constructor(id, name, description, category, price, image, season, gender) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.season = season;
        this.gender = gender;
    }
}

const products = [
    new Product(1, "Кроссовки Nike Белые", "обувь", "женское", "весна", "sneakers/1.jpg", 7990, "Описание товара 1"),
    new Product(2, "Кроссовки New Balance Белые", "обувь", "женское", "весна", "sneakers/2.jpg", 12490, "Описание товара 2"),
    new Product(3, "Кроссовки Nike Sony", "обувь", "мужское", "весна", "sneakers/3.jpg", 15990, "Описание товара 3"),
    new Product(4, "Кроссовки Чёрные", "обувь", "мужское", "весна", "sneakers/4.jpg", 12390, "Описание товара 4"),
    new Product(5, "Кроссовки New Balance", "обувь", "мужское", "весна", "sneakers/5.jpg", 7490, "Описание товара 5"),
    new Product(6, "Кроссовки New Balance", "обувь", "мужское", "весна", "sneakers/6.jpg", 5490, "Описание товара 6"),
    new Product(7, "Штаны Чёрные Мужские", "верхняя_одежда", "мужское", "весна", "pants/1.jpg", 7990, "Описание товара 7"),
    new Product(8, "Кроссовки Nike Белые", "верхняя_одежда", "женское", "весна", "tshirt/1.jpg", 5490, "Описание товара 8"),
    new Product(9, "Кроссовки New Balance Белые", "верхняя_одежда", "женское", "весна", "tshirt/2.jpg", 7990, "Описание товара 9"),
    new Product(10, "Кроссовки Nike Sony", "верхняя_одежда", "мужское", "весна", "tshirt/3.jpg", 7990, "Описание товара 10"),
    new Product(11, "Пуховик зимний", "верхняя_одежда", "мужское", "весна", "tshirt/4.jpg", 5490, "Описание товара 11"),
    new Product(12, "Футболка Inspire Чёрная", "верхняя_одежда", "мужское", "весна", "tshirt/5.jpg", 5490, "Описание товара 12"),
    new Product(13, "Футболка Brooklyn Белая", "верхняя_одежда", "мужское", "весна", "tshirt/6.jpg", 12390, "Описание товара 13"),
    new Product(14, "Футболки хайповые", "верхняя_одежда", "мужское", "весна", "tshirt/7.jpg", 7990, "Описание товара 14")
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

let cart = {};

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
                 data-description="${product.description}">
              <img src="${product.image}" class="card-img-top" alt="${product.name}">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-description-text ">${product.description}</p>
                <p class="card-text">${product.price}₽</p>
              </div>
               <button class="add-to-cart-button bubbly-button" onclick="showQuantityControls(this)">Добавить в корзину</button>
               <div class="quantity-controls ">
                    <button onclick="decrementQuantity(this)">-</button>
                    <div class="quantity">1</div>
                    <button onclick="incrementQuantity(this)">+</button>
               </div>
            </div>
          `;
          productRow.appendChild(productCard);
        }
      });

      productList.appendChild(productRow);
    }

    function displayCartProducts(cart) {
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = ""; // Очищаем список перед добавлением новых товаров
    let t = getCartContents(cart);
    t.forEach(cartItem => {
        const orderCard = document.createElement("div");
        orderCard.className = "cart-item";
        orderCard.innerHTML = `
          <div class="cart-block">
               <div class="row-cart">
                        <div class="element-cart" style="width: 50%;">
                            <picture>
                                <img src="${cartItem.product.dataset.image}" 
                                     alt="${cartItem.product.dataset.name}" 
                                     class="cart-item-img">
                                <canvas width="32" height="32"></canvas>
                            </picture>
                        </div>
                        <div class="element-cart" style="width: 50%;">
                            <h5 class="cart-item-title" style="white-space: normal; position: relative; top: -20px;">${cartItem.product.dataset.name}</h5>
                            <h7>${cartItem.product.dataset.price}₽</h7>
                        </div>
               </div>
          </div>
        `;
        cartList.appendChild(orderCard); // Добавляем созданный элемент в список
    });
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

    function showQuantityControls(button) {
      const quantityControls = button.nextElementSibling;
      quantityControls.style.display = 'flex';
      button.style.display = 'none';
      mainBtn.show();
    }

    function hideQuantityControls(button) {
      const quantityControls = button.nextElementSibling;
      quantityControls.style.display = 'none';
      button.style.justifyContent = 'center';
      button.style.alignItems = 'center';
      button.style.display = 'flex';
      mainBtn.hide();
    }

    function incrementQuantity(button) {
      const quantityElement = button.parentElement.querySelector('.quantity');
      let quantity = parseInt(quantityElement.textContent);
      quantityElement.textContent = quantity + 1;
      let product = button.closest(".product-card");
      updateCart(product, 1);
    }

    function decrementQuantity(button) {
        let product = button.closest(".product-card");
        const quantityElement = button.parentElement.querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 1) {
            quantityElement.textContent = quantity - 1;
            updateCart(product, -1);
        } else{
            hideQuantityControls(button.parentElement.previousElementSibling);
            removeFromCart(product);
        }
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

    function updateCart(product, quantity) {
        if (cart[product.id]) {
            cart[product.id].quantity += quantity;
        } else if(quantity > 0) {
            cart[product.id] = {
                product: product,
                quantity: quantity,
            };
        }
    }

    function removeFromCart(productId) {
        if (cart[productId]) {
            delete cart[productId];
        }
    }

    function getCartContents(cart) {
        return Object.values(cart);
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