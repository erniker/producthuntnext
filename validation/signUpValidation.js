export default function signUpValidation(values) {
  let errors = {};

  // Validate name of user
  if (!values.name) {
    errors.name = "El nombre es obligatorio";
  }

  // Validate email of user
  if (!values.email) {
    errors.email = "El email es obligatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "El email no es válido";
  }

  // Validate password
  if (!values.password) {
    errors.password = "El password es obligatorio";
  } else if (values.password.length < 6) {
    errors.password = "El password debe ser de al enos 6 caracteres";
  }

  return errors;
}

// // validar URL

// !/^(ftp|http|https):\/\/[^ "]+$/
