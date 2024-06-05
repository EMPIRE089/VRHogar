const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
nombre:/^[a-zA-ZÁ-ÿ\s]{1,40}$/,//Letras y espacios,pueden llevar acentos.
mail: /[a-zA-Z0-9.+-]+@[a-zA-Z0-9-]+\.[a-zA-z0-9-.]+$/,
contraseña:/^.{4,12}$/ //4 a 12 digitos
}

const campos = {
	nombre: false,
	contraseña: false,
	mail: false,
}

const validarFormulario = (e) => {
    switch(e.target.name){
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
        break;
        
        case "mail":
            validarCampo(expresiones.mail, e.target, 'mail');
        break;
            
        case "contraseña":
            validarCampo(expresiones.contraseña, e.target, 'contraseña');
			validarContraseña2();
        break;
            
        case "contraseña2":
            validarContraseña2();
        break;
    }
}

const validarCampo = (expresion, input, campo) => {

    if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .input-error`).classList.remove('input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .input-error`).classList.add('input-error-activo');
		campos[campo] = false;
	}
}

const validarContraseña2 = () => {
	const inputContraseña = document.getElementById('contraseña');
	const inputContraseña2 = document.getElementById('contraseña2');

	if(inputContraseña.value !== inputContraseña2.value){
		document.getElementById(`grupo__contraseña2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__contraseña2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__contraseña2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__contraseña2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__contraseña2 .input-error`).classList.add('input-error-activo');
		campos['contraseña'] = false;
	} 
    else {
		document.getElementById(`grupo__contraseña2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__contraseña2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__contraseña2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__contraseña2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__contraseña2 .input-error`).classList.remove('input-error-activo');
		campos['contraseña'] = true;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	if(campos.nombre && campos.mail && campos.contraseña && campos.contraseña2){
		
		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});