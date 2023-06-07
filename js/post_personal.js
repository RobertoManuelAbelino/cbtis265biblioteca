const API_URL_librarian = "https://biblioteca-cbtis265.herokuapp.com/api/auth/registrar";
const inputs = document.querySelectorAll('#librarian-form input');
const boton_guardar = document.getElementById("boton-save-personal");
let passwd = false;

boton_guardar.addEventListener('click', () => {
    console.log(passwd);
    if (passwd) {
        const newPersonal = {
            username: document.getElementById("username-input").value,
            role: 'librarian',
            nombre: document.getElementById("nombre-input").value,
            apellidos: document.getElementById("apellidos-input").value,
            password: document.getElementById("password-input").value
        }
        console.log(newPersonal)
        fetch(API_URL_librarian, {
            method: 'POST',
            body: JSON.stringify(newPersonal),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log('Solicitud fallida', err))
        window.confirm("El encargado ha sido registrado");
    }
});

const validarPassword2 = () => {
    const psw1 = document.getElementById("password-input").value;
    const psw2 = document.getElementById("password2-input").value;
    if (psw1 !== psw2) {
        document.querySelector(`.group-material .formulario__input-error`).classList.add('formulario__input-error-activo');
        passwd = false;
    } else {
        document.querySelector(`.group-material .formulario__input-error`).classList.remove('formulario__input-error-activo');
        passwd = true;
    }
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "password-input":
            validarPassword2();
            break;
        case "password2-input":
            validarPassword2();
            break;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});
