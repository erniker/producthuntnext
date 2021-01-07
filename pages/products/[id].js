import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Product = () => {
  // Routing for get actual id
  const router = useRouter();
  const {
    query: { id },
  } = router;

  useEffect(() => {
    if (id) {
    }
  }, [id]);

  return (
    <>
      <h1>Desde {id}</h1>
    </>
  );
};

export default Product;
