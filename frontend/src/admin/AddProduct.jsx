import { useState } from "react";
import instance from "../axios";

function AddProduct() {
  const [data, setData] = useState({
    name: "",
    slug: "",
    description: "",
    actualPrice: "",
    discountedPrice: "",
    category: "",
    image: "",
  });

  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    if (e.target.name === "image")
      setData({ ...data, image: e.target.files[0] });
    else {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await instance.post("/product/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response);
      if (response.status === 201 && response.statusText === "Created")
        setSuccess(true);
    } catch (error) {
      console.log(error.message);
    }
  }

  return success ? (
    <h2>PRODUCT ADDED</h2>
  ) : (
    <form action="" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          value={data.name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="slug">Slug</label>
        <input
          type="text"
          name="slug"
          id="slug"
          onChange={handleChange}
          value={data.slug}
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          id="category"
          onChange={handleChange}
          value={data.category}
        />
      </div>
      <div className="form-group">
        <label htmlFor="actualPrice">Actual Price</label>
        <input
          type="text"
          name="actualPrice"
          id="actualPrice"
          onChange={handleChange}
          value={data.actualPrice}
        />
      </div>
      <div className="form-group">
        <label htmlFor="discountedPrice">Discounted Price</label>
        <input
          type="text"
          name="discountedPrice"
          id="discountedPrice"
          onChange={handleChange}
          value={data.discountedPrice}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" onChange={handleChange}>
          {data.description}
        </textarea>
      </div>
      <div className="form-group">
        <label htmlFor="image">Product Image</label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProduct;
