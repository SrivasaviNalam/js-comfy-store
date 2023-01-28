import { getElement } from "../utils.js";

const toggleContainer = getElement(".toggle-container");
const cartClose = getElement(".cart-close");
const cartOverlay = getElement(".cart-overlay");

toggleContainer.addEventListener("click", () => {
  cartOverlay.classList.add("show");
});

cartClose.addEventListener("click", () => {
  cartOverlay.classList.remove("show");
});

export const openCart = () => {
  cartOverlay.classList.add("show");
};
