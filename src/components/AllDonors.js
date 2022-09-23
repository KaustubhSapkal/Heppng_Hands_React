import axios from "axios";
import { useEffect, useState } from "react";
import {BASE_API} from "./ApiConstant";

function AllDonors() {
  const [sellers, setSellers] = useState([]);
  useEffect(() => {
    axios.get(BASE_API+"/api/donors").then((resp) => {
      //console.log(resp.data.data)
      setSellers(resp.data.data);
      console.log(sellers);
    });
  }, []);

  const deleteDonor = (id) => {
    
      let response = window.confirm("Are you sure to delete this supplier ?");
    if (response) {
      console.log(id);
      axios.delete(BASE_API+"/api/donors/" + id).then((resp) => {
        axios.get(BASE_API+"/api/donors").then((resp) => {
          //console.log(resp.data.data)
          setSellers(resp.data.data);
        });
      });
    }
    
  };

  return (
    <div className="container-fluid text-white">
      <h4 className="p-2 text-center">All Sellers</h4>
      <table className="table table-bordered table-striped table-light table-hover">
        <thead className="table-dark">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>City</th> 
            <th>Phone</th>
            <th>Email Id</th>
            {/* <th>Password</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((x) => (
            <tr key={x.id}>
              <td>{x.id}</td>
              <td>{x.name}</td>
              <td>{x.city}</td>
              <td>{x.phone}</td>
              <td>{x.email}</td>
              {/* <td>{x.pwd}</td> */}
              <td>
                <button
                  onClick={(e) => deleteDonor(x.id)}
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
  );
}

export default AllDonors;
