const basketBtn = document.querySelector(".wrapper__navbar-btn");
const basketCount = document.querySelector(".wrapper__navbar-count");
const productBtns = document.querySelectorAll(".wrapper__list-btn");
const basket = document.querySelector(".wrapper__navbar-basket");
const basketClose = document.querySelector(".wrapper__navbar-close");
const basketList = document.querySelector(".wrapper__navbar-checklist");
const basketTotalPrice = document.querySelector(".wrapper__navbar-totalprice");
const basketOrder = document.querySelector(".wrapper__navbar-bottom");
const printBody = document.querySelector(".print__body");
const printFooter = document.querySelector(".print__footer");

const products = {
  crazy: {
    title: "Crazy",
    price: 31000,
    image: "images/products/burger-1.png",
    amount: 0,
    get summ() {
      return this.price * this.amount;
    },
  },
  light: {
    title: "Light",
    price: 26000,
    image: "images/products/burger-2.png",
    amount: 0,
    get summ() {
      return this.price * this.amount;
    },
  },
  cheeseburger: {
    title: "CheeseBurger",
    price: 29000,
    image: "images/products/burger-3.png",
    amount: 0,
    get summ() {
      return this.price * this.amount;
    },
  },
  dburger: {
    title: "DBurger",
    price: 24000,
    image: "images/products/burger-4.png",
    amount: 0,
    get summ() {
      return this.price * this.amount;
    },
  },
};

productBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    addBasket(this);
  });
});

function addBasket(btn) {
  const parent = btn.closest(".wrapper__list-card").getAttribute("id");
  products[parent].amount++;
  basketInfo();
}

function basketInfo() {
  const productList = [];
  let totalCount = 0;
  for (const key in products) {
    const product = products[key];
    const productCard = document.querySelector(
      `#${product.title.toLowerCase()}`
    );
    const productCount = productCard.querySelector(".wrapper__list-count");
    if (product.amount) {
      productList.push(product);
      totalCount += product.amount;
      basketCount.classList.add("active");
      productCount.classList.add("active");
      productCount.innerHTML = product.amount;
    } else {
      productCount.classList.remove("active");
    }
    basketCount.innerHTML = totalCount;
  }
  basketList.innerHTML = "";
  for (let i = 0; i < productList.length; i++) {
    basketList.innerHTML += `<div class="wrapper__navbar-product">
        <div class="wrapper__navbar-info">
          <img
            src="${productList[i].image}"
            alt="${productList[i].title}"
            class="wrapper__navbar-productImage"
          />
          <div>
            <p class="wrapper__navbar-infoName">${productList[i].title}</p>
            <p class="wrapper__navbar-infoPrice">${productList[i].price}</p>
          </div>
        </div>
        <div class="wrapper__navbar-option" id="${productList[
          i
        ].title.toLowerCase()}__card">
          <button class="wrapper__navbar-symbol fa-minus" data-symbol="-" >-</button>
          <p class="wrapper__navbar-num">${productList[i].amount}</p>
          <button class="wrapper__navbar-symbol fa-plus" data-symbol="+" >+</button>
        </div>
      </div>`;
  }
  basketTotalPrice.innerHTML = basketTotalCost();
  let count = basketTotalCount();
  if (count) {
    basketCount.classList.add("active");
  } else {
    basketCount.classList.remove("active");
  }
  basketCount.innerHTML = count;
}

function basketTotalCost() {
  let summa = 0;
  for (const key in products) {
    summa += products[key].summ;
  }
  return summa + " so'm";
}

function basketTotalCount() {
  let count = 0;
  for (const key in products) {
    count += products[key].amount;
  }
  return count;
}

basketBtn.addEventListener("click", function () {
  basket.classList.add("active");
});
basketClose.addEventListener("click", function () {
  basket.classList.remove("active");
});

window.addEventListener("click", function (e) {
  let btn = e.target;
  if (btn.classList.contains("wrapper__navbar-symbol")) {
    let attr = btn.getAttribute("data-symbol");
    let btnParent = btn
      .closest(".wrapper__navbar-option")
      .getAttribute("id")
      .split("__")[0];
    if (attr === "+") {
      products[btnParent].amount++;
    } else if (attr === "-") {
      products[btnParent].amount--;
    }
    basketInfo();
  }
});

basketOrder.addEventListener("click", function () {
  printBody.innerHTML = "";
  for (const key in products) {
    if (products[key].amount) {
      printBody.innerHTML += `<div class="print__body-item">
            <div class="print__body-item_name">
              <span>${products[key].title}</span>
              <span>${products[key].amount}</span>
            </div>
            <p class="print__body-summ">${products[key].summ}</p>
          </div>`;
    }
  }
  printFooter.innerHTML = basketTotalCost()
  window.print()
});
