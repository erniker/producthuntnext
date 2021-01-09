import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";

import Layout from "../../components/layout/Layout";
import { FirebaseContext } from "../../firebase";
import Error404 from "../../components/layout/404";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";

import { Field, InputSubmit } from "../../components/ui/Form";
import Button from "../../components/ui/button";

const ProductContainer = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const Product = () => {
  // Component state
  const [product, saveProduct] = useState({});
  const [error, saveError] = useState(false);

  // Routing for get actual id
  const router = useRouter();
  const {
    query: { id },
  } = router;

  //firebase context
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (id) {
      const getProduct = async () => {
        const QueryProduct = await firebase.db.collection("products").doc(id);
        const product = await QueryProduct.get();
        if (product.exists) {
          saveProduct(product.data());
        } else {
          saveError(true);
        }
      };
      getProduct();
    }
  }, [id]);

  if (Object.keys(product).length === 0) return "Cargando...";

  const {
    comments,
    company,
    created,
    description,
    name,
    url,
    urlImage,
    votes,
    maker,
  } = product;

  return (
    <Layout>
      <>
        {error && <Error404 />}
        <div className="contenedor">
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            {name}
          </h1>
          <ProductContainer>
            <div>
              {" "}
              <p>
                Publicado hace:{" "}
                {formatDistanceToNow(new Date(created), { locale: es })}
              </p>
              <p>
                Por: {maker.name} de {company}
              </p>
              <img src={urlImage} />
              <p>{description}</p>
              <h2>Agrega tu comentario</h2>
              <form>
                <Field>
                  <input type="text" name="message" />
                </Field>
                <InputSubmit type="submit" value="Agregar Comentario" />
              </form>
              <h2
                css={css`
                  margin: 2rem 0;
                `}
              >
                Comentarios
              </h2>
              {comments.map((comment) => (
                <li>
                  <p>{comment.name}</p>
                  <p>{comment.userName}</p>
                </li>
              ))}
            </div>
            <aside>
              <Button target="_blank" bgColor="true" href={url}>
                Visitar URL
              </Button>

              <div
                css={css`
                  margin-top: 5rem;
                `}
              >
                <p
                  css={css`
                    text-align: center;
                  `}
                >
                  {votes} Votos
                </p>
                <Button>Votar</Button>
              </div>
            </aside>
          </ProductContainer>
        </div>
      </>
    </Layout>
  );
};

export default Product;
