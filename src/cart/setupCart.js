// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from "../utils.js";
import { openCart } from "./toggleCart.js";
import { findProduct } from "../store.js";
import addToCartDOM from "./addToCartDOM.js";
// set items

const cartItemCountDOM = getElement(".cart-item-count");
const cartItemsDOM = getElement(".cart-items");
const cartItemsTotalDOM = getElement(".cart-total");

let cart = getStorageItem("cart");

export const addToCart = (id) => {
  let item = cart.find((cartitem) => cartitem.id == id);
  if (!item) {
    let product = findProduct(id);
    product = { ...product, amount: 1 };
    cart = [...cart, product];
    addToCartDOM(product);
  } else {
    const amount = increaseAmount(id);
    const items = [...cartItemsDOM.querySelectorAll(".cart-item-amount")];
    let newAmount = items.find((item) => item.dataset.id === id);
    newAmount.textContent = amount;
  }
  //add one to the shopping cart icon
  displayCartItemCount();
  //display cart totals
  displayCartTotal();
  //set cart in local
  setStorageItem("cart", cart);

  openCart();
};

function displayCartItemCount() {
  const amount = cart.reduce((total, cartitem) => {
    return (total += cartitem.amount);
  }, 0);
  cartItemCountDOM.textContent = amount;
}

function displayCartTotal() {
  let total = cart.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.amount);
  }, 0);
  cartItemsTotalDOM.textContent = `Total: ${formatPrice(total)}`;
}

function displayCartItemsDOM() {
  cart.forEach((cartItem) => {
    addToCartDOM(cartItem);
  });
}

function removeItem(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id);
}
function increaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

function setupCartFunctionality() {
  cartItemsDOM.addEventListener("click", function (e) {
    const element = e.target;
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;
    const parentId = parent.dataset.id;
    //remove
    if (element.classList.contains("cart-item-remove-btn")) {
      removeItem(id);
      parent.parentElement.remove();
    }
    //increase
    if (parent.classList.contains("cart-item-increase-btn")) {
      const newAmount = increaseAmount(parentId);
      parent.nextElementSibling.textContent = newAmount;
    }
    //decrease
    if (parent.classList.contains("cart-item-decrease-btn")) {
      const newAmount = decreaseAmount(parentId);
      if (newAmount === 0) {
        removeItem(parentId);
        parent.parentElement.parentElement.remove();
      } else {
        parent.previousElementSibling.textContent = newAmount;
      }
    }

    displayCartItemCount();
    displayCartTotal();
    setStorageItem("cart", cart);
  });
}
const init = () => {
  displayCartItemCount();
  displayCartTotal();
  //add all cart items to dom
  displayCartItemsDOM();
  //setup cart functionality
  setupCartFunctionality();
};

init();
