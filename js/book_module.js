
const url = "https://biblioteca-cbtis265.herokuapp.com/api/libros/all";
const API_URL_registrarLibro = 'https://biblioteca-cbtis265.herokuapp.com/api/libros/registrar';
//const tablaLibros = document.getElementById('tabla-libros');
//const tablaLibros2 = document.getElementById('body-tabla');
var table = document.getElementById("tabla")
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    // Hacer algo con los datos obtenidos
    let cuerpoTabla = document.getElementById('body-tabla')
    data.forEach(libro => {
      let fila = document.createElement("tr")
      let libro_isbn = fila.appendChild(document.createElement("td"))
      libro_isbn.appendChild(document.createTextNode(`${libro.isbn}`))
      
      let libro_titulo = fila.appendChild(document.createElement("td"))
      libro_titulo.appendChild(document.createTextNode(`${libro.titulo}`))

      let libro_autor = fila.appendChild(document.createElement("td"))
      libro_autor.appendChild(document.createTextNode(`${libro.autor}`))

      let libro_editorial = fila.appendChild(document.createElement("td"))
      libro_editorial.appendChild(document.createTextNode(`${libro.editorial}`))

      let libro_edicion = fila.appendChild(document.createElement("td"))
      libro_edicion.appendChild(document.createTextNode(`${libro.edicion}`))

      let libro_anioP = fila.appendChild(document.createElement("td"))
      libro_anioP.appendChild(document.createTextNode(`${libro.anioPublicacion}`))

      let libro_cantidad = fila.appendChild(document.createElement("td"))
      libro_cantidad.appendChild(document.createTextNode(`${libro.cantidad}`))
      /*
      let tabla = document.createElement("div");
      tabla.className = "table-responsive";
      let fila = tabla.appendChild(document.createElement("div"));
      fila.className = "div-table";
      fila.style = "margin:0 !important;";
      let registro = fila.appendChild(document.createElement("div"));
      registro.className = "div-table-row div-table-row-list";
      let libro_isbn = registro.appendChild(document.createElement("div"));
      libro_isbn.className = "div-table-cell";
      libro_isbn.style = "width: 6%;";
      libro_isbn.appendChild(
        document.createTextNode(`${libro.isbn}`)
      );
      let libro_titulo = registro.appendChild(document.createElement("div"));
      libro_titulo.className = "div-table-cell";
      libro_titulo.style = "width: 15%;";
      libro_titulo.appendChild(
        document.createTextNode(`${libro.titulo}`)
      );
      let libro_autor = registro.appendChild(document.createElement("div"));
      libro_autor.className = "div-table-cell";
      libro_autor.style = "width: 15%;";
      libro_autor.appendChild(
        document.createTextNode(`${libro.autor}`)
      );  
      let libro_editorial = registro.appendChild(document.createElement("div"));
      libro_editorial.className = "div-table-cell";
      libro_editorial.style = "width: 15%;";
      libro_editorial.appendChild(
        document.createTextNode(`${libro.editorial}`)
      );
      let libro_edicion= registro.appendChild(document.createElement("div"));
      libro_edicion.className = "div-table-cell";
      libro_edicion.style = "width: 12%;";
      libro_edicion.appendChild(
        document.createTextNode(`${libro.edicion}`)
      );
      let libro_anioP = registro.appendChild(document.createElement("div"));
      libro_anioP.className = "div-table-cell";
      libro_anioP.style = "width: 10%;";
      libro_anioP.appendChild(
        document.createTextNode(`${libro.anioPublicacion}`)
      );
      let libro_existencia = registro.appendChild(document.createElement("div"));
      libro_existencia.className = "div-table-cell";
      libro_existencia.style = "width: 9%;";
      libro_existencia.appendChild(
        document.createTextNode(`${libro.cantidad}`)
      );
      let acciones = registro.appendChild(document.createElement("div"));
      acciones.className = "div-table-cell";
      acciones.style = "width: 10%;";*/
      let acciones = fila.appendChild(document.createElement("td"))
      let boton = document.createElement("button");
      boton.className = "btn btn-success";
      boton.title="Actualizar"
      let logo = document.createElement("i")
      logo.className = "zmdi zmdi-refresh"
      boton.appendChild(logo);
      acciones.appendChild(boton);
      boton.addEventListener('click', function(){
        //activamos el modal
        //$(document).ready(function(){
        //});
        //$('.btn-success').on('click', function(){
        $('#ModalEdit').modal({
            show: true,
            backdrop: "static"
        });
        //});
        /*
        document.getElementById("#ModalEdit").modal({
          show:true,
          backdrop: "static"
        })*/
        //seteamos los valores del libro
        document.getElementById('isbn-input').value =libro.isbn;
        document.getElementById('titulo-input').value =libro.titulo;
        document.getElementById('autor-input').value =libro.autor;
        document.getElementById('editorial-input').value =libro.editorial;
        document.getElementById('edicion-input').value =libro.edicion;
        document.getElementById('anioP-input').value =libro.anioPublicacion;
        document.getElementById('descripcion-input').value =libro.descripcion;
        document.getElementById('cantidad-input').value =libro.cantidad;
        //Guardamos los datos del libro a guardar
        document.getElementById("boton-actualizar").addEventListener('click', ()=>{
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
          window.confirm("El libro ha sido actualizado");
          window.location.reload();
      });
      })
      
      //let libro_botonEliminar = fila.appendChild(document.createElement("td"))
      let botonE = document.createElement("button");
      botonE.className = "btn btn-danger";
      botonE.title = "Eliminar"
      let logoE = document.createElement("i")
      logoE.className = "zmdi zmdi-delete"
      botonE.appendChild(logoE);
      acciones.appendChild(botonE);
      botonE.addEventListener('click', function(){
        fetch(`https://biblioteca-cbtis265.herokuapp.com/api/libros/eliminar/${libro.isbn}`, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json'
          }
        })
          .then(response => {
            if (response.ok) {
              console.log('Libro eliminado correctamente');
              window.alert("El libro ha sido eliminado correctamente")
              window.location.reload()
            } else {
              console.error('Error al eliminar el libro:', response.status);
            }
          })
          .catch(error => {
            console.error('Error en la solicitud:', error);
          });
      })
      cuerpoTabla.appendChild(fila);
    });
    //tablaLibros.appendChild(table)
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
  });
  
document.getElementById("boton-cerrar").addEventListener('click',function(){
  window.location.reload();
})
document.getElementById("boton-cancelar").addEventListener('click',function(){
  window.location.reload();
})
  