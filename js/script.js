
/* Mostrar el año actual en el pie de página */
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

/* Obtener el formulario */
const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

/* Controlar el envío del formulario */
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const servicio = document.getElementById("servicio").value;
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !correo || !servicio || !mensaje) {
        formMessage.textContent = "Por favor, completa todos los campos.";
        formMessage.style.color = "red";
        return;
    }

    formMessage.textContent =
        "¡Gracias, " + nombre + "! Tu formulario fue validado correctamente.";
    formMessage.style.color = "green";

    form.reset();
});
