// Solutions for FileUploader problems
//www.udemy.com/course/react-de-principiante-a-experto-creando-mas-de-10-aplicaciones/learn/lecture/17680734#questions/13225784

import React, { useState, useContext } from "react";
import { css } from "@emotion/react";
import Router, { useRouter } from "next/router";
import FileUploader from "react-firebase-file-uploader";
import Layout from "../components/layout/Layout";
import { Form, Field, InputSubmit, Error } from "../components/ui/Form";

//Firebase
import { FirebaseContext } from "../firebase";

//Validations
import useValidation from "../hooks/useValidation";
import newProductValidation from "../validation/newProductValidation";

const INITIAL_STATE = {
  name: "",
  company: "",
  url: "",
  description: "",
};

const NewProduct = () => {
  //States for upload images
  const [imageName, saveImageName] = useState("");
  const [uploading, saveUploading] = useState(false);
  const [progress, saveProgress] = useState(0);
  const [urlImage, saveUrlImage] = useState("");

  const [error, saveError] = useState(false);

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidation(INITIAL_STATE, newProductValidation, createProduct);

  // Destructure values
  const { name, company, url, description } = values;

  // Routing hook for redirect
  const router = useRouter();

  // Context for CRUD operations of Firebase
  const { user, firebase } = useContext(FirebaseContext);

  async function createProduct() {
    // If user is not authenticated, redirect to login
    if (!user) {
      return router.push("/login");
    }

    // Create object of new project
    const product = {
      name,
      company,
      url,
      urlImage,
      description,
      votes: 0,
      comments: [],
      created: Date.now(),
    };

    // Insert on BD
    firebase.db.collection("products").add(product);

    return router.push("/");
  }

  const handleUploadStart = () => {
    saveProgress(0);
    saveUploading(true);
  };

  const handleProgress = async (progress, task) => {
    console.log(progress);
    saveProgress(progress);
    if (progress === 100) {
      handleUploadSuccess(task.snapshot.ref.name);
    }
  };

  const handleUploadError = (error) => {
    saveUploading(error);
    console.error(error);
  };

  const handleUploadSuccess = async (name) => {
    saveProgress(100);
    saveUploading(false);
    saveImageName(name);
    firebase.storage
      .ref("products")
      .child(name)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        saveUrlImage(url);
      });
  };

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
            Nuevo Producto
          </h1>
          <Form onSubmit={handleSubmit} noValidate>
            <fieldset>
              <legend>Información General</legend>

              <Field>
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Nombre del producto"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              {errors.name && <Error>{errors.name}</Error>}

              <Field>
                <label htmlFor="company">Empresa</label>
                <input
                  type="text"
                  id="company"
                  placeholder="Nombre de Empresa o Compañía"
                  name="company"
                  value={company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              {errors.company && <Error>{errors.company}</Error>}

              <Field>
                <label htmlFor="image">Imagen</label>
                <FileUploader
                  accept="image/*"
                  id="image"
                  name="image"
                  randomizeFilename
                  storageRef={firebase.storage.ref("products")}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onProgress={handleProgress}
                />
              </Field>

              <Field>
                <label htmlFor="url">URL</label>
                <input
                  type="url"
                  id="url"
                  placeholder="Url de tu Empresa o Compañía"
                  name="url"
                  value={url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              {errors.url && <Error>{errors.url}</Error>}
            </fieldset>
            <fieldset>
              <legend>Sobre tu Producto</legend>
              <Field>
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  placeholder="Descripción del producto"
                  name="description"
                  value={description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              {errors.description && <Error>{errors.description}</Error>}
            </fieldset>
            {error && <Error>{error}</Error>}
            <InputSubmit type="submit" value="Crear Producto"></InputSubmit>
          </Form>
        </>
      </Layout>
    </div>
  );
};

export default NewProduct;
