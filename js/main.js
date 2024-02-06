document.addEventListener("DOMContentLoaded", () => {
    if (hayContactos()) {
        mostrarTabla(); // Mostrar la tabla si hay contactos al cargar la página
        cargarContactos();
    } else {
        ocultarTabla(); // Ocultar la tabla si no hay contactos al cargar la página
    }
});

function hayContactos() {
    const contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    return contactos.length > 0;
}
function agregarActualizarContacto() {
    const campos = ["nombre", "email", "fechaNacimiento"];
    const valores = campos.map((campo) => document.getElementById(campo).value);

    // Validar campos obligatorios
    if (valores.some((valor) => !valor)) {
        alert("Todos los campos obligatorios deben estar completos");
        return;
    }

    const [nombre, email, fechaNacimiento] = valores;

    // Validar formato del correo electrónico
    if (!validarFormatoEmail(email)) {
        alert("Formato de correo electrónico inválido");
        return;
    }

    const contactId = document.getElementById("contactId").value;

    // Crear un nuevo objeto Date desde los componentes de la fecha
    const [ano, mes, dia] = fechaNacimiento.split("-");
    const fechaNacimientoObj = new Date(ano, mes - 1, dia);

    const nuevoContacto = {
        nombre,
        email,
        fechaNacimiento: fechaNacimientoObj.toISOString().split("T")[0],
    };

    if (contactId) {
        // Actualizar contacto existente
        actualizarContacto(contactId, nuevoContacto);
    } else {
        // Agregar nuevo contacto
        agregarContacto(nuevoContacto);

        // Mostrar la tabla después de agregar un contacto
        mostrarTabla();
    }

    limpiarFormulario();
}

function validarFormatoEmail(email) {
    // Utilizar una expresión regular para validar el formato del correo electrónico
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}
function ocultarTabla() {
    const tableContainer = document.getElementById("tableContainer");
    tableContainer.style.display = "none";
}

function mostrarTabla() {
    const tableContainer = document.getElementById("tableContainer");
    tableContainer.style.display = "block";
}

function cargarContactos() {
    const contactCardContainer = document.getElementById(
        "contactCardContainer"
    );
    contactCardContainer.innerHTML = "";

    // Obtener contactos desde el Local Storage
    const contactos = JSON.parse(localStorage.getItem("contactos")) || [];

    if (contactos.length > 0) {
        mostrarTabla(); // Mostrar la tabla si hay contactos
    } else {
        ocultarTabla(); // Ocultar la tabla si no hay contactos
    }

    // Mostrar contactos en cards
    contactos.forEach((contacto, index) => {
        const card = document.createElement("div");
        card.classList.add("contactCard");
        card.innerHTML = `
            <p><strong>ID:</strong> ${index + 1}</p>
            <p><strong>Nombre:</strong> ${contacto.nombre}</p>
            <p><strong>Email:</strong><br>${contacto.email}</p>
            <p><strong>Fecha de Nacimiento:</strong><br> ${formatFechaNacimiento(
            contacto.fechaNacimiento
        )}</p>
            <div class="buttons">
                <button onclick="editarContacto(${index})"><i class="fas fa-edit"></i></button>
                <button onclick="eliminarContacto(${index})"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;
        contactCardContainer.appendChild(card);
    });
}
function formatFechaNacimiento(fechaNacimiento) {
    const [ano, mes, dia] = fechaNacimiento.split("-");
    return `${dia} de ${obtenerNombreMes(mes)} de ${ano}`;
}
app
function obtenerNombreMes(numeroMes) {
    const meses = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
    ];
    return meses[parseInt(numeroMes, 10) - 1];
}

function agregarContacto(contacto) {
    // Obtener contactos desde el Local Storage
    const contactos = JSON.parse(localStorage.getItem("contactos")) || [];

    // Agregar nuevo contacto
    contactos.push(contacto);

    // Guardar en el Local Storage
    localStorage.setItem("contactos", JSON.stringify(contactos));

    // Actualizar la lista de contactos en la página
    cargarContactos();
}

function actualizarContacto(contactId, nuevoContacto) {
    // Obtener contactos desde el Local Storage
    const contactos = JSON.parse(localStorage.getItem("contactos")) || [];

    // Actualizar contacto existente
    contactos[contactId] = nuevoContacto;

    // Guardar en el Local Storage
    localStorage.setItem("contactos", JSON.stringify(contactos));

    // Actualizar la lista de contactos en la página
    cargarContactos();
}

function eliminarContacto(contactId) {
    // Obtener contactos desde el Local Storage
    const contactos = JSON.parse(localStorage.getItem("contactos")) || [];

    // Eliminar contacto
    contactos.splice(contactId, 1);

    // Guardar en el Local Storage
    localStorage.setItem("contactos", JSON.stringify(contactos));

    // Actualizar la lista de contactos en la página
    cargarContactos();
}

function editarContacto(contactId) {
    // Obtener contactos desde el Local Storage
    const contactos = JSON.parse(localStorage.getItem("contactos")) || [];

    // Llenar el formulario con los datos del contacto seleccionado
    const contacto = contactos[contactId];
    document.getElementById("nombre").value = contacto.nombre;
    document.getElementById("email").value = contacto.email;
    document.getElementById("fechaNacimiento").value = contacto.fechaNacimiento;
    document.getElementById("contactId").value = contactId;
}

function limpiarFormulario() {
    // Limpiar el formulario
    document.getElementById("nombre").value = "";
    document.getElementById("email").value = "";
    document.getElementById("fechaNacimiento").value = "";
    document.getElementById("contactId").value = "";
}
