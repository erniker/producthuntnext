import React from "react";
import Layout from "../components/layout/Layout";
import styled from "@emotion/styled";

const Heading = styled.h1`
  color: red;
`;

const Home = () => (
  <div>
    <Layout>
      <Heading>Inicio</Heading>
    </Layout>
  </div>
);

export default Home;
