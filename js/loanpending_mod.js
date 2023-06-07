const url = "https://biblioteca-cbtis265.herokuapp.com/api/prestamos/";
var table = document.getElementById("tabla");
let datosPrestamos
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    // Hacer algo con los datos obtenidos
    datosPrestamos = data.data
    console.log(datosPrestamos);
    let bodyTabla = document.getElementById("body-tabla")
    datosPrestamos.forEach(prestamo => {
      if (prestamo.estadoPrestamo == 'ACTIVO') {
        let fila = document.createElement("tr")
        let isbn = fila.appendChild(document.createElement("td"))
        isbn.appendChild(document.createTextNode(`${prestamo.libro.isbn}`))

        let titulo = fila.appendChild(document.createElement("td"))
        titulo.appendChild(document.createTextNode(`${prestamo.libro.titulo}`))

        let ncontrol = fila.appendChild(document.createElement("td"))
        ncontrol.appendChild(document.createTextNode(`${prestamo.estudiante.numeroControl}`))

        let nombreEstudiante = fila.appendChild(document.createElement("td"))
        nombreEstudiante.appendChild(document.createTextNode(`${prestamo.estudiante.nombreEstudiante}`))

        let fechaPrestamo = fila.appendChild(document.createElement("td"))
        fechaPrestamo.appendChild(document.createTextNode(`${prestamo.fechaPrestamo}`))

        let fechaEntrega = fila.appendChild(document.createElement("td"))
        fechaEntrega.appendChild(document.createTextNode(`${prestamo.fechaEntrega}`))
        /*
      fila.className = "div-table";
      fila.style = "margin:0 !important;";
      let registro = fila.appendChild(document.createElement("div"));
      registro.className = "div-table-row div-table-row-list";
  
      let libro_isbn = registro.appendChild(document.createElement("div"));
      libro_isbn.className = "div-table-cell";
      libro_isbn.style = "width: 10%;";
      libro_isbn.appendChild(
        document.createTextNode(`${prestamo.libro.isbn}`)
      );
  
      let libro_titulo = registro.appendChild(document.createElement("div"));
      libro_titulo.className = "div-table-cell";
      libro_titulo.style = "width: 22%;";
      libro_titulo.appendChild(
        document.createTextNode(`${prestamo.libro.titulo}`)
      );  
      let estudiante_nControl = registro.appendChild(document.createElement("div"));
      estudiante_nControl.className = "div-table-cell";
      estudiante_nControl.style = "width: 10%;";
      estudiante_nControl.appendChild(
        document.createTextNode(`${prestamo.estudiante.numeroControl}`)
      );
      let estudiante_nombre= registro.appendChild(document.createElement("div"));
      estudiante_nombre.className = "div-table-cell";
      estudiante_nombre.style = "width: 22%;";
      estudiante_nombre.appendChild(
        document.createTextNode(`${prestamo.estudiante.nombreEstudiante}`)
      );
      let fechaPrestamo = registro.appendChild(document.createElement("div"));
      fechaPrestamo.className = "div-table-cell";
      fechaPrestamo.style = "width: 10%;";
      fechaPrestamo.appendChild(
        document.createTextNode(`${prestamo.fechaPrestamo}`)
      );
      let fechaEntrega = registro.appendChild(document.createElement("div"));
      fechaEntrega.className = "div-table-cell";
      fechaEntrega.style = "width: 10%;";
      fechaEntrega.appendChild(
        document.createTextNode(`${prestamo.fechaEntrega}`)
      );
      let libro_botonActualizar = registro.appendChild(document.createElement("div"));
      libro_botonActualizar.className = "div-table-cell";
      libro_botonActualizar.style = "width: 8%;";*/
        let acciones = fila.appendChild(document.createElement("td"))

        let boton = document.createElement("button");
        boton.className = "btn btn-success";
        boton.id = "button-update";
        let logo = document.createElement("i")
        logo.className = "zmdi zmdi-refresh"
        boton.appendChild(logo);
        acciones.appendChild(boton);
        boton.addEventListener('click', function () {
          fetch(`https://biblioteca-cbtis265.herokuapp.com/api/prestamos/terminar/${prestamo.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            //body: JSON.stringify(data),
          })
            .then(response => {
              if (response.ok) {
                console.log("La solicitud PUT fue exitosa");
                window.alert("Se ha devuelto el libro " + prestamo.libro.titulo)
                //window.location.reload()
              } else {
                console.error(`Error en la solicitud PUT. Código de estado: ${response.status}`);
              }
            })
            .catch(error => {
              console.error("Error en la solicitud PUT:", error);
            });
        })
        bodyTabla.appendChild(fila);
      }
    });
    $(document).ready(function () {
      //table = document.getElementById("tabla");
      let dtable = $(table).DataTable({
              language: {
                  url: "assets/utils/es-ES.json",
              },
              //initComplete: function (settings, json) {
                //  $("#loading").fadeOut();
              //},
              responsive: true,
              autoWidth: false,
              //stateSave: true,
              dom: "Blfrtip",
              pageLength: 10,
              lengthMenu: [
                  [5,10, 15, 20, 50],
                  [
                      "5",
                      "10",
                      "15",
                      "20",
                      "50",
                  ],
              ],
              //buttons: ["pageLength"],
          });
          //$("#searchButton").on("click", function () {
          //    dtable.search($("#searchInput").val()).draw();
          //});
      })
  })
  .catch(function (error) {
    console.error(error);
  });

