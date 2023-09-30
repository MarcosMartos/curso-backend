const socketClient = io();

// Traer elementos de formulario para crear producto
const form = document.getElementById("form");
const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");
const inputPrice = document.getElementById("price");
const table = document.getElementById("table");
const tableBody = document.getElementById("tableBody");

// Crear producto
form.onsubmit = (e) => {
  e.preventDefault();
  const product = {
    title: inputTitle.value,
    description: inputDescription.value,
    price: inputPrice.value,
  };
  socketClient.emit("createProduct", product);
};

socketClient.on("productCreated", (product) => {
  const { id, title, description, price } = product;
  const row = `
    <tr>
    <td>${id}</td>
            <td>${title}</td>
            <td>${description}</td>
            <td>${price}</td>
        </tr>`;
  table.innerHTML += row;
});

// Eliminar producto

const formDelete = document.getElementById("formDelete");
const inputIdDelete = document.getElementById("idDelete");

// Traer elementos de formulario para eliminar producto
formDelete.onsubmit = (e) => {
  e.preventDefault();
  const idDelete = inputIdDelete.value;
  socketClient.emit("deleteProduct", +idDelete);
};

socketClient.on("productDeleted", (products) => {
  table.innerHTML = "";

  products.forEach((p) => {
    const { id, title, description, price } = p;
    const row = `
    <tr>
    <td>${id}</td>
            <td>${title}</td>
            <td>${description}</td>
            <td>${price}</td>
        </tr>`;

    table.innerHTML += row;
  });
});
