//to populate the browser with all the items from cart.json initially
class DisplayItems {
    constructor() {
        this.main = document.querySelector('.main');
        this.getData();  
    }

    populateDisplay(item, index, length) {
        let last = 'not-last';
        if(index == length-1) {
            last = 'last';
        }
        this.main.insertAdjacentHTML('beforeend', `
            <div class="item ${last}">
                <img src="${item.image}" alt="${item.name}">
                <p class="disPer">${item.discount}% off</p>
                <div>
                    <p class="name">${item.name}</p>
                    <p><span class="origPrice">$${item.price.display}</span> <span class="disPrice">$${item.price.actual}</span></p>
                    <button class="addToCart" data-name="${item.name}" data-img="${item.image}" data-price="${item.price.actual}" data-discount="${item.discount}">Add to cart</button>
                </div>
            </div>
        `);
    }

    parseData(data) {
        let itemsArr = data.items;
        let length = itemsArr.length;
        itemsArr.forEach((item, index) => {
            this.populateDisplay(item, index, length);
        });
    }
    getData() {
        fetch('./cart.json').then(res => {
            if(res.ok) {
               return res.json();
            } else {
                console.log('Error');
            }
        }).then(data => {
            this.parseData(data);
        }).catch(err => console.log(err));
    }
}

export default DisplayItems;