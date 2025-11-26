fetch('../celuares.json')
  .then(response => response.json())
  .then(celulares => {
    document.getElementById("nombre").textContent = celulares.nombre;
    document.getElementById("fecha").textContent = celulares.fecha;
    document.getElementById("descripcion").textContent = celulares.descripcion;
    document.getElementById("cel").textContent = celulares.cel;
    document.getElementById("precio").textContent = celulares.precio;
    document.getElementById("anticipo").textContent = celulares.anticipo;
  })

const salir = document.getElementById("salir");

salir.addEventListener("click", () => {
  window.location.href = "../html/login.html";
});