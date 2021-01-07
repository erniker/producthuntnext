import React, { useState } from "react";
import { css } from "@emotion/react";
import Router from "next/router";
import Layout from "../components/layout/Layout";
import { Form, Field, InputSubmit, Error } from "../components/ui/Form";

//Firebase
import firebase from "../firebase";

//Validations
import useValidation from "../hooks/useValidation";
import signUpValidation from "../validation/signUpValidation";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const [error, saveError] = useState(false);

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidation(INITIAL_STATE, signUpValidation, createAcount);

  // Destructure values
  const { name, email, password } = values;

  async function createAcount() {
    try {
      await firebase.signUp(name, email, password);
      Router.push("/");
    } catch (error) {
      console.error("Error creating user.", error.message);
      saveError(error.message);
    }
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
          <Form onSubmit={handleSubmit} noValidate>
            <Field>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="name"
                placeholder="Tu Nombre"
                name="name"
                value={name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.name && <Error>{errors.name}</Error>}
            <Field>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Tu Email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.email && <Error>{errors.email}</Error>}
            <Field>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Tu Password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.password && <Error>{errors.password}</Error>}
            {error && <Error>{error}</Error>}
            <InputSubmit type="submit" value="Crear Cuenta"></InputSubmit>
          </Form>
        </>
      </Layout>
    </div>
  );
};

export default SignUp;
