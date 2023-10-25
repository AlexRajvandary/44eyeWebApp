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
            <div class="product-card">
              <img src="${product.image}" class="card-img-top" alt="${product.name}">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-description-text ">Куртка Nike Storm-FIT Windrunner PrimaLoft с супертеплым утеплителем PrimaLoft Thermoplume
                 имеет классический силуэт и дополнительную изоляцию. Технология Nike Storm-FIT защитит вас от ветра и дождя, поэтому вы сможете наслаждаться высоким комфортом в любую погоду. Просторный крой обеспечивает дополнительное пространство, поэтому в холодные дни вы можете носить больше слоев под ним.</p>
                <p class="card-text">${product.price}₽</p>
              </div>
               <button class="add-to-cart-button" onclick="showQuantityControls(this)">Добавить в корзину</button>
               <div class="quantity-controls">
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
  startPosition = e.clientX - deltaX;

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
    }

    function hideQuantityControls(button) {
      const quantityControls = button.nextElementSibling;
      quantityControls.style.display = 'none';
      button.style.justifyContent = 'center';
      button.style.alignItems = 'center';
      button.style.display = 'flex';
    }

    function incrementQuantity(button) {
      const quantityElement = button.parentElement.querySelector('.quantity');
      let quantity = parseInt(quantityElement.textContent);
      quantityElement.textContent = quantity + 1;
    }

    function decrementQuantity(button) {
      const quantityElement = button.parentElement.querySelector('.quantity');
      let quantity = parseInt(quantityElement.textContent);
      if (quantity > 1) {
        quantityElement.textContent = quantity - 1;
      } else{
        hideQuantityControls(button.parentElement.previousElementSibling)
      }
    }

    // Показать все товары при загрузке страницы
    displayProducts();