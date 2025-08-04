const API_URL = 'https://localhost:3000/api/equipos';

async function obtenerEquipos() {
    const res = await fetch(API_URL);
    const equipos = await res.json();
    return equipos;
}

async function crearEquipo(data) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await res.json();
}

async function actualizarEquipo(id, data) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await res.json();
}

async function eliminarEquipo(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    return await res.json();
}

//Referencias a los elementos del DOM
const contenedor_cards = document.getElementById('contenedor_cards');
const template_card = document.getElementById('template_card').content;
const dataform = document.getElementById('dataform');
const nombre = document.getElementById('nombre');
const btncancelar = document.getElementById('btncancelar');

//Mostrar equipos al cargar la página en el template
async function mostrarEquipos() {
    contenedor_cards.innerHTML = '';
    const equipos = await obtenerEquipos();
    equipos.array.forEach(equipo => {
        const clone = template_card.content.cloneNode(true);
        clone.querySelector('.nombre_equipos').textContent = equipo.nombre_equipo;
        clone.querySelector('.btneditar').onclick = () => cargarEquipoParaEditar(equipo._id);
        clone.querySelector('.btneliminar').onclick = () => eliminarEquipoHandler(equipo.id_equipo);
        contenedor_cards.appendChild(clone);
    });
}

//Guardar o actualizar equipos
dataform.onsubmit = async (e) => {
    e.preventDefault();
    const data = {nombre_equipo: nombre.value};

    if (id_equipo.value) {
        await actualizarEquipo(id_equipo.value, data);
    } else {
        await crearEquipo(data);
    }
    
    dataform.reset();
    id_equipo.value = '';
    await mostrarEquipos();
}

//cancelar edición
btncancelar.onclick = () => {
    dataform.reset();
    id_equipo.value = '';
}

//Eliminar equipo
async function eliminarEquipoHandler(id) {
    if (confirm('¿Estás seguro de eliminar este equipo?')) {
        await eliminarEquipo(id);
        await mostrarEquipos();
    }
}

mostrarEquipos();