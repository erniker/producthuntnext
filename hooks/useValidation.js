import React, { useState, useEffect } from "react";

const useValidation = (initialState, validate, fn) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        fn(); // fn is a function that is execute in the component: login, newProduct...
      }
      setSubmitForm(false);
    }
  }, [errors]);

  // Function that executing while user is writting
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // Function that execute whe user submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const valuesErrors = validate(values);
    setErrors(valuesErrors);
    setSubmitForm(true);
  };

  // when occur blur event
  const handleBlur = () => {
    const valuesErrors = validate(values);
    setErrors(valuesErrors);
  };

  return {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  };
};

export default useValidation;
