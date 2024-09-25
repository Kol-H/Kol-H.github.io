var imgSize = 125;

/**
 *  Recommendations section
 */
//create each establishment section
for (var i = 0; i < 3; i++) {
    var establishment = document.createElement("article");
    var restName = document.createElement("h2");
    var restLink = document.createElement("a");
    var restDesc = document.createElement("p");
    var aside = document.createElement("aside");
    var dishes = document.createElement("div");
    var dishName = document.createElement("h3");
    var dishDesc = document.createElement("div");

    establishment.classList.add("establishment");
    dishes.classList.add("dishes");
    dishDesc.classList.add("item-desc");

    restLink.href = restLinks[i];
    restName.textContent = restNames[i];
    restDesc.innerHTML = restDescs[i];

    for (var j = 0; j < 3; j++) {
        var dish = document.createElement("img");
        dish.classList.add("dish");
        dish.src = itemImgs[i][j];
        dish.alt = itemNames[i][j];
        dish.textContent = itemDescs[i][j] + itemCosts[i][j].toFixed(2);
        dishes.appendChild(dish);
    }

    aside.appendChild(dishes);
    aside.appendChild(dishDesc);
    restLink.appendChild(restName);
    establishment.appendChild(restLink);
    establishment.appendChild(restDesc);
    establishment.appendChild(aside);
    document.getElementById("establishments").appendChild(establishment);

    var dish = dishes.getElementsByClassName("dish");
    for (var j = 0; j < 3; j++) {
        dish[j].addEventListener("click", showHideDesc);
    }
}

// show or hide dish description
function showHideDesc(event) {
    var dish = event.currentTarget;
    var dishes = dish.parentNode.parentNode;
    var desc = dishes.getElementsByClassName("item-desc")[0];
    if (dish.style["height"] != (imgSize * 2) + "px") {
        let rDishes = dishes.querySelectorAll(".dish");
        rDishes.forEach(function(element) {
            element.style = imgSize + "px"; //set all other dishes to default size
        });
        dish.style["height"] = (imgSize * 2) + "px";
        dish.style["width"] = (imgSize * 2) + "px";
        desc.innerHTML = dish.textContent;
        desc.style.display = "block";
    }
    else {
        dish.style["height"] = imgSize + "px";
        dish.style["width"] = imgSize + "px";
        desc.innerHTML = "";
        desc.style.display = "none";
    }
}


/**
 *  Articles section
 */
for (var i = (artLinks.length - 1); i >= 0; i--) {
    var artContainer = document.createElement("article");
    var artPubDate = document.createElement("div");
    artPubDate.classList.add("row");
    var artPub = document.createElement("h6");
    var artDate = document.createElement("h6");
    var artTitle = document.createElement("h4");
    var artAuthor = document.createElement("h6");
    var artLink = document.createElement("a");

    artPub.textContent = artPublishers[i];
    artDate.textContent = artDates[i];
    artTitle.textContent = artTitles[i];
    artAuthor.textContent = "By " + artAuthors[i];
    artLink.href = artLinks[i];

    artLink.append(artTitle);
    artPubDate.append(artPub);
    artPubDate.append(artDate);
    artContainer.append(artPubDate);
    artContainer.append(artLink);
    artContainer.append(artAuthor);

    document.getElementById("articles").appendChild(artContainer);
}