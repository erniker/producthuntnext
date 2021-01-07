import React, { useContext } from "react";
import Link from "next/Link";
import styled from "@emotion/styled";
import { FirebaseContext } from "../../firebase";

const Nav = styled.nav`
  padding-left: 2rem;
  a {
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--grey2);
    font-family: "PT Sans", sans-serif;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const Navegation = () => {
  const { user } = useContext(FirebaseContext);

  return (
    <Nav>
      <Link href="/">Inicio</Link>
      <Link href="/popular">Populares</Link>
      {user && <Link href="/new-product">Nuevo Producto</Link>}
    </Nav>
  );
};

export default Navegation;
