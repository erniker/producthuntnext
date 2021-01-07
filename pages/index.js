import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/layout/Layout";
import { FirebaseContext } from "../firebase";

const Home = () => {
  const [products, saveProducts] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const getProducts = () => {
      firebase.db
        .collection("products")
        .orderBy("created", "desc")
        .onSnapshot(handleSnapshot);
    };
    getProducts();
  }, []);

  function handleSnapshot(snapshot) {
    const products = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    saveProducts(products);
  }

  return (
    <div>
      <Layout>
        <h1>Inicio</h1>
      </Layout>
    </div>
  );
};

export default Home;
