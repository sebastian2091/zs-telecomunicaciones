
/* 1. Configurar Supabase */
const SUPABASE_URL = "https://lzcapvijpluocanbebmu.supabase.co";
const SUPABASE_KEY = "sb_publishable_uRrBFT5_y7EXhgrNdVL7EQ_3KUq4a8a";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

/* 2. Mostrar el año actual */
const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

/* 3. Obtener el formulario */
const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

/* 4. Guardar el contacto */
form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const servicio = document.getElementById("servicio").value;
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !correo || !servicio || !mensaje) {
        formMessage.textContent = "Completa todos los campos.";
        formMessage.style.color = "red";
        return;
    }

    formMessage.textContent = "Enviando solicitud...";
    formMessage.style.color = "#075985";

    const { error } = await supabaseClient
        .from("contactos")
        .insert([{ nombre, correo, servicio, mensaje }]);

    if (error) {
        console.error("Error al guardar el contacto:", error);
        formMessage.textContent =
            "No se pudo enviar la solicitud. Inténtalo nuevamente.";
        formMessage.style.color = "red";
        return;
    }

    formMessage.textContent =
        "¡Gracias! Tu solicitud se guardó correctamente.";
    formMessage.style.color = "green";

    form.reset();
});
