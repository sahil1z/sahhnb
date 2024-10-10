import products from "./api/products.json";
import { fetchQuantityFromCartLS } from "./fetchQuantityFromCartLS";
import { getCartProductFromLS } from "./getCartProducts";
import { incrementDecrement } from "./incrementDecrement";
import { removeProdFromCart } from "./removeProdFromCart";
import { updateCartProductTotal } from "./updateCartProductTotal";

let cartProducts = getCartProductFromLS();

let filterProducts = products.filter((curProd) => {
  return cartProducts.some((curElem) => curElem.id === curProd.id);
});

console.log(filterProducts);

// -----------------------------------------------------
// to update the addToCart page
// --------------------------------------------------------
const cartElement = document.querySelector("#productCartContainer");
const templateContainer = document.querySelector("#productCartTemplate");

const showCartProduct = () => {
  filterProducts.forEach((curProd) => {
    const { category, id, image, name, stock, price } = curProd;

    let productClone = document.importNode(templateContainer.content, true);
    const lSActualData = fetchQuantityFromCartLS(id, price);

    productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
    productClone.querySelector(".category").textContent = category;
    productClone.querySelector(".productName").textContent = name;
    productClone.querySelector(".productImage").src = image;

    productClone.querySelector(".productQuantity").textContent = lSActualData.quantity;
    productClone.querySelector(".productPrice").textContent = lSActualData.price;

    // Update total price for this product
    const totalProductPrice = lSActualData.quantity * lSActualData.price;
    productClone.querySelector(".totalPrice").textContent = totalProductPrice.toFixed(2); // Assuming you have a .totalPrice element in your template

    // Handle increment and decrement button
    productClone.querySelector(".stockElement").addEventListener("click", (event) => {
      incrementDecrement(event, id, stock, price);
      updateCartTotal(); // Update total whenever quantity changes
    });

    productClone.querySelector(".remove-to-cart-button").addEventListener("click", () => {
      removeProdFromCart(id);
      updateCartTotal(); // Update total after removal
    });

    cartElement.appendChild(productClone);
  });
};

// Function to update the total price of the cart
const updateCartTotal = () => {
  let total = 0;
  filterProducts.forEach((curProd) => {
    const lSActualData = fetchQuantityFromCartLS(curProd.id, curProd.price);
    total += lSActualData.quantity * lSActualData.price;
  });
  document.querySelector("#cartTotal").textContent = total.toFixed(2); // Assuming you have an element with the ID cartTotal
};

// -----------------------------------------------------
// Showing the cartProducts
// --------------------------------------------------------
showCartProduct();

// -----------------------------------------------------
// calculating the total in our cartProducts page
// --------------------------------------------------------
updateCartTotal();
