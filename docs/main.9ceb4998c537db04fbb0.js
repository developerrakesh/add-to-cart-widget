(()=>{"use strict";var t={977:(t,e,n)=>{n(858),n(805),n(287);function a(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}const o=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.main=document.querySelector(".main"),this.getData()}var e,n,o;return e=t,(n=[{key:"populateDisplay",value:function(t,e,n){var a="not-last";e==n-1&&(a="last"),this.main.insertAdjacentHTML("beforeend",'\n            <div class="item '.concat(a,'">\n                <img src="').concat(t.image,'" alt="').concat(t.name,'">\n                <p class="disPer">').concat(t.discount,'% off</p>\n                <div>\n                    <p class="name">').concat(t.name,'</p>\n                    <p><span class="origPrice">$').concat(t.price.display,'</span> <span class="disPrice">$').concat(t.price.actual,'</span></p>\n                    <button class="addToCart" data-name="').concat(t.name,'" data-img="').concat(t.image,'" data-price="').concat(t.price.actual,'" data-discount="').concat(t.discount,'">Add to cart</button>\n                </div>\n            </div>\n        '))}},{key:"parseData",value:function(t){var e=this,n=t.items,a=n.length;n.forEach((function(t,n){e.populateDisplay(t,n,a)}))}},{key:"getData",value:function(){var t=this;fetch("./cart.json").then((function(t){if(t.ok)return t.json();console.log("Error")})).then((function(e){t.parseData(e)})).catch((function(t){return console.log(t)}))}}])&&a(e.prototype,n),o&&a(e,o),t}();function i(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}const r=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.main=document.querySelector(".main"),this.cart=document.querySelector(".cart"),this.header=document.querySelector(".site-header"),this.afterLoad(),this.removeCart=this.removeCart.bind(this),this.increaseQty=this.increaseQty.bind(this),this.decreaseQty=this.decreaseQty.bind(this)}var e,n,a;return e=t,(n=[{key:"removeMsg",value:function(){this.topMsg=document.querySelector(".msg"),this.topMsg.remove()}},{key:"showMsg",value:function(t){var e=this;this.header.insertAdjacentHTML("beforeend",'\n            <p class="msg">'.concat(t," is added to cart</p>\n        ")),setTimeout((function(){return e.removeMsg()}),1200)}},{key:"removeEvent",value:function(t,e,n){var a=new CustomEvent("itemRemoved",{detail:{quantity:t,price:e,discount:n}});this.cart.dispatchEvent(a)}},{key:"customEvent",value:function(t,e,n,a){var o=new CustomEvent("itemAdded",{detail:{product:t,quantity:e,price:n,discount:a}});this.cart.dispatchEvent(o)}},{key:"modifyEvent",value:function(t,e,n,a){var o=new CustomEvent("itemModified",{detail:{quantity:t,price:e,discount:n,increase:a}});this.cart.dispatchEvent(o)}},{key:"removeCart",value:function(t){var e=t.target.parentElement.parentElement.parentElement,n=parseInt(e.dataset.price),a=parseInt(e.dataset.discount),o=parseInt(e.querySelector(".qty").textContent);e.remove(),this.removeEvent(o,n,a)}},{key:"increaseQty",value:function(t){var e=t.target.previousElementSibling,n=t.target.parentElement.parentElement,a=parseInt(n.dataset.price),o=parseInt(n.dataset.discount),i=parseInt(e.textContent);i++,e.textContent=i,this.modifyEvent(i,a,o,!0)}},{key:"decreaseQty",value:function(t){var e=t.target.nextElementSibling,n=t.target.parentElement.parentElement,a=parseInt(n.dataset.price),o=parseInt(n.dataset.discount),i=parseInt(e.textContent);0==--i?e.parentElement.parentElement.remove():e.textContent=i,this.modifyEvent(i,a,o,!1)}},{key:"addToCart",value:function(t){var e=this,n=t.target.dataset.name,a=t.target.dataset.img,o=t.target.dataset.price,i=t.target.dataset.discount;this.cart.querySelector('[data-name="'.concat(n,'"]'))||(this.cart.insertAdjacentHTML("beforeend",'\n                <div class="cart-item" data-name="'.concat(n,'" data-price="').concat(o,'" data-discount="').concat(i,'">\n                    <div class="column column1">\n                        <img src="').concat(a,'" alt="item">\n                        <p>').concat(n,' <span class="close" data-name="').concat(n,'">x</span></p>\n                    </div>\n                    <div class="column column2">\n                        <span class="controlBtn minus">-</span>\n                        <p class="qty">').concat(1,'</p>\n                        <span class="controlBtn plus">+</span>\n                    </div>\n                    <p class="column">$<span class="price">').concat(o,"</span></p>\n                </div>\n            ")),this.closeBtns=this.cart.querySelectorAll(".close"),this.minusBtns=this.cart.querySelectorAll(".minus"),this.plusBtns=this.cart.querySelectorAll(".plus"),this.plusBtns.forEach((function(t){t.removeEventListener("click",e.increaseQty)})),this.minusBtns.forEach((function(t){t.removeEventListener("click",e.decreaseQty)})),this.showMsg(n),this.customEvent(n,1,o,i),this.closeBtns.forEach((function(t){t.addEventListener("click",e.removeCart)})),this.plusBtns.forEach((function(t){t.addEventListener("click",e.increaseQty)})),this.minusBtns.forEach((function(t){t.addEventListener("click",e.decreaseQty)})))}},{key:"event",value:function(){var t=this;this.cartBtns=document.querySelectorAll(".addToCart"),this.cartBtns.forEach((function(e){e.addEventListener("click",(function(e){return t.addToCart(e)}))}))}},{key:"afterLoad",value:function(){var t=this,e=setInterval((function(){t.main.querySelector(".last")&&(clearInterval(e),t.event())}),50)}}])&&i(e.prototype,n),a&&i(e,a),t}();function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function s(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function l(t,e){return(l=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function u(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,a=p(t);if(e){var o=p(this).constructor;n=Reflect.construct(a,arguments,o)}else n=a.apply(this,arguments);return d(this,n)}}function d(t,e){return!e||"object"!==c(e)&&"function"!=typeof e?h(t):e}function h(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function p(t){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}const f=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&l(t,e)}(i,t);var e,n,a,o=u(i);function i(){var t;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),(t=o.call(this)).cart=document.querySelector(".cart"),t.totalItemsTag=document.querySelector(".totalItems"),t.totalPriceTag=document.querySelector(".totalPrice"),t.discountTag=document.querySelector(".discount"),t.grandTotalTag=document.querySelector(".grandTotal"),t.totalItems=0,t.totalPrice=0,t.totalDiscount=0,t.grandTotal=0,t.addEvent=t.addEvent.bind(h(t)),t.updateTotalItems=t.updateTotalItems.bind(h(t)),t.removeItem=t.removeItem.bind(h(t)),t}return e=i,(n=[{key:"addEvent",value:function(t){this.totalItems+=t.detail.quantity,this.totalPrice+=parseInt(t.detail.price),this.totalDiscount+=parseInt(t.detail.discount)*parseInt(t.detail.price)/100,this.grandTotal=this.totalPrice-this.totalDiscount,this.totalItemsTag.textContent=this.totalItems,this.totalPriceTag.textContent=this.totalPrice,this.discountTag.textContent=this.totalDiscount.toFixed(2),this.grandTotalTag.textContent=this.grandTotal.toFixed(2)}},{key:"updateTotalItems",value:function(t){t.detail.quantity;var e=t.detail.discount*t.detail.price/100;t.detail.increase?(this.totalItems++,this.totalPrice+=t.detail.price,this.totalDiscount+=e):(this.totalItems--,this.totalPrice-=t.detail.price,this.totalDiscount-=e),this.grandTotal=this.totalPrice-this.totalDiscount,this.totalItemsTag.textContent=this.totalItems,this.totalPriceTag.textContent=this.totalPrice.toFixed(2),this.discountTag.textContent=this.totalDiscount.toFixed(2),this.grandTotalTag.textContent=this.grandTotal.toFixed(2)}},{key:"removeItem",value:function(t){var e=t.detail.quantity,n=t.detail.discount*t.detail.price/100;this.totalItems-=e,this.totalPrice=this.totalPrice-e*t.detail.price,this.totalDiscount=this.totalDiscount-e*n,this.grandTotal=Math.abs(this.totalPrice-this.totalDiscount),this.totalItemsTag.textContent=this.totalItems,this.totalPriceTag.textContent=this.totalPrice.toFixed(2),this.discountTag.textContent=this.totalDiscount.toFixed(2),this.grandTotalTag.textContent=this.grandTotal.toFixed(2)}},{key:"event",value:function(){this.cart.addEventListener("itemAdded",this.addEvent),this.cart.addEventListener("itemModified",this.updateTotalItems),this.cart.addEventListener("itemRemoved",this.removeItem)}}])&&s(e.prototype,n),a&&s(e,a),i}(r);new o,new r,new f}},e={};function n(a){if(e[a])return e[a].exports;var o=e[a]={exports:{}};return t[a](o,o.exports,n),o.exports}n.m=t,n.x=t=>{},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={179:0},e=[[977,280]],a=t=>{},o=(o,i)=>{for(var r,c,[s,l,u,d]=i,h=0,p=[];h<s.length;h++)c=s[h],n.o(t,c)&&t[c]&&p.push(t[c][0]),t[c]=0;for(r in l)n.o(l,r)&&(n.m[r]=l[r]);for(u&&u(n),o&&o(i);p.length;)p.shift()();return d&&e.push.apply(e,d),a()},i=self.webpackChunkpahaditravels=self.webpackChunkpahaditravels||[];function r(){for(var a,o=0;o<e.length;o++){for(var i=e[o],r=!0,c=1;c<i.length;c++){var s=i[c];0!==t[s]&&(r=!1)}r&&(e.splice(o--,1),a=n(n.s=i[0]))}return 0===e.length&&(n.x(),n.x=t=>{}),a}i.forEach(o.bind(null,0)),i.push=o.bind(null,i.push.bind(i));var c=n.x;n.x=()=>(n.x=c||(t=>{}),(a=r)())})(),n.x()})();