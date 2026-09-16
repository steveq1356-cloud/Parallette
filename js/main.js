/* FORM — Portable Parallettes v2 — main.js */

let currentSize = '5.5';
let currentPrice = 22.00;
let currentColor = 'Obsidian';
let currentImg = 'images/black.png';
let currentQty = 1;
const SHIPPING = 9.00;

function fmt(n) { return '$' + n.toFixed(2); }

function updateUI() {
  const subtotal = currentPrice * currentQty;
  const total = subtotal + SHIPPING;

  document.getElementById('subtotal').textContent = fmt(subtotal);
  document.getElementById('shipping-cost').textContent = fmt(SHIPPING);
  document.getElementById('total-price').textContent = fmt(total);
  document.getElementById('config-badge').textContent = currentSize + '" · ' + currentColor;

  // modal cart step
  document.getElementById('cart-item-name').textContent = currentSize + '" · ' + currentColor;
  document.getElementById('cart-item-qty').textContent = 'Qty: ' + currentQty + ' pair' + (currentQty > 1 ? 's' : '');
  document.getElementById('cart-item-price-display').textContent = fmt(subtotal);
  document.getElementById('cart-item-img').src = currentImg;
  document.getElementById('cs-subtotal').textContent = fmt(subtotal);
  document.getElementById('cs-total').textContent = fmt(total);
  document.getElementById('modal-total-display').textContent = fmt(total);
}

function selectSize(btn) {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentSize = btn.dataset.size;
  currentPrice = parseFloat(btn.dataset.price);
  updateUI();
}

function selectColor(btn) {
  document.querySelectorAll('.color-btn').forEach(b => {
    b.classList.remove('active');
    const chk = b.querySelector('.color-check');
    if (chk) chk.style.display = 'none';
  });
  btn.classList.add('active');
  const chk = btn.querySelector('.color-check');
  if (chk) chk.style.display = 'block';
  currentColor = btn.dataset.color;
  currentImg = btn.dataset.img;
  document.getElementById('color-name-display').textContent = currentColor;

  const preview = document.getElementById('config-preview');
  preview.style.opacity = '0';
  setTimeout(() => { preview.src = currentImg; preview.style.opacity = '1'; }, 200);

  updateUI();
}

function changeQty(delta) {
  currentQty = Math.max(1, currentQty + delta);
  document.getElementById('qty-display').textContent = currentQty;
  updateUI();
}

function addToCart() {
  const toast = document.getElementById('cart-toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

function goToStep(id) {
  ['step-cart', 'step-shipping', 'step-payment'].forEach(s => {
    document.getElementById(s).style.display = s === id ? 'block' : 'none';
  });
}

function openCheckout() {
  updateUI();
  goToStep('step-cart');
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function submitOrder() {
  closeCheckout();
  setTimeout(() => {
    const overlay = document.getElementById('success-overlay');
    overlay.style.display = 'flex';
    setTimeout(() => overlay.classList.add('open'), 10);
  }, 200);
}

function closeSuccess() {
  const overlay = document.getElementById('success-overlay');
  overlay.classList.remove('open');
  setTimeout(() => { overlay.style.display = 'none'; }, 300);
  document.body.style.overflow = '';
}

function formatCard(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = v.replace(/(.{4})/g, '$1 ').trim();
}

/* Nav scroll effect */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  nav.style.borderBottomColor = window.scrollY > 60 ? 'rgba(51,51,51,0.8)' : 'var(--border)';
});

/* Fade-in on scroll */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.feature-item, .testimonial, .stat, .showcase-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
  updateUI();
});
