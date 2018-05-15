var shoppingBasket = (function () {
	
    var basket = [];

    function Item(name, price, count) {
        this.name = name
        this.price = price
        this.count = count
    }
	
	//saves
    function saveBasket() {
        sessionStorage.setItem("shoppingBasket", JSON.stringify(basket));
    }

    function loadBasket() {
        basket = JSON.parse(sessionStorage.getItem("shoppingBasket"));
        if (basket === null) {
            basket = []
        }
    }

    loadBasket();


    var obj = {};

	//adds an item
    obj.addItemToBasket = function (name, price, count) {
        for (var i in basket) {
            if (basket[i].name === name) {
                basket[i].count += count;
                saveBasket();
                return;
            }
        }

        console.log("addItemToBasket:", name, price, count);

        var item = new Item(name, price, count);
        basket.push(item);
        saveBasket();
    };

	//removes an item from cart
    obj.removeItemFromBasket = function (name) {
        for (var i in basket) {
            if (basket[i].name === name) {
                basket[i].count--;
                if (basket[i].count === 0) {
                    basket.splice(i, 1);
                }
                break;
            }
        }
        saveBasket();
    };

	//empties cart
    obj.clearBasket = function () {
        basket = [];
        saveBasket();
    }

	//shows amount of items in basket
    obj.countBasket = function () {
        var totalCount = 0;
        for (var i in basket) {
            totalCount += basket[i].count;
        }

        return totalCount;
    };
	
	//shows total cost
    obj.totalBasket = function () {
        var totalCost = 0;
        for (var i in basket) {
            totalCost += basket[i].price * basket[i].count;
        }
        return totalCost.toFixed(2);
    };

	//forms list of objects
    obj.listBasket = function () {
        var basketCopy = [];
        for (var i in basket) {
            var item = basket[i];
            var itemCopy = {};
            for (var p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = (item.price * item.count).toFixed(2);
            basketCopy.push(itemCopy);
        }
        return basketCopy;
    };

    return obj;
})();