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

const ProductMaker = styled.p`
  padding: 0.5rem 2rem;
  background-color: #da552f;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
`;

const Product = () => {
  // Component state
  const [product, saveProduct] = useState({});
  const [error, saveError] = useState(false);
  const [comment, saveComment] = useState({});
  const [consultDB, saveConsultDB] = useState(true);

  // Routing for get actual id
  const router = useRouter();
  const {
    query: { id },
  } = router;

  //firebase context
  const { firebase, user } = useContext(FirebaseContext);

  useEffect(() => {
    if (id && consultDB) {
      const getProduct = async () => {
        const QueryProduct = await firebase.db.collection("products").doc(id);
        const product = await QueryProduct.get();
        if (product.exists) {
          saveProduct(product.data());
          saveConsultDB(false);
        } else {
          saveError(true);
          saveConsultDB(false);
        }
      };
      getProduct();
    }
  }, [id]);

  if (Object.keys(product).length === 0 && !error) return "Cargando...";

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
    hasVoted,
  } = product;

  // Admin and validate votes
  const voteProduct = () => {
    if (!user) {
      return router.push("/login");
    }
    // Get and sum vote
    const newTotal = votes + 1;
    // Verify if current user has voted
    if (hasVoted.includes(user.uid)) return;

    // Save uid from user that just voted now
    const newHasVoted = [...hasVoted, user.uid];

    // Update on BD
    firebase.db
      .collection("products")
      .doc(id)
      .update({ votes: newTotal, hasVoted: newHasVoted });

    // Update state
    saveProduct({
      ...product,
      votes: newTotal,
    });
    saveConsultDB(true); // user voted, we have to consult to db
  };

  // Functions to create comments
  const commentChange = (e) => {
    saveComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  // Identify if commnet is from product´s maker
  const isMaker = (id) => {
    if (maker.id == id) {
      return true;
    }
  };

  const addComment = (e) => {
    e.preventDefault();
    if (!user) {
      return router.push("/login");
    }

    // extra info for comment
    comment.userId = user.uid;
    comment.userName = user.displayName;

    // Add new comment to comments array
    const newComments = [...comments, comment];

    // Add BD
    firebase.db
      .collection("products")
      .doc(id)
      .update({ comments: newComments });

    // Update State
    saveProduct({
      ...product,
      comments: newComments,
    });
    saveConsultDB(true); // user comented, we have to consult to db
  };

  // function to check that maker is the same that is logger so, can delete the product
  const canDelete = () => {
    if (!user) return false;
    if (maker.id === user.uid) {
      return true;
    }
  };

  // Delete product from db
  const deleteProduct = async () => {
    if (!user) {
      return router.push("/login");
    }
    if (maker.id !== user.uid) {
      return router.push("/");
    }
    try {
      await firebase.db.collection("products").doc(id).delete();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <>
        {error ? (
          <Error404 />
        ) : (
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
                {user && (
                  <>
                    <h2>Agrega tu comentario</h2>
                    <form onSubmit={addComment}>
                      <Field>
                        <input
                          type="text"
                          name="message"
                          onChange={commentChange}
                        />
                      </Field>
                      <InputSubmit type="submit" value="Agregar Comentario" />
                    </form>
                  </>
                )}
                <h2
                  css={css`
                    margin: 2rem 0;
                  `}
                >
                  Comentarios
                </h2>
                {comments.length === 0 ? (
                  "Aún no hay comentarios"
                ) : (
                  <ul>
                    {comments.map((comment, i) => (
                      <li
                        key={`${comment.userId}-${i}`}
                        css={css`
                          border: 1px solid #e1e1e1;
                          padding: 2rem;
                        `}
                      >
                        <p>{comment.message}</p>
                        <p>
                          Escrito por:
                          <span
                            css={css`
                              font-weight: bold;
                            `}
                          >
                            {" "}
                            {comment.userName}
                          </span>
                        </p>
                        {isMaker(comment.userId) && (
                          <ProductMaker>Es Creador</ProductMaker>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
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
                  {user && <Button onClick={voteProduct}>Votar</Button>}
                </div>
              </aside>
            </ProductContainer>
            {canDelete() && (
              <Button onClick={deleteProduct}>Eliminar Producto</Button>
            )}
          </div>
        )}
      </>
    </Layout>
  );
};

export default Product;
