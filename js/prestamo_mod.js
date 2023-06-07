const API_URL_estudiantes = "https://biblioteca-cbtis265.herokuapp.com/api/estudiantes/"
const input_nControl = document.getElementById("input-Ncontrol");
let listaEstudiantes = null
let encontrado = false
fetch(API_URL_estudiantes)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("No se pudo obtener los datos del API. Código de estado: " + response.status);
    }
  })
  .then(data => {
    // Aquí puedes trabajar con los datos obtenidos, por ejemplo, imprimirlos
    listaEstudiantes = data
    console.log(listaEstudiantes)
  })
  .catch(error => {
    console.error(error);
  });

input_nControl.addEventListener("keyup" ,function(){
  console.log("lo que sea para ver ");
  console.log(event.target.value)
  listaEstudiantes.forEach(estudiante => { 
        if(estudiante.numeroControl == event.target.value){
            console.log("si entro jijijija")
            console.log(estudiante.nombreEstudiante)
            document.getElementById("input-nombreE").value = estudiante.nombreEstudiante
            document.getElementById("input-gradoE").value = estudiante.gradoEstudiante
            document.getElementById("input-grupoE").value = estudiante.grupoEstudiante
            document.getElementById("input-emailE").value = estudiante.correoEstudiante
            document.getElementById("input-telefonoE").value = estudiante.telefonoEstudiante
            encontrado = true
        }
        else{
          document.getElementById("input-nombreE").value = ""
            document.getElementById("input-gradoE").value = ""
            document.getElementById("input-grupoE").value = ""
            document.getElementById("input-emailE").value = ""
            document.getElementById("input-telefonoE").value = ""
            encontrado = false
        }
    });
})

const API_URL_libros = "https://biblioteca-cbtis265.herokuapp.com/api/libros/all"
const inputLibro = document.getElementById("input-isbn")
let libros = undefined
let disponibilidad = false
let libroencontrado = false
fetch(API_URL_libros)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("No se pudo obtener los datos del API. Código de estado: " + response.status);
    }
  })
  .then(data => {
    // Aquí puedes trabajar con los datos obtenidos, por ejemplo, imprimirlos
    libros = data
    console.log(libros)
    
  })
  .catch(error => {
    console.error(error);
  });

  const tiempoTranscurrido = Date.now();
  const API_URL_registrarEstudiante = "https://biblioteca-cbtis265.herokuapp.com/api/estudiantes/registrar"
  const API_URL_registrarPrestamo = "https://biblioteca-cbtis265.herokuapp.com/api/prestamos/registrar"
  const botonRegistrar = document.getElementById("boton-registrar")
  let msgFinal = ""
  botonRegistrar.addEventListener('click',function(){
    if(document.getElementById("input-Ncontrol").value == "" ||
    document.getElementById("input-nombreE").value == "" ||
    document.getElementById("input-gradoE").value == "" ||
    document.getElementById("input-grupoE").value == "" ||
    document.getElementById("input-emailE").value == "" ||
    document.getElementById("input-telefonoE").value =="" ||
    document.getElementById("input-isbn").value == "" 
    ){
      console.log(document.getElementById("input-fechaEstimada").value)
        window.alert("Hace falta rellenar algun(os) campo(s) del formulario")
    }else{
      libros.forEach(libro =>{
        console.log(document.getElementById("input-isbn").value)
        if(libro.isbn == document.getElementById("input-isbn").value){
            libroencontrado = true
            if(libro.cantidad >0){
                disponibilidad = true
            }
        }
        });
        if(libroencontrado == true){
                if(disponibilidad == true){
                    if(encontrado==false){
                        const nuevoEstudiante ={
                            numeroControl: document.getElementById("input-Ncontrol").value,
                            nombreEstudiante: document.getElementById("input-nombreE").value,
                            gradoEstudiante: document.getElementById("input-gradoE").value,
                            grupoEstudiante: document.getElementById("input-grupoE").value,
                            correoEstudiante: document.getElementById("input-emailE").value,
                            telefonoEstudiante: document.getElementById("input-telefonoE").value
                        }
            
                        fetch(API_URL_registrarEstudiante,{
                            method: 'POST',
                            body: JSON.stringify(nuevoEstudiante),
                            headers: {
                                "Content-type": "application/json"
                            }
                        })
                        .then(res => res.json())
                        .then(data => console.log(data))
                        msgFinal+="Un alumno nuevo se ha registrado\n"
                        
                    }
                    console.log(document.getElementById("input-fechaEstimada").value)
                    console.log(document.getElementById("input-isbn").value)
                    console.log(document.getElementById("input-Ncontrol").value)
                    const nuevoPrestamo = {
                        fechaEntrega: document.getElementById("input-fechaEstimada").value,
	                      libro: document.getElementById("input-isbn").value,
	                      estudiante: document.getElementById("input-Ncontrol").value
                    }
                    fetch(API_URL_registrarPrestamo,{
                        method: 'POST',
                        body: JSON.stringify(nuevoPrestamo),
                        headers: {
                            "Content-type": "application/json"
                        }
                    })
                    .then(res => {
                      msgFinal += "Prestamo realizado"
                      window.alert(msgFinal)
                      window.location.reload()
                    })
                    .then(data => console.log(data))
                    
                }
                else{
                    window.alert("Lo sentimos, pero el libro que solicitas no se encuentra disponible")
                }
            }
            else{
                window.alert("no existe ningun libro con ese isbn");
            }
        
        
    }
    
  })
