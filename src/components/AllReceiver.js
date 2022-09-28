import axios from "axios";
import { useEffect, useState } from "react";
import {BASE_API} from "./ApiConstant";

function AllReceiver() {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    axios.get(BASE_API+"/api/receivers").then((resp) => {
      setCustomers(resp.data.data);
      console.log(customers);
    });
  }, []);

  return (
    <div className="container-fluid">
      <h4 className="text-white p-2 text-center">All Customers</h4>
      <table className="table table-bordered table-striped table-light table-hover" >
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Email Id</th>
            {/* <th>Password</th> */}
          </tr>
        </thead>
        <tbody>
          {customers.map((x) => (
            <tr key={x.id}>
              <td>{x.name}</td>
              <td>{x.city}</td>
              <td>{x.gender}</td>
              <td>{x.phone}</td>
              <td>{x.email}</td>
              {/* <td>{x.pwd}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllReceiver;
