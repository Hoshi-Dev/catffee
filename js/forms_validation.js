document.addEventListener("DOMContentLoaded", () => {
    //Toma los dos formularios
    const loginForm = document.querySelector('.main__login__form');
    const registrationForm = document.querySelector('.main__registration__form');

    //Maneja el envío del formulario y la validación
    const handleFormSubmit = (form) => {
        form.addEventListener('submit', (event) => {
            if (!validateForm(form)) {
                console.log(`El formulario de ${form.classList.contains('main__login__form') ? 'login' : 'registro'} no es válido. Por favor, corrige los errores.`);
                event.preventDefault(); // Previene que se envíe el formulario si la validación falla
            } else {
                console.log(`El formulario de ${form.classList.contains('main__login__form') ? 'login' : 'registro'} es válido. Enviar datos...`);
            }
        });
    };

    const validateForm = (form) => {
        let isValid = true;


        if (form.classList.contains('main__login__form')) {
            // Valida campos específicos para el formulario de inicio de sesión
            isValid = validateEmailField(form, 'email', 'El correo electronico no es válido') && isValid;
            isValid = validateField(form, 'password', 'La contraseña es obligatoria') && isValid;
        } else if (form.classList.contains('main__registration__form')) {
            // Valida campos específicos para el formulario de registro
            isValid = validateField(form, 'name', 'El nombre es obligatorio') && isValid;
            isValid = validateField(form, 'lastname', 'El apellido es obligatorio') && isValid;
            isValid = validateEmailField(form, 'email', 'El correo electronico no es válido') && isValid;
            isValid = validateField(form, 'password', 'La contraseña es obligatoria') && isValid;
            isValid = validateField(form, 'date', 'La fecha de nacimiento es obligatoria') && isValid;
            isValid = validateField(form, 'pais', 'El país es obligatorio') && isValid;
            isValid = validateCheckbox(form, 'terms', 'Debes aceptar los términos y condiciones') && isValid;
        }

        return isValid;
    };

    // Valida un campo específico del formulario
    const validateField = (form, fieldID, errorMessage) => {
        const field = form.querySelector(`#${fieldID}`);
        const value = field.value.trim();
        if (value === '') {
            setErrorFor(field, errorMessage);
            return false;
        } else {
            setSuccessFor(field);
            return true;
        }
    };

    // Valida el campo de correo electrónico
    const validateEmailField = (form, fieldID, errorMessage) => {
        const field = form.querySelector(`#${fieldID}`);
        const value = field.value.trim();

        if (value === '') {
            setErrorFor(field, 'El correo electrónico es obligatorio');
            return false;
        } else if (!isEmail(value)) {
            setErrorFor(field, errorMessage);
            return false;
        } else {
            setSuccessFor(field);
            return true;
        }
    };

    // Valida el checkbox de términos y condiciones
    const validateCheckbox = (form, fieldID, errorMessage) => {
        const field = form.querySelector(`#${fieldID}`);
        if (!field.checked) {
            setErrorFor(field, errorMessage);
            return false;
        } else {
            setSuccessFor(field);
            return true;
        }
    };

    // Establece el mensaje de error para un campo específico
    const setErrorFor = (input, message) => {
        const formControl = input.closest('fieldset') || input.closest('div');
        let errorText = formControl.querySelector('.error-text');

        if (!errorText) {
            errorText = document.createElement('span');
            errorText.className = 'error-text';
            formControl.appendChild(errorText);
        }

        formControl.classList.add('error');
        errorText.innerText = message;
        input.classList.add('error');
        input.focus();
    };

    // Elimina el mensaje de error para un campo específico
    const setSuccessFor = (input) => {
        const formControl = input.closest('fieldset') || input.closest('div');
        formControl.classList.remove("error");
        const errorText = formControl.querySelector('.error-text');

        if (errorText) {
            errorText.innerText = '';
        }

        input.classList.remove('error');
    };

    // Verifica si una cadena de texto es un correo electrónico válido
    const isEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // Agrega eventos de entrada para validar los campos del formulario
    const addInputListeners = (form) => {
        form.querySelectorAll('input').forEach((input) => {
            input.addEventListener('input', () => {
                const value = input.value.trim();
                if (value !== "") {
                    setSuccessFor(input);
                }
            });
        });

        form.querySelectorAll('select').forEach((select) => {
            select.addEventListener('change', () => {
                const value = select.value;
                if (value !== "") {
                    setSuccessFor(select);
                }
            });
        });
    };

    // Maneja el envío del formulario y la validación para el formulario de inicio de sesión
    if (loginForm) {
        handleFormSubmit(loginForm);
        addInputListeners(loginForm);
    }

    // Maneja el envío del formulario y la validación para el formulario de registro
    if (registrationForm) {
        handleFormSubmit(registrationForm);
        addInputListeners(registrationForm);
    }
});
