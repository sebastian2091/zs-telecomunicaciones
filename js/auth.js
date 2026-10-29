
const SUPABASE_URL = "https://lzcapvijpluocanbebmu.supabase.co";
const SUPABASE_KEY = "sb_publishable_uRrBFT5_y7EXhgrNdVL7EQ_3KUq4a8a";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const form = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const clave = document.getElementById("clave").value;

    loginMessage.textContent = "Verificando acceso...";

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: correo,
        password: clave
    });

    if (error) {
        loginMessage.textContent = "No se pudo iniciar sesión. Verifica tus datos.";
        loginMessage.style.color = "red";
        console.error(error.message);
        return;
    }

    window.location.href = "panel.html";
});
