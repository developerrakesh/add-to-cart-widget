//add/update/delete items in the cart section
class Cart {
    constructor() {
        this.cart = document.querySelector('.cart');
        this.header = document.querySelector('.site-header');
        setTimeout(() => this.event(), 200);
        this.removeCart = this.removeCart.bind(this);
        this.increaseQty = this.increaseQty.bind(this);
        this.decreaseQty = this.decreaseQty.bind(this);
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

    removeEvent(qty, price, discount) {
        const event = new CustomEvent('itemRemoved', {
            detail: {
                quantity: qty,
                price: price,
                discount: discount
            }
        });
        this.cart.dispatchEvent(event);
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

    modifyEvent(qty, price, discount, bool) {
        const event = new CustomEvent('itemModified', {
            detail: {
                quantity: qty,
                price: price,
                discount: discount,
                increase: bool
            }
        });
        this.cart.dispatchEvent(event);
    }

    removeCart(evt) {
        let cart = evt.target.parentElement.parentElement.parentElement;
        let price = parseInt(cart.dataset.price);
        let discount = parseInt(cart.dataset.discount);
        let qty = parseInt(cart.querySelector('.qty').textContent);
        cart.remove();
        this.removeEvent(qty, price, discount);
    }

    increaseQty(evt) {
        let qtyBox = evt.target.previousElementSibling;
        let cart = evt.target.parentElement.parentElement;
        let price = parseInt(cart.dataset.price);
        let discount = parseInt(cart.dataset.discount);
        let qty = parseInt(qtyBox.textContent);
        qty++;
        qtyBox.textContent = qty;
        this.modifyEvent(qty, price, discount, true);
    }

    decreaseQty(evt) {
        let qtyBox = evt.target.nextElementSibling;
        let cart = evt.target.parentElement.parentElement;
        let price = parseInt(cart.dataset.price);
        let discount = parseInt(cart.dataset.discount);
        let qty = parseInt(qtyBox.textContent);
        qty--;
        if(qty === 0) {
            qtyBox.parentElement.parentElement.remove();
        } else {
            qtyBox.textContent = qty;
        }
        this.modifyEvent(qty, price, discount, false);
    }
    addToCart(evt) {
        let item = evt.target.dataset.name;
        let imgSrc = evt.target.dataset.img;
        let price = evt.target.dataset.price;
        let discount = evt.target.dataset.discount;
        let quantitiy = 1;
        let checkCartItem = this.cart.querySelector(`[data-name="${item}"]`);
        if(!checkCartItem) {
            this.cart.insertAdjacentHTML('beforeend', `
                <div class="cart-item" data-name="${item}" data-price="${price}" data-discount="${discount}">
                    <div class="column column1">
                        <img src="${imgSrc}" alt="item">
                        <p>${item} <span class="close" data-name="${item}">x</span></p>
                    </div>
                    <div class="column column2">
                        <span class="controlBtn minus">-</span>
                        <p class="qty">${quantitiy}</p>
                        <span class="controlBtn plus">+</span>
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
                btn.removeEventListener('click', this.decreaseQty);
            });
            this.showMsg(item);
            this.customEvent(item, quantitiy, price, discount);
            this.closeBtns.forEach(btn => {
                btn.addEventListener('click', this.removeCart);
            });
            this.plusBtns.forEach(btn => {
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