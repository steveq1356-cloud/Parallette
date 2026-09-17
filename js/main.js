var currentSize='Compact',currentPrice=22.00,currentColor='Pearl';
var currentImgCompact='images/white.png',currentImgLong='images/white-long.png';
var currentQty=1,shippingCost=6,shippingLabel='Standard shipping';
var discountPct=0,promoApplied=false,cartCount=0;
var PROMOS={'FORM10':10,'FORM20':20,'SAVE15':15};

function f(n){return '$'+Math.abs(n).toFixed(2)}
function currentImg(){return currentSize==='Extra Long'?currentImgLong:currentImgCompact}
function subtotal(){return currentPrice*currentQty}
function discountAmt(){return subtotal()*discountPct}
function total(){return subtotal()-discountAmt()+shippingCost}

function updateUI(){
  var sub=subtotal(),disc=discountAmt(),tot=subtotal()-disc;
  document.getElementById('price-line-val').textContent=f(sub);
  document.getElementById('config-badge').textContent=currentSize+' \u00b7 '+currentColor;
  document.getElementById('config-preview').src=currentImg();
  document.getElementById('cart-item-name').textContent=currentSize+' \u00b7 '+currentColor;
  document.getElementById('cart-item-qty').textContent='Qty: '+currentQty+' pair'+(currentQty>1?'s':'');
  document.getElementById('cart-item-price-display').textContent=f(sub);
  document.getElementById('cart-item-img').src=currentImg();
  document.getElementById('cs-subtotal').textContent=f(sub);
  document.getElementById('cs-total').textContent=f(tot);
  var dcRow=document.getElementById('discount-row-cart');
  if(discountPct>0){dcRow.style.display='flex';document.getElementById('cs-discount').textContent='-'+f(disc)+' ('+Math.round(discountPct*100)+'% off)'}
  else{dcRow.style.display='none'}
  var fullTot=tot+shippingCost;
  document.getElementById('pay-subtotal').textContent=f(sub);
  document.getElementById('pay-item-label').textContent=currentQty+'\u00d7 '+currentSize+' \u00b7 '+currentColor;
  document.getElementById('pay-shipping').textContent=f(shippingCost);
  document.getElementById('pay-ship-label').textContent=shippingLabel;
  document.getElementById('modal-total-display').textContent=f(fullTot);
  document.getElementById('btn-total').textContent=f(fullTot);
  var pdr=document.getElementById('pay-discount-row');
  if(discountPct>0){pdr.style.display='flex';document.getElementById('pay-discount').textContent='-'+f(disc)}
  else{pdr.style.display='none'}
}

function selectSize(btn){
  document.querySelectorAll('.size-btn').forEach(function(b){b.classList.remove('active')});
  btn.classList.add('active');
  currentSize=btn.getAttribute('data-size');
  currentPrice=parseFloat(btn.getAttribute('data-price'));
  document.getElementById('config-preview').src=currentImg();
  updateUI();
}

function selectColor(btn){
  document.querySelectorAll('.color-btn').forEach(function(b){b.classList.remove('active')});
  btn.classList.add('active');
  currentColor=btn.getAttribute('data-color');
  currentImgCompact=btn.getAttribute('data-img-compact');
  currentImgLong=btn.getAttribute('data-img-long');
  document.getElementById('color-name-display').textContent=currentColor;
  document.getElementById('config-preview').src=currentImg();
  updateUI();
}

function changeQty(delta){
  currentQty=Math.max(1,currentQty+delta);
  document.getElementById('qty-display').textContent=currentQty;
  updateUI();
}

function addToCart(){
  cartCount+=currentQty;
  var cnt=document.getElementById('cart-count');
  cnt.textContent=cartCount;
  cnt.style.display='flex';
  var t=document.getElementById('cart-toast');
  t.classList.add('show');
  setTimeout(function(){t.classList.remove('show')},2200);
}

function applyPromo(){
  var code=document.getElementById('promo-input').value.trim().toUpperCase();
  var msg=document.getElementById('promo-msg');
  if(promoApplied){msg.textContent='A code is already applied.';msg.className='promo-msg err';return}
  if(!code){msg.textContent='Enter a code first.';msg.className='promo-msg err';return}
  if(PROMOS[code]!==undefined){
    discountPct=PROMOS[code]/100;promoApplied=true;
    msg.textContent=PROMOS[code]+'% discount applied!';msg.className='promo-msg ok';
    updateUI();
  }else{msg.textContent='Code not recognised.';msg.className='promo-msg err'}
}

function selectShipping(el,cost,label){
  document.querySelectorAll('.shipping-option').forEach(function(o){
    o.classList.remove('active-option');
    var r=o.querySelector('.ship-radio');
    if(r){r.classList.remove('active-radio')}
  });
  el.classList.add('active-option');
  var r=el.querySelector('.ship-radio');
  if(r)r.classList.add('active-radio');
  shippingCost=cost;shippingLabel=label;
  updateUI();
}

function goToStep(n){
  document.getElementById('step-cart').style.display=n===1?'block':'none';
  document.getElementById('step-shipping').style.display=n===2?'block':'none';
  document.getElementById('step-payment').style.display=n===3?'block':'none';
  for(var i=1;i<=3;i++){
    var dot=document.getElementById('dot-'+i);
    var lbl=document.getElementById('slabel-'+i);
    dot.classList.remove('active','done');
    lbl.classList.remove('active');
    if(i===n){dot.classList.add('active');lbl.classList.add('active')}
    else if(i<n){dot.classList.add('done')}
  }
  updateUI();
}

function toggleBilling(){
  var checked=document.getElementById('same-as-shipping').checked;
  document.getElementById('billing-fields').style.display=checked?'none':'block';
}

function openCheckout(){
  updateUI();goToStep(1);
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeCheckout(){
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow='';
}
function submitOrder(){
  closeCheckout();
  var o=document.getElementById('success-overlay');
  o.style.display='flex';o.classList.add('open');
}
function closeSuccess(){
  var o=document.getElementById('success-overlay');
  o.classList.remove('open');o.style.display='none';
  document.body.style.overflow='';
}
function formatCard(input){
  var v=input.value.replace(/\D/g,'').substring(0,16);
  input.value=v.replace(/(.{4})/g,'$1 ').trim();
}
function formatExp(input){
  var v=input.value.replace(/\D/g,'').substring(0,4);
  if(v.length>=3)v=v.substring(0,2)+' / '+v.substring(2);
  input.value=v;
}

function closePromoToast(){
  document.getElementById('promo-toast').classList.remove('show');
}

window.addEventListener('scroll',function(){
  var nav=document.querySelector('.nav');
  if(nav)nav.style.borderBottomColor=window.scrollY>60?'rgba(51,51,51,0.8)':'var(--border)';
});

document.addEventListener('DOMContentLoaded',function(){
  updateUI();
  setTimeout(function(){
    document.getElementById('promo-toast').classList.add('show');
  },8000);
});
