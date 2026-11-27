function Product({ obj }) {
  return (
    <>
      <div className="product" key={obj._id}>
        <div className="figure">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${obj.image}`}
            alt={obj.slug}
          />
        </div>
        <div className="content">
          <h3>{obj.name}</h3>
          <p>{obj.actualPrice}</p>
        </div>
      </div>
    </>
  );
}
export default Product;
