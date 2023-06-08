const API_URL_librarian = "https://biblioteca-cbtis265.herokuapp.com/api/auth/registrar";
const inputs = document.querySelectorAll('#librarian-form input');
const boton_guardar = document.getElementById("boton-save-personal");
let passwd = false;
let flagRegex = false;
const validaciones = {
    longitud: false,
    mayusculas: false,
    minusculas: false,
    caracteres: false,
    numero: false
}
const regex = /^.{8,15}$/


boton_guardar.addEventListener('click', () => {
    console.log(passwd + " " + flagRegex + " " + validaciones.longitud + " " + validaciones.mayusculas + " " +
        validaciones.minusculas + " " + validaciones.caracteres + " " + validaciones.numero);
    if (document.getElementById("username-input").value == "" ||
        document.getElementById("nombre-input").value == "" ||
        document.getElementById("apellidos-input").value == "" ||
        document.getElementById("password-input").value == "") {
        swal("Error","Hace falta rellenar algun(os) campo(s) del formulario","error");
    } else if (passwd && flagRegex && validaciones.longitud && validaciones.mayusculas &&
        validaciones.minusculas && validaciones.caracteres && validaciones.numero) {
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
        swal("Éxito","El encargado ha sido registrado","success");
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
            checkPasswordStrength(document.getElementById("password-input").value);
            validarRegex();
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

const validarRegex = () => {
    const psw1 = document.getElementById("password-input").value;
    if (regex.test(psw1)) {
        flagRegex = true;
    } else {
        flagRegex = false;
    }
}

$("#password-input").bind("keydown",function(e){
    if(e.keyCode==32){
        e.preventDefault()
    console.log(e.keyCode)}
})

$("#password2-input").bind("keydown",function(e){
    if(e.keyCode==32){
        e.preventDefault()
    console.log(e.keyCode)}
})

function checkPasswordStrength(password) {
    // Inicializar variables
    var strength = 0;
    var tips = "";

    // Validar longitud de la contraseña
    if (password.length < 8) {
        tips += "\nLa contraseña debe ser minimo de 8 caracteres. ";
    } else {
        strength += 1;
        validaciones.longitud = true
    }

    // Validar para letras mayusculas
    if (password.match(/[A-Z]/)) {
        strength += 1;
        validaciones.mayusculas = true
    } else {
        tips += "\nIncluye al menos 1 letra mayúscula. ";
    }

    // Validar para letras minusculas
    if (password.match(/[a-z]/)) {
        strength += 1;
        validaciones.minusculas = true
    } else {
        tips += "\nIncluye al menos 1 letra minúscula.";
    }

    // Validar para numeros
    if (password.match(/\d/)) {
        strength += 1;
        validaciones.numero = true
    } else {
        tips += "\nIncluye al menos 1 número.";
    }

    // Validar para caracteres especiales
    if (password.match(/[^a-zA-Z\d]/)) {
        strength += 1;
        validaciones.caracteres = true
    } else {
        tips += "\nIncluya al menos 1 carácter especial. (@ ! # $ % & * _ = + -)";
    }

    // Obtener el elemento de párrafo
    const strengthElement = document.getElementById("checking");

    // Return results
    if (strength < 2) {
        strengthElement.innerText = "❌Fácil de adivinar. " + tips;
        document.querySelector(`.group-material .formulario__input-error02`).classList.add('formulario__input-error02-activo01');
        document.querySelector(`.group-material .formulario__input-error02`).classList.remove('formulario__input-error02-activo02');
        document.querySelector(`.group-material .formulario__input-error02`).classList.remove('formulario__input-error02-activo03');
        document.querySelector(`.group-material .formulario__input-error02`).classList.remove('formulario__input-error02-activo04');
        //strengthElement.style.color = "red";
    } else if (strength === 2) {
        strengthElement.innerText = "🤏Dificultad media. " + tips;
        document.querySelector(`.group-material .formulario__input-error02`).classList.add('formulario__input-error02-activo02');
        document.querySelector(`.group-material .formulario__input-error02`).classList.remove('formulario__input-error02-activo01');
        document.querySelector(`.group-material .formulario__input-error02`).classList.remove('formulario__input-error02-activo03');
        document.querySelector(`.group-material .formulario__input-error02`).classList.remove('formulario__input-error02-activo04');
        //strengthElement.style.color = "orange";
    } else if (strength === 3) {
        strengthElement.innerText = "✔️Difícil. " + tips;
        document.querySelector(`.group-material .formulario__input-error02`).classList.add('formulario__input-error02-activo03');
        document.querySelector(`.group-material .formulario__input-error02`).classList.remove('formulario__input-error02-activo01');
        document.querySelector(`.group-material .formulario__input-error02`).classList.remove('formulario__input-error02-activo02');
        document.querySelector(`.group-material .formulario__input-error02`).classList.remove('formulario__input-error02-activo04');
        //strengthElement.style.color = "black";
    } else if (strength === 4) {
        strengthElement.innerText = "✔️Difícil. " + tips;
        document.querySelector(`.group-material .formulario__input-error02`).classList.add('formulario__input-error02-activo03');
        document.querySelector(`.group-material .formulario__input-error02`).classList.remove('formulario__input-error02-activo01');
        document.querySelector(`.group-material .formulario__input-error02`).classList.remove('formulario__input-error02-activo02');
        document.querySelector(`.group-material .formulario__input-error02`).classList.remove('formulario__input-error02-activo04');
        //strengthElement.style.color = "black";
    } else {
        strengthElement.innerText = "✅Extremadamente difícil. " + tips;
        document.querySelector(`.group-material .formulario__input-error02`).classList.add('formulario__input-error02-activo04');
        document.querySelector(`.group-material .formulario__input-error02`).classList.remove('formulario__input-error02-activo01');
        document.querySelector(`.group-material .formulario__input-error02`).classList.remove('formulario__input-error02-activo02');
        document.querySelector(`.group-material .formulario__input-error02`).classList.remove('formulario__input-error02-activo03');
        //strengthElement.style.color = "green";
    }
}