function makeStoreBox(index){
    let card = document.createElement('div'); 
    let backgroundImage = document.createElement('img');
    let title = document.createElement('h1');
    backgroundImage.src = `visuals/catagory${index+1}.jpg`;
    backgroundImage.className = "backgroundImage";
    card.className = "cardBox";

    let cats = ["Urban", "Winter","Adventure", "Aquatic", "NIghtwear", "Climbing", "Hiking"][index];-1

    title.innerHTML = `${cats}`
    title.className = "cardTitle";

    let cardHolder = document.getElementById('CardHolder');
    card.appendChild(backgroundImage);
    card.appendChild(title);
    cardHolder.appendChild(card);
    card.addEventListener('click', () => {
        window.location.href = `store.html?${cats}`
    });
}

function fillFeatured(){
    let storeBox= document.getElementById('storeBoxContent');
    let data = itemData();
    for (let i = 0; i < 12; i++) {
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
        price.innerHTML = `$${Math.round(data[i].price*100)/100}`; 
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

function Search(){
    let searchBarBox = document.getElementById('searchBarBox');
    let searchBar = document.createElement('input');
    let button = document.getElementById('topSearchButton');
    button.onclick = removeSearch;
    searchBarBox.insertBefore(searchBar, button);
    searchBar.focus();
    searchBar.id = "topSearch";
    searchBar.addEventListener('keydown', (e)=>{
        console.log(e);
        if(e.key === 'Enter'){
            window.location.href = `store.html?${searchBar.value}`
        }
    })
}

function removeSearch(){
    let searchBarBox = document.getElementById('searchBarBox');
    setTimeout(() => {
        searchBarBox.removeChild(searchBarBox.firstElementChild);
    }, 500)
    let button = document.getElementById('topSearchButton');
    button.onclick = Search;
    searchBarBox.firstElementChild.style.animationName = "searchBoxCollapse";
    searchBarBox.firstElementChild.style.animationPlayState = "running";
}


document.addEventListener("DOMContentLoaded", function () {
    let topName = document.getElementById('topWebName');
    topName.addEventListener('click', () => {
        window.location.href = "Home.html";
    });
    if (window.location.href.includes("Home")) {
        for (let i = 0; i < 7; i++) {
            makeStoreBox(i);
        }
        fillFeatured();
    } 


    return;
    annoyingChat();
    cookiesPopup();
    addBlocker();
})