/* FORM — Portable Parallettes — main.js */

let currentSize = '5.5';
let currentPrice = 22.00;
let currentColor = 'Obsidian';
let currentImg = 'images/black.png';
let currentQty = 1;
const SHIPPING = 9.00;

function fmt(n) { return '$' + n.toFixed(2); }

function updateUI() {
  var subtotal = currentPrice * currentQty;
  var total = subtotal + SHIPPING;

  document.getElementById('subtotal').textContent = fmt(subtotal);
  document.getElementById('shipping-cost').textContent = fmt(SHIPPING);
  document.getElementById('total-price').textContent = fmt(total);
  document.getElementById('config-badge').textContent = currentSize + '" \u00b7 ' + currentColor;

  document.getElementById('cart-item-name').textContent = currentSize + '" \u00b7 ' + currentColor;
  document.getElementById('cart-item-qty').textContent = 'Qty: ' + currentQty + ' pair' + (currentQty > 1 ? 's' : '');
  document.getElementById('cart-item-price-display').textContent = fmt(subtotal);
  document.getElementById('cart-item-img').src = currentImg;
  document.getElementById('cs-subtotal').textContent = fmt(subtotal);
  document.getElementById('cs-total').textContent = fmt(total);
  document.getElementById('modal-total-display').textContent = fmt(total);
}

function selectSize(btn) {
  var btns = document.querySelectorAll('.size-btn');
  for (var i = 0; i < btns.length; i++) btns[i].classList.remove('active');
  btn.classList.add('active');
  currentSize = btn.getAttribute('data-size');
  currentPrice = parseFloat(btn.getAttribute('data-price'));
  updateUI();
}

function selectColor(btn) {
  var btns = document.querySelectorAll('.color-btn');
  for (var i = 0; i < btns.length; i++) btns[i].classList.remove('active');
  btn.classList.add('active');

  currentColor = btn.getAttribute('data-color');
  currentImg = btn.getAttribute('data-img');

  document.getElementById('color-name-display').textContent = currentColor;
  document.getElementById('config-preview').src = currentImg;

  updateUI();
}

function changeQty(delta) {
  currentQty = Math.max(1, currentQty + delta);
  document.getElementById('qty-display').textContent = currentQty;
  updateUI();
}

function addToCart() {
  var toast = document.getElementById('cart-toast');
  toast.classList.add('show');
  setTimeout(function() { toast.classList.remove('show'); }, 2200);
}

function goToStep(id) {
  var steps = ['step-cart', 'step-shipping', 'step-payment'];
  for (var i = 0; i < steps.length; i++) {
    document.getElementById(steps[i]).style.display = steps[i] === id ? 'block' : 'none';
  }
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
  var overlay = document.getElementById('success-overlay');
  overlay.style.display = 'flex';
  overlay.classList.add('open');
}

function closeSuccess() {
  var overlay = document.getElementById('success-overlay');
  overlay.classList.remove('open');
  overlay.style.display = 'none';
  document.body.style.overflow = '';
}

function formatCard(input) {
  var v = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = v.replace(/(.{4})/g, '$1 ').trim();
}

window.addEventListener('scroll', function() {
  var nav = document.querySelector('.nav');
  nav.style.borderBottomColor = window.scrollY > 60 ? 'rgba(51,51,51,0.8)' : 'var(--border)';
});

document.addEventListener('DOMContentLoaded', function() {
  updateUI();
});
