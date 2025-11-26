let db;
let idEditando = null; // ID del registro que se está editando

// ---------------------------------------------------------
// 1) Abrir / Crear Base de Datos
// ---------------------------------------------------------
const solicitud = indexedDB.open("Proyecto", 1);

solicitud.onupgradeneeded = function (e) {
    db = e.target.result;
    if (!db.objectStoreNames.contains("usuarios")) {
        db.createObjectStore("usuarios", { keyPath: "id", autoIncrement: true });
    }
};

solicitud.onsuccess = function (e) {
    db = e.target.result;
    mostrarDatos();
};

solicitud.onerror = () => console.log("Error abriendo IndexedDB");

// ---------------------------------------------------------
// 2) Guardar o Editar registro del Formulario
// ---------------------------------------------------------
document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("usuario").value;
    const correo = document.getElementById("correo").value;

    const transaccion = db.transaction(["usuarios"], "readwrite");
    const almacen = transaccion.objectStore("usuarios");

    // Si estamos editando, actualizamos el registro existente
    if (idEditando !== null) {
        almacen.put({ id: idEditando, nombre, correo });
        idEditando = null;
    }
    // Si no, agregamos uno nuevo
    else {
        almacen.add({ nombre, correo });
    }

    transaccion.oncomplete = () => {
        form.reset();
        mostrarDatos();
    };
});

// ---------------------------------------------------------
// 3) Mostrar registros + botones Editar / Eliminar
// ---------------------------------------------------------
function mostrarDatos(filtro = "") {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    const transaccion = db.transaction(["usuarios"], "readonly");
    const almacen = transaccion.objectStore("usuarios");

    almacen.openCursor().onsuccess = function (e) {
        const cursor = e.target.result;

        if (cursor) {
            const item = cursor.value;

            // FILTRAR BÚSQUEDA
            if (
                item.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
                item.correo.toLowerCase().includes(filtro.toLowerCase())
            ) {
                lista.innerHTML += `
                        <li>
                            <strong>${item.nombre}</strong> - ${item.correo} <br><br>
                            <button onclick="editar(${item.id})">Editar</button> 
                            <button onclick="eliminar(${item.id})">Eliminar</button>
                        </li>
                    `;
            }

            cursor.continue();
        }
    };
}

// ---------------------------------------------------------
// 4) Eliminar registro por ID
// ---------------------------------------------------------
function eliminar(id) {
    const transaccion = db.transaction(["usuarios"], "readwrite");
    const almacen = transaccion.objectStore("usuarios");

    almacen.delete(id);

    transaccion.oncomplete = () => mostrarDatos();
}

// ---------------------------------------------------------
// 5) Cargar datos al formulario para editar
// ---------------------------------------------------------
function editar(id) {
    const transaccion = db.transaction(["usuarios"], "readonly");
    const almacen = transaccion.objectStore("usuarios");

    const solicitud = almacen.get(id);

    solicitud.onsuccess = function () {
        const datos = solicitud.result;

        document.getElementById("nombre").value = datos.nombre;
        document.getElementById("correo").value = datos.correo;
        idEditando = id; // Guardamos ID del registro a editar
    };
}