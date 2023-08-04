const form = document.getElementById('newItem');
const list = document.getElementById('list');
const items = JSON.parse(localStorage.getItem("items")) || [];


items.forEach((elements) => {
    addProduto(elements);
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = event.target.elements["name"];
    const quantity = event.target.elements["quantity"];
    const exist = items.find((elements) => elements.name === name.value);
    const currentItems = {
        "name": name.value,
        "quantity": quantity.value
    }

    if (exist) {
        currentItems.id = exist.id;
        updateProduct(currentItems);
        items[items.findIndex((elements) => elements.id ===  exist.id)] = currentItems;
    } else {
        currentItems.id = items[items.length - 1] ? (items[items.length - 1]).id + 1 : 0;
        addProduto(currentItems);
        items.push(currentItems);
    }

    localStorage.setItem("items", JSON.stringify(items));
    name.value = '';
    quantity.value = '';
});

function addProduto(item) {
    const newItem = document.createElement('li');
    newItem.classList.add('item');

    const numberItem = document.createElement('strong');
    numberItem.innerHTML = item.quantity;
    numberItem.dataset.id = item.id;
    newItem.appendChild(numberItem);
    newItem.innerHTML += item.name;
    newItem.appendChild(removeProduct(item.id));
    list.appendChild(newItem);
}

function updateProduct(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantity;
}

function removeProduct(id) {
   buttonelement = document.createElement('button');
   buttonelement.innerText = 'REMOVE';

    buttonelement.addEventListener('click', function() { 
       deleteElement(this.parentNode,id);
});
   return buttonelement;
};

function deleteElement(tag,id) {
    tag.remove();    
    items.splice(items.findIndex((elements) => elements.id === id), 1);
    localStorage.setItem("items", JSON.stringify(items));
}
