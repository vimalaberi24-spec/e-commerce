// Global cart array
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

// Product data (can be expanded with images, categories)
function getProductById(id) {
  const products = [
    { id: "1", name: "Wireless Headphones", price: 99.99, img: "images/headphones.jpg" },
    { id: "2", name: "Smart Watch", price: 149.99, img: "images/watch.jpg" },
    { id: "3", name: "Gaming Laptop", price: 999.99, img: "images/laptop.jpg" },
    { id: "4", name: "Running Sneakers", price: 79.99, img: "images/sneakers.jpg" },
    { id: "5", name: "Leather Jacket", price: 199.99, img: "images/jacket.jpg" },
    { id: "6", name: "Coffee Maker", price: 59.99, img: "images/coffeemaker.jpg" },
    { id: "7", name: "Vacuum Cleaner", price: 129.99, img: "images/vacuum.jpg" },
    { id: "8", name: "Travel Backpack", price: 49.99, img: "images/backpack.jpg" },
    { id: "9", name: "Polarized Sunglasses", price: 39.99, img: "images/sunglasses.jpg" }
  ];
  return products.find(p => p.id === id);
}

// Add to cart with quantity handling
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const product = getProductById(btn.dataset.id);
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    saveCart();
    showToast(`${product.name} added to cart!`);
  });
});

// Render cart page with quantity controls
if (document.getElementById('cartItems')) {
  loadCart();
  const cartItemsDiv = document.getElementById('cartItems');
  let total = 0;

  cartItemsDiv.innerHTML = ""; // clear before rendering
  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.img}" width="60">
      <span>${item.name}</span>
      <span>$${item.price.toFixed(2)}</span>
      <div class="qty-controls">
        <button class="decrease" data-id="${item.id}">-</button>
        <span>${item.qty}</span>
        <button class="increase" data-id="${item.id}">+</button>
      </div>
      <button class="remove" data-id="${item.id}">Remove</button>
    `;
    cartItemsDiv.appendChild(div);
    total += item.price * item.qty;
  });

  document.getElementById('cartTotal').textContent = "Total: $" + total.toFixed(2);

  // Quantity & remove handlers
  document.querySelectorAll('.increase').forEach(btn => {
    btn.addEventListener('click', () => updateQty(btn.dataset.id, 1));
  });
  document.querySelectorAll('.decrease').forEach(btn => {
    btn.addEventListener('click', () => updateQty(btn.dataset.id, -1));
  });
  document.querySelectorAll('.remove').forEach(btn => {
    btn.addEventListener('click', () => removeItem(btn.dataset.id));
  });
}

// Update quantity
function updateQty(id, change) {
  const item = cart.find(p => p.id === id);
  if (!item) return;
  item.qty += change;
  if (item.qty <= 0) {
    cart = cart.filter(p => p.id !== id);
  }
  saveCart();
  location.reload(); // re-render cart
}

// Remove item
function removeItem(id) {
  cart = cart.filter(p => p.id !== id);
  saveCart();
  location.reload();
}

// Checkout form with payment simulation
if (document.getElementById('checkoutForm')) {
  document.getElementById('checkoutForm').addEventListener('submit', e => {
    e.preventDefault();
    const paymentMethod = document.querySelector('input[name="payment"]:checked');
    if (!paymentMethod) {
      showToast("Please select a payment method!");
      return;
    }
    document.getElementById('orderResponse').textContent =
      `✅ Payment via ${paymentMethod.value} successful! Order placed.`;
    localStorage.removeItem('cart');
  });
}

// Toast notification with animation
function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.className = "toast";
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.right = '20px';
  toast.style.background = '#2874f0';
  toast.style.color = '#fff';
  toast.style.padding = '10px 20px';
  toast.style.borderRadius = '8px';
  toast.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.5s ease-in-out';
  document.body.appendChild(toast);
  setTimeout(() => toast.style.opacity = '1', 50);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}
