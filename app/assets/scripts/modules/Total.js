//For total price calculation
import Cart from "./Cart";

class Total extends Cart {
    constructor() {
        super(); 
        this.cart = document.querySelector('.cart');
        this.totalItemsTag = document.querySelector('.totalItems');
        this.totalPriceTag = document.querySelector('.totalPrice');
        this.discountTag = document.querySelector('.discount');
        this.grandTotalTag = document.querySelector('.grandTotal');
        this.totalItems = 0;
        this.totalPrice = 0;
        this.totalDiscount = 0;
        this.grandTotal = 0;
        this.addEvent = this.addEvent.bind(this);
        this.updateTotalItems = this.updateTotalItems.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    addEvent(param) {
        this.totalItems += param.detail.quantity;
        this.totalPrice += parseInt(param.detail.price);
        this.totalDiscount += ((parseInt(param.detail.discount) * parseInt(param.detail.price))/100);
        this.grandTotal = this.totalPrice - this.totalDiscount;
        this.totalItemsTag.textContent = this.totalItems;
        this.totalPriceTag.textContent = this.totalPrice;
        this.discountTag.textContent = this.totalDiscount.toFixed(2);
        this.grandTotalTag.textContent = this.grandTotal.toFixed(2);
    }

    updateTotalItems(param) {
        let qty = param.detail.quantity;
        let discount = (param.detail.discount*param.detail.price)/100;
        if(param.detail.increase) {
            this.totalItems++;
            this.totalPrice += param.detail.price;
            this.totalDiscount += discount;
        } else {
            this.totalItems--;
            this.totalPrice -= param.detail.price;
            this.totalDiscount -= discount;
        }
        this.grandTotal = this.totalPrice - this.totalDiscount;
        this.totalItemsTag.textContent = this.totalItems;
        this.totalPriceTag.textContent = this.totalPrice.toFixed(2);
        this.discountTag.textContent = this.totalDiscount.toFixed(2);
        this.grandTotalTag.textContent = this.grandTotal.toFixed(2);
    }

    removeItem(param) {
        let qty = param.detail.quantity;
        let discount = (param.detail.discount*param.detail.price)/100;
        this.totalItems -= qty;
        this.totalPrice = this.totalPrice - qty*param.detail.price;
        this.totalDiscount = this.totalDiscount - qty*discount;
        this.grandTotal = Math.abs(this.totalPrice - this.totalDiscount);
        this.totalItemsTag.textContent = this.totalItems;
        this.totalPriceTag.textContent = this.totalPrice.toFixed(2);
        this.discountTag.textContent = this.totalDiscount.toFixed(2);
        this.grandTotalTag.textContent = this.grandTotal.toFixed(2);
    }

    event() {
        //listen to events happening in cart
        this.cart.addEventListener('itemAdded', this.addEvent);
        this.cart.addEventListener('itemModified', this.updateTotalItems);
        this.cart.addEventListener('itemRemoved', this.removeItem);
    }
}

export default Total;