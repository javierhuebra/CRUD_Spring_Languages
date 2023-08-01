console.log("js vinculado")

const url = "/api/languages"
let fragmento = document.createDocumentFragment()
let contenidoHTML = `<div class="fila">
                                <div class="columna titular">Nombre</div>
                                <div class="columna titular">Creador</div>
                                <div class="columna titular">Versión</div>
                                <div class="columna titular">Acción</div>
                           </div>`
let tabla = document.getElementById("tabla")
let form = document.getElementById("form_cargar")

//Manejo de la peticion que actualiza los registros
const hacerPeticion = async () => {
    try{
        const resupuesta = await fetch(url)
        const datos = await resupuesta.json()
        //aca se manejan los datos retornados
        console.log(datos)

        datos.forEach(lenguaje => {
            contenidoHTML += `<div class="fila">
                                    <div class="columna"><a class="prueba" href="/languages/${lenguaje.id}">${lenguaje.name}</a></div>
                                    <div class="columna">${lenguaje.creator}</div>
                                    <div class="columna">${lenguaje.currentVersion}</div>
                                    <div class="columna">
                                        <button id="${lenguaje.id}" class="btn-eliminar">Eliminar</button>
                                        <a href="/languages/${lenguaje.id}/edit">Editar</a>
                                    </div>
                              </div>`

        })
        tabla.innerHTML = contenidoHTML
        let botones = document.querySelectorAll(".btn-eliminar")
        botones.forEach(boton =>{
            boton.addEventListener("click",()=>{
                const quiereEliminar = window.confirm("¿Desea eliminar el registro "+ boton.id + "?")

                quiereEliminar && eliminarRegistro(boton.id)

            })
        })

        document.querySelector(".prueba").addEventListener("click",() => {
            console.log("adsads")
        })
    }catch(error){
        console.log(error)
    }
}


//Manejo del formulario de envío con validaciones
form?.addEventListener("submit",(e) => {
    e.preventDefault()
    const url = '/languages';

    //Estas validaciones son precarias, son mejores las que tiene el back con thymeleaf para que aparezcan automaticas, pero dejo estas para practicar otra forma
    //Aqui hay validacion en el front y en el back, solo que los errores que salten en el back no se van a mostrar en el front, tiene doble validación
    if(form.name.value.length < 2 || form.name.value.length > 20){
        alert("Nombre debe ser mayor a 2 caracteres y menor a 20")
        return
    }
    if(form.creator.value.length < 2 || form.creator.value.length > 20){
        alert("Creador debe ser mayor a 2 caracteres y menor a 20")
        return
    }
    if(form.currentVersion.value.length < 2 || form.currentVersion.value.length > 20){
        alert("La version debe ser mayor a 2 caracteres y menor a 20")
        return
    }
    const data = {
        name: form.name.value,
        creator: form.creator.value,
        currentVersion: form.currentVersion.value
    };

    //Esto es para practicar enviar datos de otra forma que no sea un JSON
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data).toString() //Esto convierte un objeto en parametros para enviarlo sin ser objeto
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log('Datos de la respuesta:', data)
            window.location.href = '/languages'
        })

})

//Funcion para eliminar registro
const eliminarRegistro = (id) => {
    const requestOptions = {
        method: 'DELETE' //ATENTO, esta funcion method no admite las comillas `` solo '' o ""
    };

    fetch(`/languages/${id}`, requestOptions)
        .then(response => response.text())
        .then(data => {
            console.log(data);
            alert("registro eliminado")
            window.location.href = '/languages'
        })
        .catch(error => {
            console.error('Error de red:', error);
        });
};



hacerPeticion()