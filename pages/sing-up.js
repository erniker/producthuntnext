import React from "react";
import { css } from "@emotion/react";
import Layout from "../components/layout/Layout";
import { Form, Field, InputSubmit } from "../components/ui/Form";

//Validations
import useValidation from "../hooks/useValidation";
import signUpValidation from "../validation/signUpValidation";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

const SingUp = () => {
  const {
    values,
    errors,
    submitForm,
    handleSubmit,
    handleChange,
  } = useValidation(INITIAL_STATE, signUpValidation, createAcount);

  function createAcount() {
    console.log("Creando cuenta...");
  }

  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Crear cuenta
          </h1>
          <Form>
            <Field>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="name"
                placeholder="Tu Nombre"
                name="name"
              />
            </Field>
            <Field>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Tu Email"
                name="email"
              />
            </Field>
            <Field>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Tu Password"
                name="password"
              />
            </Field>
            <InputSubmit type="submit" value="Crear Cuenta"></InputSubmit>
          </Form>
        </>
      </Layout>
    </div>
  );
};

export default SingUp;
