function inSearch(data, search) {
    search = search.toLowerCase();
    for (let e of data["tags"]) {
        if (e.toLowerCase().includes(search)) {
            return true;
        }
    }
    if (data["name"].toLowerCase().includes(search)){return true}
    return false;
}


function makeStoreBox() {
    let storeBox = document.getElementById('storeBoxContent');
    let data = itemData();
    let search = window.location.search.replace("?", "");

    for (let i = 0; i < howMany(); i++) {
        if (!inSearch(data[i], search)) {
            continue
        }
        let card = document.createElement('div');
        let image = document.createElement('img');
        let title = document.createElement('h1');
        let price = document.createElement('p');
        let tags = document.createElement('p');
        card.className = "itemCard";
        image.src = `items/item${i}.png`;
        image.className = "itemImage";
        title.innerHTML = `${data[i].name}`;
        title.className = "itemTitle";
        price.innerHTML = `$${Math.round(data[i].price * 100) / 100}`;
        price.className = "itemPrice";
        data[i].tags.forEach(element => {
            tags.innerHTML += element + ', ';
        });
        card.addEventListener('click', () => {
            window.location.href = `item.html?id=${i}`
        })
        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(tags);
        storeBox.appendChild(card);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    makeStoreBox();
});