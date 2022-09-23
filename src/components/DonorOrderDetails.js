import axios from "axios";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import {BASE_API} from "./ApiConstant";

//var product;
function DonorOrderDetails(){
  
  const [prod, setProd] = useState([]);

  const sellerid=sessionStorage.getItem("id");
  //const [value, setVaule]=useState([]);
  

  useEffect(() => {
    
    axios
      .get(BASE_API+"/api/orders/seller?sid=" + sellerid)
      .then((resp) => {
        
        setProd(resp.data.data[0]);
        console.log(prod);
        
        
        
      });

  }, []);
   
  const table=prod.map((element, index)=>{
    return(
      <tr key={index}>
        <td className="text-light">
        <img
          width="100"
          src={BASE_API+"/" + element.product.photo}
          className="img-thumnail"
                    />
          {element.product.pname}
        </td>
        <td className="text-light">{element.product.pcat}</td>
        
        <td className="text-light">{element.qty}</td>
        <td className="text-light"><Moment format="ddd, DD-MMM-YYYY">{element.orderDate}</Moment></td>
        <td className="text-light">{element.order.receiver.name}</td>
        <td className="text-light">{element.order.receiver.email}</td>
        <td className="text-light">{element.order.receiver.phone}</td>
        <td className="text-light">{element.order.address.city} {element.order.address.state} {element.order.address.country} {element.order.address.zip}</td>
      </tr>
    )
    })
  
 

  return(
    <div className=" d-flex justify-content-center mt-5 mb-5 ml-3 mr-3">
      {prod.length > 0 ? (
        <div className="card shadow bg-dark text-white">
        <div className="card-body">
          <h4>Orders</h4>
          <table className="table table-bordered ">
            <thead className="table-light">
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                
                <th>Quantity</th>
                <th>Order Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                
              </tr>
            </thead>
            <tbody>
               {table}
             
            </tbody>
          </table>
        </div>
      </div>
       ) : ( <h5 className="text-dark text-center mt-4">No orders</h5>
      )}
  
    </div>
  );

}

export default DonorOrderDetails;
//export {product};
