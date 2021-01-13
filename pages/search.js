import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";
import ProductDetails from "../components/layout/ProductDetails";
import useProducts from "../hooks/useProducts";

const Search = () => {
  const router = useRouter();
  const {
    query: { q },
  } = router;

  // Products
  const { products } = useProducts("created");
  const [result, saveResult] = useState([]);

  useEffect(() => {
    const searching = q.toLowerCase();
    const filter = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searching) ||
        product.description.toLowerCase().includes(searching)
      );
    });

    saveResult(filter);
  }, [q, products]);

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {result.map((product) => (
                <ProductDetails key={product.id} product={product} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Search;
