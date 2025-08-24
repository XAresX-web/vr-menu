const viewer = document.getElementById("mainViewer");
const carousel = document.getElementById("carousel");
const infoBox = document.getElementById("infoBox");
const loadingMsg = document.getElementById("loadingMsg");

let platillos = {};

// Cargar datos desde JSON externo
fetch("data/data.json")
  .then((res) => res.json())
  .then((data) => {
    platillos = data;
    cargarCarrusel(data);
    mostrarPlatillo(Object.keys(data)[0]); // Mostrar primero
  });

function cargarCarrusel(data) {
  carousel.innerHTML = "";
  Object.entries(data).forEach(([id, item], index) => {
    const thumb = document.createElement("div");
    thumb.classList.add("thumbnail");
    if (index === 0) thumb.classList.add("active");
    thumb.dataset.id = id;
    thumb.innerHTML = `<img src="${item.thumbnail}" alt="${item.nombre}"/>`;
    carousel.appendChild(thumb);

    thumb.addEventListener("click", () => {
      document
        .querySelectorAll(".thumbnail")
        .forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
      mostrarPlatillo(id);
    });
  });
}

function mostrarPlatillo(id) {
  const item = platillos[id];

  // Mostrar mensaje de carga
  loadingMsg.style.display = "block";

  // Actualizar modelo
  viewer.setAttribute("src", item.src);
  viewer.setAttribute("ios-src", item.ios);

  // Cuando cargue, ocultar loading
  viewer.addEventListener("load", () => {
    loadingMsg.style.display = "none";
  });

  // Actualizar info
  infoBox.innerHTML = `
    <h2>${item.nombre}</h2>
    <p><strong>Categoría:</strong> ${item.categoria}</p>
    <p><strong>Calorías:</strong> ${item.calorias}</p>
    <p><strong>Precio:</strong> ${item.precio}</p>
    <p><strong>Ingredientes:</strong></p>
    <ul>${item.ingredientes.map((i) => `<li>${i}</li>`).join("")}</ul>
    <p><em>${item.descripcion}</em></p>
  `;
}
