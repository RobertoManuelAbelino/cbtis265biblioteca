const nombre_usuario = sessionStorage.getItem('usuario');

function getUsuario(){
    const registro = document.createRange().createContextualFragment(
        `<span class="all-tittles">${nombre_usuario}</span>`
    );
    const main = document.querySelector("#getName");
    main.appendChild(registro);
}
getUsuario();