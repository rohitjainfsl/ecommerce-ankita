import { useEffect, useState } from "react";
import instance from "../axios";
import Product from "../components/Product";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const response = await instance.get("/product");
    console.log(response);
    setProducts(response.data);
  }
  return (
    <>
      <section id="product-wrapper">
        {products.length > 0 ? (
          products.map((obj) => <Product obj={obj} />)
        ) : (
          <h3>NO PRODUCT FOUND</h3>
        )}
      </section>
    </>
  );
}

export default Home;
