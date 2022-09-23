import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {BASE_API} from "./ApiConstant";

function MyProducts() {
  const sellerid = sessionStorage.getItem("id");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(BASE_API+"/api/products?sellerid=" + sellerid)
      .then((resp) => {
        console.log(resp.data);
        setProducts(resp.data.data);
        console.log(products);
      });
  }, []);

  const deleteProduct = (prodid) => {
    let resp = window.confirm("Are you sure to delete this product ?");
    if (resp) {
      axios
        .delete(BASE_API+"/api/products/" + prodid)
        .then((resp) => {
          alert("Product deleted successfully");
          axios
            .get(BASE_API+"/api/products?sellerid=" + sellerid)
            .then((resp) => {
              console.log(resp.data);
              setProducts(resp.data.data);
              console.log(products);
            }); 
        });
    }
  };

  return (
    <div className="container">
      <div className="card shadow bg-dark text-white">
        <div className="card-body">
          <h4>My Products</h4>
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Category</th>
                {/* <th>Sub Category</th> */}
                {/* <th>Brand</th> */}
                
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((x) => (
                <tr key={x.prodid}>
                  <td className="text-light">
                    <img
                      width="100"
                      src={BASE_API+"/" + x.photo}
                      className="img-thumnail"
                    />&emsp;&emsp;
                    {x.pname}
                  </td>
                  <td className="text-light">{x.pcat}</td>
                  {/* <td className="text-light">{x.subcat}</td> */}
                  {/* <td className="text-light">{x.brand}</td> */}
                  
                  <td className="text-light ">{x.qty}</td>
                  <td>
                    <Link
                      to={"/edit/" + x.prodid}
                      className="btn btn-primary btn-sm mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(x.prodid)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyProducts;
