import React from "react";
import Link from "next/Link";
import styled from "@emotion/styled";

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
  return (
    <Nav>
      <Link href="/">Inicio</Link>
      <Link href="/popular">Populares</Link>
      <Link href="/new-product">Nuevo Producto</Link>
    </Nav>
  );
};

export default Navegation;
