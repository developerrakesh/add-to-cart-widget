//For total price calculation
import Cart from "./Cart";

class Total extends Cart {
    constructor() {
        super(); 
        this.cart = document.querySelector('.cart');
        this.addEvent = this.addEvent.bind(this);
        this.totalItemsTag = document.querySelector('.totalItems');
        this.totalPriceTag = document.querySelector('.totalPrice');
        this.discountTag = document.querySelector('.discount');
        this.grandTotalTag = document.querySelector('.grandTotal');
        this.totalItems = 0;
        this.totalPrice = 0;
        this.totalDiscount = 0;
        this.grandTotal = 0;
    }

    addTotalItems(detail) {
        this.totalItems += detail.quantity;
        this.totalPrice += parseInt(detail.price);
        this.totalDiscount += ((parseInt(detail.discount) * parseInt(detail.price))/100);
        this.grandTotal = this.totalPrice - this.totalDiscount;
        this.totalItemsTag.textContent = this.totalItems;
        this.totalPriceTag.textContent = this.totalPrice;
        this.discountTag.textContent = this.totalDiscount.toFixed(2);
        this.grandTotalTag.textContent = this.grandTotal.toFixed(2);
    }

    updateTotalItems(param) {
        console.log(param.quantity);
        this.totalItems -= parseInt(param.quantity);
        this.totalItemsTag.textContent = this.totalItems;
    }

    addEvent(evt) {
        this.addTotalItems(evt.detail);
    }

    event() {
        this.cart.addEventListener('itemAdded', this.addEvent);
    }
}

export default Total;