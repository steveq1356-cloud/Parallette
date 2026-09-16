/* FORM — Portable Parallettes — main.js */

var currentSize = '5.5';
var currentPrice = 22.00;
var currentColor = 'Pearl';
var currentImg = 'images/white.png';
var currentQty = 1;
var shippingCost = 9.00;
var shippingLabel = 'Standard (5–7 days)';
var discountPct = 0;
var promoApplied = false;

function fmt(n) { return '$' + n.toFixed(2); }

function getTotal() {
  var sub = currentPrice * currentQty;
  var discount = sub * discountPct;
  return sub - discount + shippingCost;
}

function updateUI() {
  var sub = currentPrice * currentQty;
  var total = getTotal();

  document.getElementById('subtotal').textContent = fmt(sub);
  document.getElementById('shipping-cost').textContent = fmt(shippingCost);
  document.getElementById('total-price').textContent = fmt(total);
  document.getElementById('config-badge').textContent = currentSize + '" \u00b7 ' + currentColor;

  document.getElementById('cart-item-name').textContent = currentSize + '" \u00b7 ' + currentColor;
  document.getElementById('cart-item-qty').textContent = 'Qty: ' + currentQty + ' pair' + (currentQty > 1 ? 's' : '');
  document.getElementById('cart-item-price-display').textContent = fmt(sub);
  document.getElementById('cart-item-img').src = currentImg;
  document.getElementById('cs-subtotal').textContent = fmt(sub);
  document.getElementById('cs-total').textContent = fmt(total);

  document.getElementById('pay-subtotal').textContent = fmt(sub);
  document.getElementById('pay-shipping').textContent = fmt(shippingCost);
  document.getElementById('pay-ship-label').textContent = shippingLabel;
  document.getElementById('modal-total-display').textContent = fmt(total);
  document.getElementById('btn-total').textContent = fmt(total);

  var discRow = document.getElementById('discount-row');
  if (discountPct > 0) {
    discRow.style.display = 'flex';
    document.getElementById('pay-discount').textContent = '-' + fmt(sub * discountPct) + ' (' + Math.round(discountPct*100) + '% off)';
  } else {
    discRow.style.display = 'none';
  }
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

function applyPromo() {
  var code = document.getElementById('promo-input').value.trim().toUpperCase();
  var msg = document.getElementById('promo-msg');
  if (promoApplied) { msg.textContent = 'A promo code is already applied.'; msg.className = 'promo-msg error'; return; }
  if (code === 'FORM10') {
    discountPct = 0.10;
    promoApplied = true;
    msg.textContent = '10% discount applied!';
    msg.className = 'promo-msg success';
    updateUI();
  } else if (code === '') {
    msg.textContent = 'Please enter a code.';
    msg.className = 'promo-msg error';
  } else {
    msg.textContent = 'Code not recognised.';
    msg.className = 'promo-msg error';
  }
}

function selectShipping(el, cost, label) {
  var opts = document.querySelectorAll('.shipping-option');
  for (var i = 0; i < opts.length; i++) opts[i].classList.remove('active-option');
  el.classList.add('active-option');
  shippingCost = cost;
  shippingLabel = label;
  updateUI();
}

function goToStep(n) {
  document.getElementById('step-cart').style.display = n === 1 ? 'block' : 'none';
  document.getElementById('step-shipping').style.display = n === 2 ? 'block' : 'none';
  document.getElementById('step-payment').style.display = n === 3 ? 'block' : 'none';
  for (var i = 1; i <= 3; i++) {
    var dot = document.getElementById('dot-' + i);
    dot.classList.remove('active', 'done');
    if (i === n) dot.classList.add('active');
    else if (i < n) dot.classList.add('done');
  }
  updateUI();
}

function openCheckout() {
  updateUI();
  goToStep(1);
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

function formatExp(input) {
  var v = input.value.replace(/\D/g, '').substring(0, 4);
  if (v.length >= 3) v = v.substring(0,2) + ' / ' + v.substring(2);
  input.value = v;
}

/* Email popup */
function closePopup() {
  var overlay = document.getElementById('popup-overlay');
  overlay.classList.remove('open');
  overlay.style.display = 'none';
}

function submitPopup() {
  var email = document.getElementById('popup-email').value.trim();
  if (!email || email.indexOf('@') === -1) {
    document.getElementById('popup-email').style.borderColor = '#e07070';
    return;
  }
  document.getElementById('popup-form').style.display = 'none';
  document.getElementById('popup-success').style.display = 'block';
}

window.addEventListener('scroll', function() {
  var nav = document.querySelector('.nav');
  nav.style.borderBottomColor = window.scrollY > 60 ? 'rgba(51,51,51,0.8)' : 'var(--border)';
});

document.addEventListener('DOMContentLoaded', function() {
  updateUI();
  // Show popup after 8 seconds
  setTimeout(function() {
    var overlay = document.getElementById('popup-overlay');
    overlay.style.display = 'flex';
    setTimeout(function() { overlay.classList.add('open'); }, 10);
  }, 8000);
});
