const API_URL_ingresar = "https://biblioteca-cbtis265.herokuapp.com/api/auth/ingresar";
const boton_ingresar = document.getElementById("boton-log-in");
const boton_ingresar_icon = document.getElementById("btn-login-icon")
const icon_arrow = "zmdi-arrow-right";
const icon_loading = "zmdi-spinner"
const icon_animation = "zmdi-rotate-right"
const expirationHours = 4;

boton_ingresar.addEventListener('click', () => {
    boton_ingresar_icon.classList.remove(icon_arrow)
    boton_ingresar_icon.classList.add(icon_loading)
    if(document.getElementById("name").value=="" ||
        document.getElementById("password").value == ""){
            window.alert("Falta completar el formulario")
    }else{
        const user = {
            username: document.getElementById("name").value,
            password: document.getElementById("password").value
        }
        console.log(user);
        fetch(API_URL_ingresar,{
            method:'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            const bearerToken = data.token;
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime()+expirationHours*60*60*1000);
            const cookieValue = `token = ${bearerToken};expires=${expirationDate.toUTCString()};path=/`;
            document.cookie = cookieValue;
            console.log('Cookie "token" creada con éxito',data.username);
            sessionStorage.setItem('usuario',data.username);
            document.location.replace("home.html");
            
    boton_ingresar_icon.classList.add(icon_arrow)
    boton_ingresar_icon.classList.remove(icon_loading)
        })
        .catch(err => {
            console.log(err)
            window.alert("Credenciales incorrectas")
            
    boton_ingresar_icon.classList.add(icon_arrow)
    boton_ingresar_icon.classList.remove(icon_loading)
        })
    }
});