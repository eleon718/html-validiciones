/* const inputNacimiento = document.querySelector("#birth");

inputNacimiento.addEventListener("blur", (evento) => {
    validarNacimiento(evento.target);
}); */

export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

     
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid"); 
    }

}

const tipoDeErrores =  [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];


const mensajesDeError = {
    nombre:{
        valueMissing:"El campo nombre no puede estar vacio"
    },
    email:{
        valueMissing:"El campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password:{
        valueMissing:"El campo contraseña no puede estar vacio",
        patternMismatch: "Al menos 6 caracters, maximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento:{
        valueMissing:"El campo fecha de nacimiento no puede estar vacio",
        customError:  "Debes tener al menos 18 años"
    },
    numero:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX"
    },
    direccion:{
        valueMissing:"Esta campo no puede estar vacio.",
        patternMismatch:"La direccion debe contener entre 10 a 40 caracteres."
    },
    ciudad:{
        valueMissing:"Esta campo no puede estar vacio.",
        patternMismatch:"La ciudad debe contener entre 10 a 40 caracteres."
    },
    estado:{
        valueMissing:"Esta campo no puede estar vacio.",
        patternMismatch:"El estado debe contener entre 10 a 40 caracteres."
    },


};

const validadores = {
    nacimiento: input => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        if(input.validity[error]){
           console.log(error); 
           console.log(mensajesDeError[tipoDeInput][error]);
           mensaje = mensajesDeError[tipoDeInput][error];
        }
    });

    return mensaje;
};

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje)
}



function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear()+18, fecha.getUTCMonth(),fecha.getUTCDate());
    return diferenciaFechas <= fechaActual;
}