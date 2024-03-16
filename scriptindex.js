function addItem() {
    var itemInput = document.getElementById("itemInput");
    var unpurchasedList = document.getElementById("unpurchasedList");

    var itemText = itemInput.value.trim();
    
    // Verificar se o item jÃ¡ existe na lista
    var items = unpurchasedList.querySelectorAll('.item-text');
    var itemAlreadyExists = Array.from(items).some(function(item) {
        return item.textContent.toLowerCase() === itemText.toLowerCase();
    });

    if (itemText !== "" && !itemAlreadyExists) {
        var li = document.createElement("li");
        
        li.innerHTML = `
            <div class="container-div">
                <div class="div-compras">
                 <span class="item-text">${itemText}</span>
                 <span class="quantity">
                    <input type="number" value="1" min="1" onchange="updateQuantity(this)">
                </span>
                </div>
                <div class="div-button">
                    <button class="edit-button" onclick="editItem(this)">Editar</button>
                    <button class="delete-button" onclick="deleteItem(this)">Excluir</button>
                </div>
             </div>
        `;
        unpurchasedList.appendChild(li);
        itemInput.value = "";
    } else {
        alert("Este item jÃ¡ estÃ¡ na lista!");
    }
}

function searchItems() {
    var searchInput = document.getElementById("searchInput").value.toLowerCase();
    var items = document.querySelectorAll('.item-text');
    var searchResult = document.getElementById("searchResult");
    var foundInUnpurchased = false;
    var foundInPurchased = false;

    items.forEach(function(item) {
        var text = item.textContent.toLowerCase();
        var li = item.closest("li"); // Encontrar o elemento li pai
        
        if (text.includes(searchInput)) {
            li.style.display = "block";
            if (li.parentNode.id === "unpurchasedList") {
                foundInUnpurchased = true;
            } else if (li.parentNode.id === "purchasedList") {
                foundInPurchased = true;
            }
        } else {
            li.style.display = "none";
        }
    });

    var message = "";
    if (foundInUnpurchased) {
        alert("Item encontrado na lista de Itens NÃ£o Comprados.");
    }
    if (foundInPurchased) {
        alert("Item encontrado na lista de Itens Comprados. ");
    }
    if (!foundInUnpurchased && !foundInPurchased) {
        alert("Item nÃ£o encontrado em nenhuma das listas.");
    }
    searchResult.textContent = message;
}

function updateQuantity(input) {
    var value = parseInt(input.value);
    if (value < 1 || isNaN(value)) {
        input.value = 1;
    }
}

function deleteItem(button) {
    var containerDiv = button.closest(".container-div");
    containerDiv.parentNode.removeChild(containerDiv);
}

function editItem(button) {
    var containerDiv = button.closest(".container-div");
    var itemTextElement = containerDiv.querySelector('.item-text');
    var newItemText = prompt("Editar item:", itemTextElement.textContent.trim());
    if (newItemText !== null) {
        itemTextElement.textContent = newItemText.trim();
    }
}

function toggleItem(event) {
    // Verificar se o clique ocorreu no texto do item
    if (event.target.classList.contains("item-text")) {
        var li = event.target.closest("li");
        if (li) {
            var purchasedList = document.getElementById("purchasedList");
            var unpurchasedList = document.getElementById("unpurchasedList");

            // Verificar se o item jÃ¡ estÃ¡ na lista de compras
            var isPurchasedItem = li.parentNode === purchasedList;

            // Mover o item para a lista correta
            if (isPurchasedItem) {
                unpurchasedList.appendChild(li);
            } else {
                purchasedList.appendChild(li);
            }

            // Atualizar o estado do botÃ£o de salvar
            updateSaveButtonState();
        }
    }
}

function updateSaveButtonState() {
    var unpurchasedList = document.getElementById("unpurchasedList");
    var saveButton = document.getElementById("saveButton");

    // Verificar se hÃ¡ itens restantes na lista de nÃ£o comprados
    var remainingItems = unpurchasedList.children.length;

    // Ativar ou desativar o botÃ£o de salvar com base na condiÃ§Ã£o acima
    if (saveButton) {
        saveButton.disabled = remainingItems > 0;
    }
}

function saveShoppingList() {
    var purchasedList = document.getElementById("purchasedList");
    var items = purchasedList.querySelectorAll('.item-text');


    // Criar uma estrutura de dados para armazenar os itens e suas quantidades
    var itemList = [];
    items.forEach(function(item) {
        var itemName = item.textContent;
        var quantityInput = item.nextElementSibling.querySelector('input[type="number"]');
        var itemQuantity = parseInt(quantityInput.value);
        itemList.push({ name: itemName, quantity: itemQuantity });
    });

    // Armazenar a lista de itens comprados no armazenamento local com a chave correta
    localStorage.setItem("purchasedItems", JSON.stringify(itemList));

    // Redirecionar para a pÃ¡gina de histÃ³rico de compras
    window.location.href = "historico_de_compras.html";
}

function goToShoppingHistory() {
    window.location.href = "historico_de_compras.html";
}