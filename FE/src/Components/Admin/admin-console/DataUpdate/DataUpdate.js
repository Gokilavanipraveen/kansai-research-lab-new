import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./DataUpdate.css";

function DataUpdate() {
  const [products, setProducts] = useState([]);
  const [id, setId] = useState();
  const [category, setCatagory] = useState();
  const [image, setImage] = useState();
  const [description, setDescription] = useState();
  const [title, setTitle] = useState();
  const [subtitle, setSubtitle] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!loading) {
      saveData();
    }
  }, [loading]);
  const saveData = async () => {
    try {
      const response = await Axios.get("http://localhost:3003/products");
      setProducts(response.data);
      setLoading(true);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const AddProducts = () => {
    Axios.post("http://localhost:3003/products", {
      id,
      category,
      image,
      title,
      subtitle,
      description,
      price,
      quantity,
    })
      .then(() => {
        setId("");
        setCatagory("");
        setDescription("");
        setImage("");
        setTitle("");
        setSubtitle("");
        setPrice("");
        setQuantity("");
      })
      .catch((err) => console.log(err));

    setTimeout(() => {
      saveData();
    }, 500);
  };

  const deleteProduct = (id) => {
    Axios.delete(`http://localhost:3003/products/${id}`);

    setTimeout(() => {
      saveData();
    }, 500);
  };

  //   const [updateState, setUpdateState] = useState(-1);
  //   function handleEdit(id) {
  //     setUpdateState(id);
  //   }
  // function handleUpdate(e){
  //   e.preventDefault();
  //   setUpdateState(-1)
  // }
  const addRecord = () => {
    document.getElementById("addRecord").style = "display:block";
  };

  return (
    <>
      <button className="add btn btn-primary" onClick={() => addRecord()}>
        Add Record
      </button>
      <div className="updateForm container" id="addRecord">
        <h2>New Record</h2>
        <div className="rows">
          <input
            type="text"
            placeholder="Insert Id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="rows">
          <input
            type="text"
            placeholder="Insert category"
            value={category}
            onChange={(e) => setCatagory(e.target.value)}
          />
        </div>
        <div className="rows">
          <input
            type="text"
            placeholder="Insert image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="rows">
          <input
            type="text"
            placeholder="Insert title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="rows">
          <input
            type="text"
            placeholder="Insert subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>
        <div className="rows">
          <input
            type="text"
            placeholder="Insert description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Insert price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Insert quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <button onClick={AddProducts} className="btn btn-primary insertProduct">
          Insert
        </button>
      </div>
      {loading ? (
        " Loading............"
      ) : (
        <div className="StockUpdate">
          <header className="header">
            <h2>Your Stock Tracker</h2>
          </header>
          <div className="stock-container">
            <div className="stockdetail">
              <form>
                <table className="stockTable" id="FormData">
                  <tr>
                    <th>ID</th> <th>Catagory</th> <th>Image</th> <th>Title</th>
                    <th> Subtitle </th> <th>Description</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th></th>
                  </tr>
                  <tbody>
                    {products &&
                      products?.map((data, key) => {
                        return (
                          <>
                            <tr key={key}>
                              <td>
                                <h5>{data.id}</h5>
                              </td>
                              <td>
                                <h5>{data.category}</h5>
                              </td>
                              <td>
                                <h5>{data.image}</h5>
                              </td>
                              <td>
                                <h5>{data.title}</h5>
                              </td>
                              <td>
                                <h5>{data.subtitle}</h5>
                              </td>
                              <td>
                                <h5>{data.description}</h5>
                              </td>
                              <td>
                                <h5>{data.price}</h5>
                              </td>
                              <td>
                                <h5>{data.quantity}</h5>
                              </td>
                              <td className="formAction">
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    deleteProduct(data.id);
                                  }}
                                >
                                  Delete
                                </button>
                                <Link
                                  className="btn btn-primary"
                                  to={{
                                    pathname: `/update/${data.id}`,
                                    state: { data },
                                  }}
                                >
                                  Edit
                                </Link>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DataUpdate;
