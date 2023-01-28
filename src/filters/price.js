import { getElement } from "../utils.js";
import display from "../displayProducts.js";

const setupPrice = (store) => {
  const priceInput = getElement(".price-filter");
  const priceValue = getElement(".price-value");
  //setup filter
  let prices = store.map((product) => product.price);
  let minPrice = Math.ceil(Math.min(...prices) / 100);
  let maxPrice = Math.ceil(Math.max(...prices) / 100);
  priceInput.setAttribute("value", maxPrice);
  priceInput.max = maxPrice;
  priceInput.min = minPrice;
  priceValue.textContent = `Value: $${maxPrice}`;

  priceInput.addEventListener("input", (e) => {
    const value = parseInt(e.target.value);
    priceValue.textContent = `Value: $${value}`;
    let newStore = store.filter((product) => product.price / 100 <= value);
    display(newStore, getElement(".products-container"), true);
  });
};

export default setupPrice;
