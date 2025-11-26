const usu = document.getElementById("usu");
const pass = document.getElementById("pass");
const ingreso = document.getElementById("ingreso");
const pasa = ingreso.addEventListener("click", () => {
    window.location.href = "../index.html";
});

fetch('../json.json')
    .then(response => response.json())
    .then(json => {
        console.log(json)
        if (usu.value === json.usuario && pass.value === json.pass) {
            pasa
        } else {
            console.log("contraseña incorrecta");
        }
    });
