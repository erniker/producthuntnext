export default function newProductValidation(values) {
  let errors = {};

  // Validate name of user
  if (!values.name) {
    errors.name = "El nombre es obligatorio.";
  }

  // Validate company
  if (!values.company) {
    errors.company = "El nombre de la empresa es obligatorio.";
  }

  // Validate url
  if (!values.url) {
    errors.url = "La URL del producto es obligatoria.";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errors.url = "La URL no es válida.";
  }

  // Validate description
  if (!values.description) {
    errors.description = "La descripción del producto es obligatoria.";
  }

  return errors;
}
