// Se captura la referencia del primer elemento form encontrado en el DOM
const formulario = document.querySelector('#formulario');

// Ejemplo de cómo capturar las referencias de todos los inputs que se encuentran dentro 
// del primer elemento form encontrado en el DOM
const inputNodes = document.querySelectorAll("form input")
console.log(inputNodes[0])


// La siguiente codificación se logra haciendo -> btoa('mateo@gmail.com:123')
const savedUserCredentials = "bWF0ZW9AZ21haWwuY29tOjEyMw=="; // base64
function login(payload) {
    if (payload === savedUserCredentials) {
        return true;
    } else {
        return false;
    }
}

function createAlert(alertType, message) {
    return `
    <div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    // Cuando el usuario hace click en Ingresar, se obtienen los valores de los inputs
    const user = document.getElementById('floatingInput').value;
    const password = document.getElementById('floatingPassword').value

    // Se obtiene la referencia del div donde se mostrarán mensajes al usuario
    const alertDiv = document.getElementById('alerts');

    // Se codifican en base64 los datos ingresados por el usuario para comparar con 
    // los almacenados en la variable global userCredencials
    const payload = btoa(`${user}:${password}`);

    // Se validan los datos ingresados por el usuario en el formulario
    const isUserValid = login(payload)

    if (isUserValid) {
        const alert = createAlert('success', 'Login Correcto! Bienvenid@')
        alertDiv.innerHTML = alert;

        // Redirección a la página principal después de 3 segundos
        setTimeout(() => {
            location.href = '../landing/index.html'
        }, 3000);
    } else {
        const alert = createAlert('danger', 'Usuario o contraseña incorrectos!')
        alertDiv.innerHTML = alert;
        document.getElementById('password').value = ""
    }






});