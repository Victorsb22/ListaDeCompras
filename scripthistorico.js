document.addEventListener("DOMContentLoaded", function() {
    var historyContainer = document.getElementById("shoppingHistory");
    var purchasedItems = localStorage.getItem("purchasedItems");
    var items = purchasedItems ? JSON.parse(purchasedItems) : [];

    // Exibir os itens da lista de compras comprados
    items.forEach(function(item) {
        var div = document.createElement("div");
        div.classList.add("history-item");

        var h2 = document.createElement("h2");
        h2.textContent = "Item: " + item.name;

        var p = document.createElement("p");
        p.textContent = "Quantidade: " + item.quantity;

        div.appendChild(h2);
        div.appendChild(p);

        historyContainer.appendChild(div);
    });
});

function goToShoppingList() {
    window.location.href = "index.html";
}