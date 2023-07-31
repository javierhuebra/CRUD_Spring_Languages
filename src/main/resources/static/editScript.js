console.log("edit script vinculado")

const pathname = window.location.pathname;
const parts = pathname.split('/');
const numero = parts[2];

console.log(pathname)
console.log(parts)
console.log(numero); // Imprime el número de la URL actual

const form = document.getElementById("form_editar")
const peticionGetEditar = async () => {
    try {
        const resupuesta = await fetch(`/api/languages/${numero}`)
        const datos = await resupuesta.json()
        //aca se manejan los datos retornados
        console.log(datos)
        form.name.value = datos.name
        form.creator.value = datos.creator
        form.currentVersion.value = datos.currentVersion
    }catch (error){
        console.log(error)
    }
}

form.addEventListener("submit", () => {

    const url = `/languages/${numero}`
    const data = {
        name: form.name.value,
        creator: form.creator.value,
        currentVersion: form.currentVersion.value
    };
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
        })
    window.location.href = '/languages'
})
peticionGetEditar()