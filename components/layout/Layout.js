import React from "react";
import Link from "next/link";
const Layout = (props) => {
  return (
    <>
      <h1>Header</h1>

      <nav>
        <Link href="/">Inicio</Link>
        <Link href="/aboutus">Sobre nosotros</Link>
      </nav>

      <main>{props.children}</main>
    </>
  );
};

export default Layout;