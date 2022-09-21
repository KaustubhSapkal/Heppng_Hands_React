import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import productvalidation from "./productvalidation";

function EditProduct() {
  console.log("Edit product page");
  const sellerid = sessionStorage.getItem("id");
  const { prodid } = useParams();
  const [product, setProduct] = useState({
    prodid: prodid,
    pname: "",
    pcat: "",
    price: "",
    sellerId: sellerid,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();

  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(productvalidation(product));
    setSubmitted(true);
  };

  useEffect(() => {
    console.log(errors);

    axios.get("http://helpinghandsspringboot-env.eba-itkavyxn.ap-south-1.elasticbeanstalk.com/api/products/" + prodid).then((resp) => {
      console.log(resp.data.data);
      setProduct(resp.data.data);
    });

    if (Object.keys(errors).length === 0 && submitted) {
      console.log(product);
      axios
        .put("http://helpinghandsspringboot-env.eba-itkavyxn.ap-south-1.elasticbeanstalk.com/api/products/" + prodid, product)
        .then((resp) => {
          let result = resp.data.data;
          console.log(result);
          alert("Product saved successfully");
          history.push("/myproducts");
        })
        .catch((error) => {
          console.log("Error", error);
          alert("Error saving product");
        });
    }
  }, [errors]);
  return (
    <div className="container-fluid">
      <div className="row bg-dark text-light">
        <div class="col-sm-3">
          <img width="300" src={"http://helpinghandsspringboot-env.eba-itkavyxn.ap-south-1.elasticbeanstalk.com/" + product.photo} />
        </div>
        <div className="col-sm-9">
          <h4 className="text-center p-2">Edit Product Form (Product ID : )</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group form-row ">
              <label className="col-sm-4 form-control-label">
                Product Name
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  name="pname"
                  value={product.pname}
                  onChange={handleInput}
                  className="form-control"
                />
                {errors.pname && (
                  <small className="text-danger float-right">
                    {errors.pname}
                  </small>
                )}
              </div>
            </div>
            <div className="form-group form-row">
              <label className="col-sm-4 form-control-label">Category</label>
              <div className="col-sm-8">
                <select
                  name="pcat"
                  value={product.pcat}
                  onChange={handleInput}
                  className="form-control"
                >
                  <option value="">Select Category</option>
                  <option>Clothing</option>
                  <option>Groceries</option>
                  <option>Footwear</option>
                  <option>Dairy </option>
                  <option>Handicrafts</option>
                </select>
                {errors.pcat && (
                  <small className="text-danger float-right">
                    {errors.pcat}
                  </small>
                )}
              </div>
            </div>
            
            <div className="form-group form-row">
              <label className="col-sm-4 form-control-label">Price</label>
              <div className="col-sm-8">
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleInput}
                  className="form-control"
                />
                {errors.price && (
                  <small className="text-danger float-right">
                    {errors.price}
                  </small>
                )}
              </div>
            </div>

            <button className="btn btn-primary float-right">
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
