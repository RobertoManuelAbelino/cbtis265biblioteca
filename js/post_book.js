//Funcion para postear un libro
const API_URL_registrarLibro = 'https://biblioteca-cbtis265.herokuapp.com/api/libros/registrar';

const boton_guardar = document.getElementById('buton-save-book');

boton_guardar.addEventListener('click', ()=>{
    if(document.getElementById("isbn-input").value=="" ||
       document.getElementById("titulo-input").value=="" ||
       document.getElementById("autor-input").value =="" ||
       document.getElementById("editorial-input").value=="" ||
       document.getElementById("edicion-input").value=="" ||
       Number(document.getElementById("anioP-input").value) <1 ||
       document.getElementById("descripcion-input").value == "" ||
       Number(document.getElementById("cantidad-input").value) <0
       )
        window.alert("Hace falta rellenar el formulario o algun valor esta mal ingresado")
    else{
        const nuevoLibro = {
            isbn: document.getElementById("isbn-input").value,
            titulo: document.getElementById("titulo-input").value,
            autor: document.getElementById("autor-input").value,
            editorial: document.getElementById("editorial-input").value,
            edicion: document.getElementById("edicion-input").value,
            anioPublicacion: Number(document.getElementById("anioP-input").value),
            descripcion: document.getElementById("descripcion-input").value,
            cantidad: Number(document.getElementById("cantidad-input").value)
        }
        console.log(nuevoLibro)
        fetch(API_URL_registrarLibro,{
            method: 'POST',
            body: JSON.stringify(nuevoLibro),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => console.log(data))
        window.confirm("El libro ha sido registrador");
        window.location.reload();
    }
});
