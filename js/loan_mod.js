const url_estudiante = 'https://biblioteca-cbtis265.herokuapp.com/api/prestamos/registrar';

const data_estudiante = {
  // Coloca aquí los datos que deseas enviar en el cuerpo de la solicitud
  // Ejemplo: { usuario: 'John Doe', libro: 'Harry Potter' }
  numeroControl: document.getElementById("input-Ncontrol").value,
	nombreEstudiante: document.getElementById("input-nombreE").value,
	gradoEstudiante: document.getElementById("input-gradoE").value,
	grupoEstudiante: document.getElementById("input-grupoE").value,
	correoEstudiante: document.getElementById("input-emailE").value,
	telefonoEstudiante: document.getElementById("input-telefonoE").value
};

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(result => {
    console.log('Respuesta:', result);
    // Aquí puedes realizar las acciones necesarias con la respuesta obtenida
  })
  .catch(error => {
    console.error('Error:', error);
    // Aquí puedes manejar el error en caso de que ocurra
  });


const url = 'https://biblioteca-cbtis265.herokuapp.com/api/prestamos/registrar';
const boton_prestar = document.getElementById("boton-prestar");
const data = {
  // Coloca aquí los datos que deseas enviar en el cuerpo de la solicitud
  // Ejemplo: { usuario: 'John Doe', libro: 'Harry Potter' }
  
};

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(result => {
    console.log('Respuesta:', result);
    // Aquí puedes realizar las acciones necesarias con la respuesta obtenida
  })
  .catch(error => {
    console.error('Error:', error);
    // Aquí puedes manejar el error en caso de que ocurra
  });