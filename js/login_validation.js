document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('.main__login__form');

  form.addEventListener('submit', (event) => {
    if (!validateForm()) {
      console.log(
        'El formulario no es válido. Por favor, corrige los errores.'
      );
      event.preventDefault(); // Evita que el formulario se envíe si hay errores de validación
    } else {
      console.log('El formulario es válido. Enviar datos...');
    }
  });

  const validateForm = () => {
    let isValid = true;

    isValid =
      validateEmailField('email', 'El correo electronico no es válido') &&
      isValid;

    isValid =
      validateField('password', 'La contraseña es obligatoria') && isValid;

    return isValid;
  };

  //validar un capo especifico
  const validateField = (fieldID, errorMessage) => {
    const field = document.getElementById(fieldID);
    const value = field.value.trim();
    if (value === '') {
      setErrorFor(field, errorMessage);
      return false;
    } else {
      setSuccessFor(field);
      return true;
    }
  };

  //Valida el campo de correo electrónico
  const validateEmailField = (fieldID, errorMessage) => {
    const field = document.getElementById(fieldID);

    const value = field.value.trim();

    if (value === '') {
      setErrorFor(field, 'El correo electrónico es obligatorio');
      return false;
    } else if(!isEmail(value)){
      setErrorFor(field,errorMessage);
      return false;
    } else{
      setSuccessFor(field);
      return true;
    }
  };

  //Establece el mensaje de error en un campo
  const setErrorFor = (input, message) => {
    const formControl = input.closest('fieldset');

    const errorText = formControl.querySelector('.error-text');

    formControl.classList.add('error');

    errorText.innerText = message;
    input.classList.add('error');
    console.log(input);
    input.focus();
  };

  //Elimina el mensaje de error de un capo
  const setSuccessFor = (input) => {
    const formControl = input.closest('fieldset');

    formControl.classList.remove("error");

    const errorText = formControl.querySelector('.error-text');

    errorText.innerText = '';
  };

  //Valida si una cedena de es una dirección de correo válida
  const isEmail = (email) => {
    // Expresión regular para validar el formato de correo electrónico
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
  };

  // Agrega eventos para borrar las clases de error cuando se completa el input o se presiona Tab
  form.querySelectorAll('input').forEach((input) => {
    input.addEventListener('input', () => {
      const value = input.value.trim();

      if (value !== "") {
        setSuccessFor(input);
      }
    });
  });

  //Agrega eventos para borrar las clases de error cuando se selecciona una opción del select
  form.querySelectorAll('select').forEach((select) => {
    const value = select.value;

    if (value !== "") {
      setSuccessFor(select);
    }
  });
});
