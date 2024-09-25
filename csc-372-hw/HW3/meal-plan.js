var dishSelect = document.getElementById("dish-select");
var dishSelection = document.getElementById("dish-selection");
var totalCost = document.getElementById("total-cost");

// create dish imgs
for (var i = 0; i < 3; i++) {
    var dishes = document.createElement("div");
    dishes.classList.add("dishes");

    for (var j = 0; j < 3; j++) {
        var dish = document.createElement("img");
        dish.classList.add("dish");
        dish.src = itemImgs[i][j];
        dish.title = itemNames[i][j] + "\n$" + itemCosts[i][j].toFixed(2);
        dish.addEventListener("click", addToPlan);
        dishes.appendChild(dish);
    }
    dishSelect.appendChild(dishes);
}

// add clicked dish to selection
function addToPlan(event) {
    var dish = event.currentTarget;
    var selectedDish = document.createElement("div");
    selectedDish.classList.add("selected-dish");
    var dishName = document.createElement("h4");
    dishName.classList.add("dish-name");
    var dishCost = document.createElement("p");
    dishCost.classList.add("dish-cost");
    var rem = document.createElement("button");
    rem.classList.add("more-less-rem");
    var addMoreLess = document.createElement("div");
    var quantity = document.createElement("label");
    quantity.classList.add("quantity");
    var addMore = document.createElement("button");
    var addLess = document.createElement("button");
    addMore.classList.add("more-less-rem");
    addLess.classList.add("more-less-rem");
    var split = dish.title.indexOf("$");

    addLess.textContent = "-";
    addMore.textContent = "+";
    rem.innerHTML = "&#128465;";
    quantity.textContent = 1;
    
    addMoreLess.append(rem);
    addMoreLess.append(addLess);
    addMoreLess.append(quantity);
    addMoreLess.append(addMore);

    dishName.textContent = dish.title.substring(0, split);
    dishCost.textContent = dish.title.substring(split + 1);

    selectedDish.appendChild(dishName);
    selectedDish.appendChild(addMoreLess);
    selectedDish.appendChild(dishCost);
    document.getElementById("dishes-selected").appendChild(selectedDish);

    rem.addEventListener("click", removeDish);
    addLess.addEventListener("click", subtractDish);
    addMore.addEventListener("click", addDish);
    addLess.disabled = true;

    getTotalCost();
}

function removeDish(event) {
    dish = event.currentTarget.parentNode.parentNode;
    dish.remove();
    getTotalCost();
}
function addDish(event) {
    var dish = event.currentTarget.parentNode.parentNode;
    var quantity = dish.getElementsByClassName("quantity")[0];
    var dishCost = dish.getElementsByClassName("dish-cost")[0];

    quantity.textContent = parseInt(quantity.textContent) + 1;
    getTotalCost();

    dish.getElementsByClassName("more-less-rem")[1].disabled = false;
}
function subtractDish(event) {
    var dish = event.currentTarget.parentNode.parentNode;
    var quantity = dish.getElementsByClassName("quantity")[0];
    var dishCost = dish.getElementsByClassName("dish-cost")[0];

    quantity.textContent = parseInt(quantity.textContent) - 1;
    getTotalCost();

    if (quantity.textContent <= 1) {
        event.currentTarget.disabled = true;
    }
}
function getTotalCost(){
    var dishes = dishSelection.querySelectorAll(".selected-dish");
    var total = 0;
    dishes.forEach(element => {
        total += parseFloat(element.getElementsByClassName("quantity")[0].textContent) * parseFloat(element.getElementsByClassName("dish-cost")[0].textContent);
    });
    totalCost.textContent = "Total: $" + total.toFixed(2);
}