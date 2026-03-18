let cart = [];

// Load cart from localStorage
function loadCart() {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) cart = JSON.parse(storedCart);
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Product data
function getProductById(id) {
  const products = [
    { id: "1", name: "Wireless Headphones", price: 99.99 },
    { id: "2", name: "Smart Watch", price: 149.99 },
    { id: "3", name: "Gaming Laptop", price: 999.99 },
    { id: "4", name: "Running Sneakers", price: 79.99 },
    { id: "5", name: "Leather Jacket", price: 199.99 },
    { id: "6", name: "Coffee Maker", price: 59.99 },
    { id: "7", name: "Vacuum Cleaner", price: 129.99 },
    { id: "8", name: "Travel Backpack", price: 49.99 },
    { id: "9", name: "Polarized Sunglasses", price: 39.99 }
  ];
  return products.find(p => p.id === id);
}

// Add to cart
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const product = getProductById(btn.dataset.id);
    cart.push(product);
    saveCart();
    showToast(product.name + " added to cart!");
  });
});

// Cart page rendering
if (document.getElementById('cartItems')) {
  loadCart();
  const cartItemsDiv = document.getElementById('cartItems');
  let total = 0;
  cart.forEach(item => {
    const div = document.createElement('div');
    div.textContent = `${item.name} - $${item.price}`;
    cartItemsDiv.appendChild(div);
    total += item.price;
  });
  document.getElementById('cartTotal').textContent = "Total: $" + total.toFixed(2);
}

// Checkout form
if (document.getElementById('checkoutForm')) {
  document.getElementById('checkoutForm').addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('orderResponse').textContent = "🎉 Order placed successfully! Thank you for shopping with us.";
    localStorage.removeItem('cart');
  });
}

// Toast notification with animation
function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom =
