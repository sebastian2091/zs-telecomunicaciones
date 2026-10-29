
const SUPABASE_URL = "https://lzcapvijpluocanbebmu.supabase.co";
const SUPABASE_KEY = "sb_publishable_uRrBFT5_y7EXhgrNdVL7EQ_3KUq4a8a";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function verificarSesion() {
    const { data, error } = await supabaseClient.auth.getSession();

    if (error || !data.session) {
        window.location.replace("login.html");
        return false;
    }

    return true;
}

async function cargarSolicitudes() {
    const contenedor = document.getElementById("solicitudes-container");

    contenedor.textContent = "Cargando solicitudes...";

    const { data, error } = await supabaseClient
        .from("contactos")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        contenedor.textContent = "Error al cargar las solicitudes.";
        console.error(error.message);
        return;
    }

console.log(data);
console.log("Total de solicitudes recibidas:", data.length);
console.log("Estados:", data.map(solicitud => solicitud.estado));

const totalPendientes = data.filter(function (solicitud) {
    return (solicitud.estado || "Pendiente").trim().toLowerCase() === "pendiente";
}).length;

const totalProceso = data.filter(function (solicitud) {
    return (solicitud.estado || "").trim().toLowerCase() === "en proceso";
}).length;

const totalFinalizadas = data.filter(function (solicitud) {
    return (solicitud.estado || "").trim().toLowerCase() === "finalizada";
}).length;

document.getElementById("total-pendientes").textContent = totalPendientes;
document.getElementById("total-proceso").textContent = totalProceso;
document.getElementById("total-finalizadas").textContent = totalFinalizadas;


document.getElementById("total-pendientes").textContent = totalPendientes;
console.log("Pendientes calculados:", totalPendientes);
console.log("Estados recibidos:", data.map(solicitud => solicitud.estado));
document.getElementById("total-proceso").textContent = totalProceso;
document.getElementById("total-finalizadas").textContent = totalFinalizadas;

if (data.length === 0) {
    contenedor.textContent = "No hay solicitudes registradas.";
    return;
}


    contenedor.innerHTML = "";

    
const filtroEstado = document.getElementById("filtro-estado");
const estadoSeleccionado = filtroEstado.value;

const solicitudesFiltradas = data.filter(function (solicitud) {
    const estadoActual = solicitud.estado || "Pendiente";

    return estadoSeleccionado === "Todos" ||
        estadoActual === estadoSeleccionado;
});


    solicitudesFiltradas.forEach(function (solicitud) {
        const tarjeta = document.createElement("article");
        tarjeta.className = "service-card";

        const titulo = document.createElement("h3");
        titulo.textContent = solicitud.nombre;

        const correo = document.createElement("p");
        correo.textContent = "Correo: " + solicitud.correo;

        const servicio = document.createElement("p");
        servicio.textContent = "Servicio: " + solicitud.servicio;

        const mensaje = document.createElement("p");
        mensaje.textContent = "Mensaje: " + solicitud.mensaje;

        const fecha = document.createElement("p");

fecha.textContent = "Fecha: " +
    new Date(solicitud.created_at).toLocaleString("es-CO");

        const etiquetaEstado = document.createElement("label");
        etiquetaEstado.textContent = "Estado: ";

        const selectorEstado = document.createElement("select");

        const estados = ["Pendiente", "En proceso", "Finalizada"];
        const estadoActual = solicitud.estado || "Pendiente";

        estados.forEach(function (estado) {
            const opcion = document.createElement("option");
            opcion.value = estado;
            opcion.textContent = estado;
            opcion.selected = estadoActual === estado;
            selectorEstado.appendChild(opcion);
        });
        selectorEstado.addEventListener("change", async function () {
    selectorEstado.disabled = true;

    const { error } = await supabaseClient
        .from("contactos")
        .update({ estado: selectorEstado.value })
        .eq("id", solicitud.id);

    selectorEstado.disabled = false;

    if (error) {
        alert("No se pudo actualizar el estado.");
        console.error(error.message);
        return;
    }
    await cargarSolicitudes();
    alert("Estado actualizado correctamente.");
});

        etiquetaEstado.appendChild(selectorEstado);

        
function actualizarColorEstado() {
    if (selectorEstado.value === "Pendiente") {
        selectorEstado.style.color = "#b45309";
    } else if (selectorEstado.value === "En proceso") {
        selectorEstado.style.color = "#1d4ed8";
    } else {
        selectorEstado.style.color = "#15803d";
    }
}

actualizarColorEstado();

selectorEstado.addEventListener("change", actualizarColorEstado);


        tarjeta.append(
            titulo,
            correo,
            servicio,
            mensaje,
            fecha,
            etiquetaEstado
        );

        contenedor.appendChild(tarjeta);
    });
}

async function iniciarPanel() {
    const sesionValida = await verificarSesion();

    if (sesionValida) {
        await cargarSolicitudes();
    }
}

iniciarPanel();
setInterval(cargarSolicitudes, 10000);
document.getElementById("filtro-estado").addEventListener("change", function () {
    cargarSolicitudes();
});





const logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener("click", async function () {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        alert("No se pudo cerrar la sesión. Inténtalo nuevamente.");
        return;
    }

    window.location.replace("login.html");
});
