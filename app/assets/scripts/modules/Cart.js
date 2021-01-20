//add/update/delete items in the cart section
class Cart {
    constructor() {
        this.cart = document.querySelector('.cart');
        this.header = document.querySelector('.site-header');
        setTimeout(() => this.event(), 200);
    }

    removeMsg() {
        this.topMsg = document.querySelector('.msg');
        this.topMsg.remove();
    }

    showMsg(item) {
        this.header.insertAdjacentHTML('beforeend', `
            <p class="msg">${item} is added to cart</p>
        `);
        setTimeout(() => this.removeMsg(), 1500);
    }

    customEvent(item, qty, price, dis) {
        const event = new CustomEvent('itemAdded', {
            detail: {
                product: item,
                quantity: qty,
                price: price,
                discount: dis
            }
        });
        this.cart.dispatchEvent(event);
    }

    removeCart(evt) {
        let itemCart = evt.target.parentElement.parentElement.parentElement;
        itemCart.remove();
    }

    increaseQty(evt) {
        let qtyBox = evt.target.previousElementSibling;
        let qty = parseInt(qtyBox.textContent);
        qty++;
        qtyBox.textContent = qty;
    }

    decreaseQty(evt) {
        let qtyBox = evt.target.nextElementSibling;
        let qty = parseInt(qtyBox.textContent);
        qty--;
        if(qty === 0) {
            qtyBox.parentElement.parentElement.remove();
        } else {
            qtyBox.textContent = qty;
        }
    }
    addToCart(evt) {
        let item = evt.target.dataset.name;
        let imgSrc = evt.target.dataset.img;
        let price = evt.target.dataset.price;
        let discount = evt.target.dataset.discount;
        let quantitiy = 1;
        console.log(discount);
        let checkCartItem = this.cart.querySelector(`[data-name="${item}"]`);
        if(!checkCartItem) {
            this.cart.insertAdjacentHTML('beforeend', `
                <div class="cart-item" data-name="${item}">
                    <div class="column column1">
                        <img src="${imgSrc}" alt="item">
                        <p>${item} <span class="close" data-name="${item}">x</span></p>
                    </div>
                    <div class="column column2">
                        <span class="controlBtn minus">-</span>
                        <p class="qty">${quantitiy}</p>
                        <span class="controlBtn plus" data-n="${item}">+</span>
                    </div>
                    <p class="column">$<span class="price">${price}</span></p>
                </div>
            `);
            this.closeBtns = this.cart.querySelectorAll('.close');
            this.minusBtns = this.cart.querySelectorAll('.minus');
            this.plusBtns = this.cart.querySelectorAll('.plus');
            this.plusBtns.forEach(btn => {
                btn.removeEventListener('click', this.increaseQty);
            });
            this.minusBtns.forEach(btn => {
                btn.addEventListener('click', this.decreaseQty);
            });
            this.showMsg(item);
            this.customEvent(item, quantitiy, price, discount);
            this.closeBtns.forEach(btn => {
                btn.addEventListener('click', evt => this.removeCart(evt));
            });
            this.plusBtns.forEach(btn => {
                console.log('event listener');
                btn.addEventListener('click', this.increaseQty);
            });
            this.minusBtns.forEach(btn => {
                btn.addEventListener('click', this.decreaseQty);
            });
        }
    }
    event() {
        this.cartBtns = document.querySelectorAll('.addToCart');
        this.cartBtns.forEach(btn => {
            btn.addEventListener('click', evt => this.addToCart(evt));
        }); 
    }
}

export default Cart;