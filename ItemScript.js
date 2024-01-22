function fillDetails() {
    let data = itemData()
    let image = document.getElementById("itemImage");
    let name = document.getElementById("itemName");
    let id = window.location.search.replace("?id=", "");
    let price = document.getElementById("itemPrice");
    let tags = document.getElementById("itemTags");
    let reviews = document.getElementById("itemReview");
    name.innerHTML = data[id].name;
    reviews.innerHTML = '★★★★' +  (Math.random() > 0.5 ? '★' : '☆');
    image.src = "items/item" + id + ".png";
    price.innerHTML = '$' + data[id].price;
    tags.innerHTML = data[id].tags.toString().replaceAll(",",",<br>");

    let button = document.getElementById("addToCartButton']");
    button.addEventListener("click", function () {
        alert("Ringing up the payment system...");})

}

document.addEventListener("DOMContentLoaded", function () {
    fillDetails();
})