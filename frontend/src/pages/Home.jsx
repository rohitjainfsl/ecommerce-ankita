import { useEffect, useState } from "react";
import instance from "../axios";

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
          products.map((obj) => (
            <div className="product" key={obj._id}>
              <div className="figure">
                <img src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${obj.image}`} alt={obj.slug} />
              </div>
              <div className="content">
                <h3>{obj.name}</h3>
                <p>{obj.actualPrice}</p>
              </div>
            </div>
          ))
        ) : (
          <h3>NO PRODUCT FOUND</h3>
        )}
      </section>
    </>
  );
}

export default Home;
