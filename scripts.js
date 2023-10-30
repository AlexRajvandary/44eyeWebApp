let mainBtn = window.Telegram.WebApp.MainButton;
let backBtn = window.Telegram.WebApp.BackButton;
let webApp = window.Telegram.WebApp;

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

const products = [
      { name: "Кроссовки Nike Белые", category: "обувь", gender: "женское", season: "весна", image: "sneakers/1.jpg", price: 7990 },
      { name: "Кроссовки New Balance Белые", category: "обувь", gender: "женское", season: "весна", image: "sneakers/2.jpg", price: 12490 },
      { name: "Кроссовки Nike Sony", category: "обувь", gender: "мужское", season: "весна", image: "sneakers/3.jpg", price: 15990 },
      { name: "Кроссовки Чёрные", category: "обувь", gender: "мужское", season: "весна", image: "sneakers/4.jpg", price: 12390 },
      { name: "Кроссовки New Balance", category: "обувь", gender: "мужское", season: "весна", image: "sneakers/5.jpg", price: 7490 },
      { name: "Кроссовки New Balance", category: "обувь", gender: "мужское", season: "весна", image: "sneakers/6.jpg", price: 5490 },
      { name: "Штаны Чёрные Мужские", category: "верхняя_одежда", gender: "мужское", season: "весна", image: "pants/1.jpg", price: 7990 },
      { name: "Кроссовки Nike Белые", category: "верхняя_одежда", gender: "женское", season: "весна", image: "tshirt/1.jpg", price: 5490 },
      { name: "Кроссовки New Balance Белые", category: "верхняя_одежда", gender: "женское", season: "весна", image: "tshirt/2.jpg", price: 7990 },
      { name: "Кроссовки Nike Sony", category: "верхняя_одежда", gender: "мужское", season: "весна", image: "tshirt/3.jpg", price: 7990 },
      { name: "Пуховик зимний", category: "верхняя_одежда", gender: "мужское", season: "весна", image: "tshirt/4.jpg", price: 5490 },
      { name: "Футболка Inspire Чёрная", category: "верхняя_одежда", gender: "мужское", season: "весна", image: "tshirt/5.jpg", price: 5490 },
      { name: "Футболка Brooklyn Белая", category: "верхняя_одежда", gender: "мужское", season: "весна", image: "tshirt/6.jpg", price: 12390 },
      { name: "Футболки хайповые", category: "верхняя_одежда", gender: "мужское", season: "весна", image: "tshirt/7.jpg", price: 7990 }
      ]
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
                 data-item-id="${product.id}"
                 data-item-price="${product.price}"
                 data-item-id="${product.name}">
              <img src="${product.image}" class="card-img-top" alt="${product.name}">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-description-text ">Куртка Nike Storm-FIT Windrunner PrimaLoft с супертеплым утеплителем PrimaLoft Thermoplume
                 имеет классический силуэт и дополнительную изоляцию. Технология Nike Storm-FIT защитит вас от ветра и дождя, поэтому вы сможете наслаждаться высоким комфортом в любую погоду. Просторный крой обеспечивает дополнительное пространство, поэтому в холодные дни вы можете носить больше слоев под ним.</p>
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
    cartList.innerHTML = "";

    cart.forEach(cartItem => {
        const productCard = document.createElement("div");
        productCard.className = "cart-item";
        productCard.innerHTML = `
            <img src="${cartItem.product.image}" class="cart-item-img" alt="${cartItem.product.name}">
            <div class="cart-item-info">
                <h5 class="cart-item-title">${cartItem.product.name}</h5>
                <p class="cart-item-description">${cartItem.product.description}</p>
                <p class="cart-item-price">${cartItem.product.price}₽</p>
            </div>
            <div class="quantity-controls">
                <button onclick="decrementQuantity(this, ${cartItem.product.id})">-</button>
                <div class="quantity">${cartItem.quantity}</div>
                <button onclick="incrementQuantity(this, ${cartItem.product.id})">+</button>
            </div>
        `;
        cartList.appendChild(productCard);
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
        $('.order_view').show();
        backBtn.show();
        displayCartProducts();
        $('.catalogue').hide();
    }

     function backBtnClicked(){
        $('.order_view').hide();
        backBtn.hide();
        $('.catalogue').show();
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

    function getCartContents() {
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