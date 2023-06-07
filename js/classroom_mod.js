const API_URL_reservar = 'https://biblioteca-cbtis265.herokuapp.com/api/reservas';
const API_URL_horarios = "https://biblioteca-cbtis265.herokuapp.com/api/reservas/disponibilidad"

const boton_registrar = document.getElementById('buton-save-register');
const select_fecha = document.getElementById("select-fecha");
const select_hora = document.getElementById("select-hora");

let data_horarios
fetch(API_URL_horarios)
  .then(response => response.json())
  .then(data => {
    // Aquí puedes realizar las operaciones con los datos obtenidos
    console.log(data);
    data_horarios = data
    data_horarios.forEach(fecha => {
        let newOption = document.createElement("option")
        newOption.appendChild(document.createTextNode(`${fecha.fecha}`))
        select_fecha.appendChild(newOption)
    });
    console.log(select_fecha.selectedIndex)
    let horas = data_horarios[select_fecha.selectedIndex].horasDisponibles
    console.log(horas)
    horas.forEach(hora =>{
        let newOption = document.createElement("option")
        newOption.appendChild(document.createTextNode(hora))
        select_hora.appendChild(newOption)
    })
  })
  .catch(error => {
    // Manejo de errores en caso de que la solicitud falle
    console.error('Error al obtener los datos:', error);
  });

select_fecha.addEventListener('change', function(){
    while(select_hora.firstChild){
        select_hora.removeChild(select_hora.firstChild)
    }
    console.log(select_fecha.selectedIndex)
    let horas = data_horarios[select_fecha.selectedIndex].horasDisponibles
    console.log(horas)
    horas.forEach(hora =>{
        let newOption = document.createElement("option")
        newOption.appendChild(document.createTextNode(hora))
        select_hora.appendChild(newOption)
    })
})

boton_registrar.addEventListener('click', ()=>{
    
        let horas = document.getElementById("select-hora").value

        const nuevaReservacion = {
        nombreProfesor: document.getElementById("select-profesor").value,
	    fechaReserva: document.getElementById("select-fecha").value,
	    horaInicio: horas,
	    horaFin: obtenerHoraSiguiente(horas),
	    grupo: document.getElementById("select-grado").value+' '+document.getElementById("select-grupo").value,
	    materia: document.getElementById("select-materia").value
        }
    console.log(nuevaReservacion)
    fetch(API_URL_reservar, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaReservacion)
      })
        .then(response => {
            if (response.ok) {
              console.log('La petición se realizó correctamente.');
              // Puedes realizar las acciones necesarias cuando la petición se realiza correctamente
                window.alert("Se ha agendado la clase");
                window.location.reload()
            } else {
              console.log('Ocurrió un error durante la petición.');
              // Puedes manejar el error cuando la petición no se realiza correctamente
              window.alert("Esa fecha y hora ya se encuentra ocupada")
            }
            return response.json();
          })
        .then(result => {
          console.log('Respuesta del servidor:', result);
          // Aquí puedes manejar la respuesta del servidor
        })
        .catch(error => {
          console.error('Error:', error);
          // Aquí puedes manejar errores en caso de que la solicitud falle
        });
        
});
function obtenerHoraSiguiente(hora) {
    var fecha = new Date('2000-01-01 ' + hora); 
    
    fecha.setHours(fecha.getHours() + 1); 
    
    var horas = ("0" + fecha.getHours()).slice(-2);
    var minutos = ("0" + fecha.getMinutes()).slice(-2);
    var segundos = ("0" + fecha.getSeconds()).slice(-2);
    
    return horas + ":" + minutos + ":" + segundos;
  }