
export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoDeInput, input);
  }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesDeError = {
  nombre: {
    valueMissing: "El campo nombre no puede estar vacío",
  },
  email: {
    valueMissing: "El campo correo no puede estar vacío",
    typeMismatch: "El correo no es válido",
  },
  password: {
    valueMissing: "El campo contraseña no puede estar vacío",
    patternMismatch:
      "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
  },
  nacimiento: {
    valueMissing: "Este campo no puede estar vacío",
    customError: "Debes tener al menos 18 años de edad",
  },
  numero: {
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch: "Este formato requerido es xxxxxxxxxx, 10 numeros" 
  },
  direccion:{
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch:" Este campo debe tener entre 10 y 40 caracteres"
  },
  cuidad:{
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch:" Este campo debe tener entre 10 y 40 caracteres"
  },
  provincia:{
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch:" Este campo debe tener entre 10 y 40 caracteres"
  }
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje = "";
  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      console.log(tipoDeInput, error);
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoDeInput][error]);
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}


function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    mayorEdad(fechaCliente);

    let mensaje = " "
      if (!mayorEdad(fechaCliente)) {
          mensaje = "Debes tener 18 años de edad o más";        
      }

    input.setCustomValidity(mensaje)
}

function mayorEdad(fecha) {
  const fechaActual = new Date();
  const difreneciaFecha = new Date(// saber si una persona es mayor o no de edad
   fecha.getUTCFullYear()+ 18,
   fecha.getUTCMonth(),
   fecha.getUTCDate()
   );
  return difreneciaFecha <= fechaActual;

};