const url = "https://biblioteca-cbtis265.herokuapp.com/api/reservas/";
const API_URL_horarios = "https://biblioteca-cbtis265.herokuapp.com/api/reservas/disponibilidad"

var tablaAgenda = document.getElementById('tabla');

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
    horas.forEach(hora => {
      let newOption = document.createElement("option")
      newOption.appendChild(document.createTextNode(hora))
      select_hora.appendChild(newOption)
    })
  })
  .catch(error => {
    // Manejo de errores en caso de que la solicitud falle
    console.error('Error al obtener los datos:', error);
  });

select_fecha.addEventListener('change', function () {
  while (select_hora.firstChild) {
    select_hora.removeChild(select_hora.firstChild)
  }
  console.log(select_fecha.selectedIndex)
  let horas = data_horarios[select_fecha.selectedIndex].horasDisponibles
  console.log(horas)
  horas.forEach(hora => {
    let newOption = document.createElement("option")
    newOption.appendChild(document.createTextNode(hora))
    select_hora.appendChild(newOption)
  })
})

fetch(url)
  .then(response => response.json())
  .then(data => {
    var cuerpoTabla = document.getElementById('body-tabla')
    data.forEach(registro => {
      let fila = document.createElement("tr")
      let profesor = fila.appendChild(document.createElement("td"))
      profesor.appendChild(document.createTextNode(`${registro.nombreProfesor}`))

      let clase = fila.appendChild(document.createElement("td"))
      clase.appendChild(document.createTextNode(`${registro.materia}`))

      let grupo = fila.appendChild(document.createElement("td"))
      grupo.appendChild(document.createTextNode(`${registro.grupo}`))

      let fechaR = fila.appendChild(document.createElement("td"))
      fechaR.appendChild(document.createTextNode(`${registro.fechaReserva}`))

      let horaI = fila.appendChild(document.createElement("td"))
      horaI.appendChild(document.createTextNode(`${registro.horaInicio}`))

      let horaF = fila.appendChild(document.createElement("td"))
      horaF.appendChild(document.createTextNode(`${registro.horaFin}`))

      let botonActualizar = document.createElement("button")
      botonActualizar.className = "btn btn-success";
      botonActualizar.title = "Actualizar"
      let logoA = document.createElement("i")
      logoA.className = "zmdi zmdi-refresh"
      botonActualizar.appendChild(logoA);

      botonActualizar.addEventListener("click", function () {
        $('#ModalEdit').modal({
          show: true,
          backdrop: "static"
        });
        document.getElementById("text-profesor").appendChild(document.createTextNode('Dato anterior: ' + registro.nombreProfesor))
        document.getElementById("text-materia").appendChild(document.createTextNode('Dato anterior: ' + registro.materia))
        document.getElementById("text-grado").appendChild(document.createTextNode('Dato anterior: ' + registro.grupo))
        document.getElementById("text-fecha").appendChild(document.createTextNode('Dato anterior: ' + registro.fechaReserva))
        document.getElementById("text-hora").appendChild(document.createTextNode('Dato anterior: ' + registro.horaInicio))
        //const reservaId = registro.id; // Reemplaza 123 con el ID de reserva correcto


        // Datos de la reserva a actualizar



        // Realizar la solicitud PUT
        let botonActualizar = document.getElementById("boton-actualizar")
        botonActualizar.addEventListener('click', function () {
          const apiUrl = `https://biblioteca-cbtis265.herokuapp.com/api/reservas/${registro.id}`;
          let horas = document.getElementById("select-hora").value
          const reservaActualizada = {
            // Incluye los campos que deseas actualizar
            nombreProfesor: document.getElementById("select-profesor").value,
            fechaReserva: document.getElementById("select-fecha").value,
            horaInicio: horas,
            horaFin: obtenerHoraSiguiente(horas),
            grupo: document.getElementById("select-grado").value + ' ' + document.getElementById("select-grupo").value,
            materia: document.getElementById("select-materia").value
            // ...
          };
          fetch(apiUrl, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reservaActualizada),
          })
            .then(response => {
              if (response.ok) {
                console.log('La petición se realizó correctamente.');
                // Puedes realizar las acciones necesarias cuando la petición se realiza correctamente
                window.alert("Se ha acutualizado la clase");
                window.location.reload()
              } else {
                console.log('Ocurrió un error durante la petición.');
                // Puedes manejar el error cuando la petición no se realiza correctamente
                window.alert("Ya esta ocupada esa hora")
              }
              return response.json();
            })
            .then(data => {
              console.log("Respuesta de la API:", data);
              // Aquí puedes realizar acciones adicionales con la respuesta de la API
            })
            .catch(error => {
              console.error("Error al realizar la solicitud:", error);
            });
        })

      })

      let div_boton = fila.appendChild(document.createElement("td"))
      let boton = document.createElement("button")
      boton.className = "btn btn-danger"
      boton.addEventListener("click", function () {
        fetch(`https://biblioteca-cbtis265.herokuapp.com/api/reservas/${registro.id}`, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json'
          }
        })
          .then(function (response) {
            if (response.status == 204) {
              window.alert("Se ha eliminado la reservación")
              window.location.reload(); // Recarga la página si la respuesta es exitosa
            } else {
              throw new Error('Error en la respuesta de la solicitud');
            }
          })
          .catch(function (error) {
            console.error(error);
          });
      })
      let icono_boton = document.createElement("i")
      icono_boton.className = "zmdi zmdi-delete"
      boton.appendChild(icono_boton)
      boton.title = "Eliminar"
      div_boton.appendChild(botonActualizar)
      div_boton.appendChild(boton)
      cuerpoTabla.appendChild(fila)
    });
    $(document).ready(function () {
      let dtable = $(tablaAgenda).DataTable({
        language: {
          url: "assets/utils/es-ES.json",
        },
        responsive: true,
        autoWidth: false,
        dom: "Blfrtip",
        pageLength: 10,
        lengthMenu: [
          [5, 10, 15, 20, 50],
          [
            "5",
            "10",
            "15",
            "20",
            "50",
          ],
        ],
      });
    })
  })

document.getElementById("boton-cerrar").addEventListener('click', function () {
  window.location.reload();
})
document.getElementById("boton-cancelar").addEventListener('click', function () {
  window.location.reload();
})

function obtenerHoraSiguiente(hora) {
  var fecha = new Date('2000-01-01 ' + hora);

  fecha.setHours(fecha.getHours() + 1);

  var horas = ("0" + fecha.getHours()).slice(-2);
  var minutos = ("0" + fecha.getMinutes()).slice(-2);
  var segundos = ("0" + fecha.getSeconds()).slice(-2);

  return horas + ":" + minutos + ":" + segundos;
}