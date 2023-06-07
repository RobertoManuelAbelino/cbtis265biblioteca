const API_URL_manager = fetch("https://biblioteca-cbtis265.herokuapp.com/api/auth/usuarios");
var table = document.getElementById("tabla")
function getManagers(done) {
    API_URL_manager
        .then(response => response.json())
        .then(data => {
            done(data)
        });
        
}

getManagers(data => {
    let cuerpoTabla = document.getElementById("body-tabla")
    data.forEach(usuario => {
        if (usuario.roles[0].name === "ROLE_LIBRARIAN") {
            let fila = document.createElement("tr")
            let id = fila.appendChild(document.createElement("td"))
            id.appendChild(document.createTextNode(`${usuario.id}`))

            let nombre = fila.appendChild(document.createElement("td"))
            nombre.appendChild(document.createTextNode(`${usuario.nombre}`))

            let apellidos = fila.appendChild(document.createElement("td"))
            apellidos.appendChild(document.createTextNode(`${usuario.apellidos}`))

            let nombreUsuario = fila.appendChild(document.createElement("td"))
            nombreUsuario.appendChild(document.createTextNode(`${usuario.username}`))

            let rol = fila.appendChild(document.createElement("td"))
            rol.appendChild(document.createTextNode('Bibliotecario'))
            /*
            const registro = document.createRange().createContextualFragment(
                `<div class="div-table-row">
                <div class="div-table-cell">${usuario.id}</div>
                <div class="div-table-cell">${usuario.nombre}</div>
                <div class="div-table-cell">${usuario.apellidos}</div>
                <div class="div-table-cell">${usuario.username}</div>
                <div class="div-table-cell">${usuario.roles[0].name}</div>
            </div>`
            );*/
            //const main = document.querySelector("#app");
            cuerpoTabla.appendChild(fila);
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
