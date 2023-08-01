

console.log("js detail vinculado")

const pathname = window.location.pathname;
const parts = pathname.split('/');
const numero = parts[parts.length - 1];

console.log(pathname)
console.log(parts)
console.log(numero); // Imprime el número de la URL actual



const hacerPeticionDetail = async () => {
    try {
        const resupuesta = await fetch(`/api/languages/${numero}`)
        const datos = await resupuesta.json()
        //aca se manejan los datos retornados
        console.log(datos)
        document.querySelector(".nombre").textContent = datos.name
        document.querySelector(".creator").textContent = datos.creator
        document.querySelector(".version").textContent = datos.currentVersion

        document.getElementById("link_editar").href = `/languages/${numero}/edit`
    }catch (error){
        console.log(error)
    }
}

document.getElementById("btn_eliminar").addEventListener("click",() =>{
    const quiereEliminar = window.confirm("¿Desea eliminar el registro "+ numero + "?")

    quiereEliminar && eliminarRegistro(numero)

})

hacerPeticionDetail()