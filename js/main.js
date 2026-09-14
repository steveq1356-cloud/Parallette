/* FORM — Portable Parallettes — main.js */

let currentSize = '5.5';
let currentPrice = 22.00;
let currentColor = 'Obsidian';
let currentQty = 1;
const SHIPPING = 9.00;

function updateUI() {
  const subtotal = currentPrice * currentQty;
  const total = subtotal + SHIPPING;

  document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
  document.getElementById('shipping-cost').textContent = '$' + SHIPPING.toFixed(2);
  document.getElementById('total-price').textContent = '$' + total.toFixed(2);
  document.getElementById('config-badge').textContent = currentSize + '" · ' + currentColor;
  document.getElementById('modal-total-display').textContent = '$' + total.toFixed(2);
  document.getElementById('modal-order-summary').textContent =
    currentQty + '× ' + currentSize + '" · ' + currentColor + ' — $' + total.toFixed(2);
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
    b.querySelector('.color-check') && (b.querySelector('.color-check').style.display = 'none');
  });
  btn.classList.add('active');
  if (btn.querySelector('.color-check')) btn.querySelector('.color-check').style.display = 'block';
  currentColor = btn.dataset.color;
  document.getElementById('color-name-display').textContent = currentColor;
  updateUI();
}

function changeQty(delta) {
  currentQty = Math.max(1, currentQty + delta);
  document.getElementById('qty-display').textContent = currentQty;
  updateUI();
}

function openCheckout() {
  updateUI();
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function submitOrder(e) {
  e.preventDefault();
  closeCheckout();
  setTimeout(() => {
    document.getElementById('success-overlay').style.display = 'flex';
    setTimeout(() => document.getElementById('success-overlay').classList.add('open'), 10);
  }, 200);
}

function closeSuccess() {
  document.getElementById('success-overlay').classList.remove('open');
  setTimeout(() => {
    document.getElementById('success-overlay').style.display = 'none';
    document.body.style.overflow = '';
  }, 300);
}

function formatCard(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = v.replace(/(.{4})/g, '$1 ').trim();
}

/* Nav scroll effect */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 60) {
    nav.style.borderBottomColor = 'rgba(51,51,51,0.8)';
  } else {
    nav.style.borderBottomColor = 'var(--border)';
  }
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
  document.querySelectorAll('.feature-item, .testimonial, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
  updateUI();
});
