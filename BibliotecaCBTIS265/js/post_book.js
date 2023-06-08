//Funcion para postear un libro
const API_URL_registrarLibro = 'https://biblioteca-cbtis265.herokuapp.com/api/libros/registrar';
const url_libros = "https://biblioteca-cbtis265.herokuapp.com/api/libros/all";
const boton_guardar = document.getElementById('buton-save-book');
var input_isbn = document.getElementById("isbn-input");
var libros;

fetch(url_libros)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    libros = data
    console.log(libros)
  })


input_isbn.addEventListener('keyup', function(){
    let inputs = document.querySelectorAll("input.otro");
                inputs.forEach(input => {
                    input.classList.remove("deshabilitado");
                })
    var isbn = input_isbn.value.replaceAll("-","");
    console.log(isbn);
    if (isbn.length==13){
        //console.log(libros.data)
        libros.forEach(libro => {
            let isbnLibro = libro.isbn.replaceAll("-","");
            if(isbnLibro === isbn){
                swal("Érror","Ya existe un libro con ese isbn","error");
            
                inputs.forEach(input => {
                    input.classList.add("deshabilitado");
                })
            }            
        });
    }
})

boton_guardar.addEventListener('click', ()=>{
    if(document.getElementById("isbn-input").value=="" ||
       document.getElementById("titulo-input").value=="" ||
       document.getElementById("autor-input").value =="" ||
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
            editorial: document.getElementById("select-editorial").value,
            edicion: document.getElementById("select-edicion").value,
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
        swal("Registro exitoso","El libro ha sido registrado exitosamente","success")
        setTimeout(() => {
            window.location.reload();
          }, "2000");
    }
});

