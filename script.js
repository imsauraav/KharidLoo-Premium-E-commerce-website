document.addEventListener("DOMContentLoaded", function(){
  const navItems = document.querySelectorAll('.nav-item');
  const products = document.querySelectorAll('.product-card');
  const hero = document.querySelector('.hero');
  const addCartBtns = document.querySelectorAll('.add-cart');
  const themeToggle = document.getElementById('theme-toggle');
  const cartBtn = document.getElementById('cart-btn');
  const cartSidebar = document.getElementById('cart');
  const closeCartBtn = document.getElementById('close-cart');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout');
  const cartCountBadge = document.getElementById('cart-count');

  // Initialize cart
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function updateCartBadge(){
    const totalQty = cart.reduce((sum,i)=>sum+i.qty,0);
    cartCountBadge.innerText = totalQty;
  }

  function renderCart(){
    cartItemsContainer.innerHTML = '';
    if(cart.length===0){
      cartItemsContainer.innerHTML='<p class="empty">Your cart is empty.</p>';
      cartTotalEl.innerText='₹0';
      return;
    }
    let total = 0;
    cart.forEach((item,index)=>{
      total += item.price * item.qty;
      const div = document.createElement('div');
      div.className='cart-item';
      div.innerHTML = `
        <div class="info">
          <p><strong>${item.name}</strong></p>
          <p>₹${item.price} x ${item.qty} = ₹${item.price*item.qty}</p>
        </div>
        <button data-index="${index}">Remove</button>
      `;
      cartItemsContainer.appendChild(div);

      div.querySelector('button').addEventListener('click', (e)=>{
        const i = e.target.dataset.index;
        cart.splice(i,1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartBadge();
      });
    });
    cartTotalEl.innerText=`₹${total}`;
  }

  renderCart();
  updateCartBadge();


  navItems.forEach(item=>{
    item.addEventListener('click', ()=>{
      navItems.forEach(i=>i.classList.remove('active'));
      item.classList.add('active');
      const category = item.dataset.category;
      products.forEach(p=>{
        if(category==='all' || p.dataset.category===category) p.style.display='block';
        else p.style.display='none';
      });
      hero.style.display = category==='all' ? 'grid' : 'none';
    });
  });

  
  themeToggle.addEventListener('click', ()=>{
    document.body.classList.toggle('light');
    document.body.classList.toggle('dark');
    themeToggle.innerHTML = document.body.classList.contains('light')
      ? '<i class="ri-sun-line"></i>'
      : '<i class="ri-moon-line"></i>';
  });

  
  addCartBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const card = btn.parentElement;
      const id = card.dataset.id;
      const name = card.querySelector('h3').innerText;
      const price = parseInt(card.querySelector('p').innerText.replace('₹','').replace(',',''));
      const existing = cart.find(i=>i.id===id);
      if(existing) existing.qty++;
      else cart.push({id,name,price,qty:1});
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
      updateCartBadge();
      cartSidebar.classList.add('open'); 
    });
  });


  cartBtn.addEventListener('click', ()=> cartSidebar.classList.add('open'));
  closeCartBtn.addEventListener('click', ()=> cartSidebar.classList.remove('open'));

 
  checkoutBtn.addEventListener('click', ()=>{
    if(cart.length===0) alert("Cart is empty!");
    else {
      alert("Thank you for your purchase!");
      cart=[];
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
      updateCartBadge();
      cartSidebar.classList.remove('open');
    }
  });
});




const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});
