import { Redirect } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

function EditData({ location }) {
  const user = location.state.data;
  const [id] = useState();
  const [category, setCatagory] = useState(user.category);
  const [image, setImage] = useState(user.image);
  const [description, setDescription] = useState(user.description);
  const [title, setTitle] = useState(user.title);
  const [subtitle, setSubtitle] = useState(user.subtitle);
  const [price, setPrice] = useState(user.price);
  const [quantity, setQuantity] = useState(user.quantity);
  const [redirect, setRedirect] = useState(false);

  const AddProducts = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3003/products/${user.id}`,
        {
          id,
          category,
          image,
          title,
          subtitle,
          description,
          price,
          quantity,
        }
      );
      if (response.status === 200) {
        // Data successfully updated
        //  setSuccessMessage("Data updated successfully.");
        alert("Data updated successfully");
        setRedirect(true);
      } else {
        // Handle the error response
        //  setSuccessMessage("Failed to update data.");
        alert("Data updated Failed");
      }
    } catch (error) {
      // Handle network or other errors
      console.log("Error:", error);
      // setSuccessMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container">
      {redirect && <Redirect to="/login" />}
      <h2>Edit - {user.subtitle}</h2>
      <div className="rows">
        <input type="text" placeholder="Insert Id" value={user.id} />
        <input
          type="text"
          placeholder="Insert Catagory"
          value={category}
          onChange={(e) => setCatagory(e.target.value)}
        />
        <input
          type="text"
          placeholder="change image path"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="text"
          placeholder="change Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="change subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="change Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="change price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="change quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={AddProducts} className="btn btn-primary insertProduct">
          update
        </button>
      </div>
      ;
    </div>
  );
}

export default EditData;
