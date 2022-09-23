import { useState } from "react";
import axios from 'axios';
import {useRef} from 'react';
import Product from "./Product";
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {BASE_API} from "./ApiConstant";

function CategorySort () {

const [cats, setCats]=useState("");
const [errors, setErrors] = useState({});
const [products, setProducts] = useState([]);
const state = useSelector((state) => state);
const [totalPage, setTotalPage] = useState(0);
const [showDialog, setShowDialog] = useState('modal fade');
const [display, setDisplay] = useState('none');
const [item, setItem] = useState({});
const [message, setMessage] = useState('');
const [qty, setQty] = useState(1);
const dispatch = useDispatch();
const history = useHistory();
const inputRef = useRef(null);

const showModal = (prod) => {
  console.log('Child call parent');
  setShowDialog('modal fade show');
  setDisplay('block');
  setItem(prod);
};

const validate = (e) => {
    
  setQty(e.target.value)
  
  let val = item.qty-e.target.value;
  if(val < 0){

    setMessage('');
    alert("Invalide Quantity");
    
    inputRef.current.value = '';
  }
  };

const checkItem = (prodid) => {
  return state.cart.findIndex((x) => x.prodid === prodid) < 0;
};

const handleInput = (e)=>{
  //console.log("Category in rooot",root);
    console.log("Category ",e.target.value);
    setCats([e.target.value]);
}
const loadDataFromServer = (page = 0, pagesize = 8) => {
  axios
    .get(
      BASE_API+'/api/products/paginated?page=' +
        page +
        '&pagesize=' +
        pagesize
    )
    .then((resp) => {
      console.log(resp.data.data.total);
      setProducts(resp.data.data.plist);
      setTotalPage(Math.ceil(resp.data.data.total / pagesize));
      console.log(products);
    });
}

const handlePageClick = ({ selected: selectedPage }) => {
  loadDataFromServer(selectedPage);
};
const closeDialog = () => {
  setShowDialog('modal fade');
  setDisplay('none');
};
const changeCategory=()=>{
  axios
  .post(
    BASE_API+'/api/products/category/',cats[0]).then((resp) => {
    console.log("Data from back",resp.data.data);
    setProducts(resp.data.data);
    
});
}
const addToCart = (item) => {
  if (sessionStorage.getItem('email') == null) {
    alert('Please login first to buy product');
    history.push('/clogin');
  } else if (sessionStorage.getItem('role') !== 'customer') {
    alert('Only receiver can buy product');
  } else {
    if (checkItem(item.prodid)) {
      showModal();
      setDisplay('none');
      setShowDialog('modal fade');
      item.qty = qty;
      dispatch({ type: 'AddItem', payload: item });
      alert('Item added to cart successfully');
    } else {
      alert('Item already in cart');
    }
  }
};

  

return(
    <div className="container-fluid">
        <br />
        <br />
        <div className="col-12 float-left">
            <span className = "col-sm-2"></span>
                    <select
                      name="pcat"
                      value={cats.pcat}
                        onChange={handleInput}
                      className="form-control col-sm-6 float-left ml-5 mr-3"
                    >
                      <option value="">Select Category</option>
                      <option>Cloths</option>
                      <option>Furniture</option>
                      <option>Footwear</option>
                      <option>Electronics</option>
                      <option>Utensils</option>
                    </select>
                    {errors.pcat && (
                      <small className="text-danger float-left">
                        {errors.pcat}
                      </small>
                    )}
                    <button className="btn btn-primary col-sm-2 form-control" onClick={changeCategory}>
                        Search Product
                    </button>
        </div>
        <br />
        <br /><br />
        {/* {categoryList} */}
        <div className="card-body">
            <ReactPaginate
              previousLabel={'← Previous'}
              nextLabel={'Next →'}
              containerClassName={'pagination'}
              pageCount={totalPage}
              onPageChange={handlePageClick}
              previousLinkClassName={'pagination__link'}
              nextLinkClassName={'pagination__link'}
              disabledClassName={'pagination__link--disabled'}
              activeClassName={'pagination__link--active'}
            />
            <div className="row">
              {products.map((x) => (
                <Product key={x.prodid} x={x} showModal={showModal} />
              ))}
            </div>
          </div>
          {display == 'block' ? (
          <div
            className={showDialog}
            style={{ zIndex: '1000', display: display }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>Add to Cart</h5>
                  <button onClick={closeDialog} className="close">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <div className="d-flex">
                    <img
                      src={BASE_API+'/' + item.photo}
                      style={{ width: '200px' }}
                    />
                    <div className="ml-3">
                      <h4 className="p-2 text-warning">{item.pname}</h4>
                      
                      <h5 className="px-2">Category: {item.pcat}</h5>
                      <h5 className="px-2">Seller: {item.sellerName}</h5>
                      
                      <h5 className="px-2">Quantity Available: {item.qty}</h5>
                      <input
                        id="message"
                        name={message}
                        type="number"
                        ref={inputRef}
                        min="1"
                        max={item.qty}
                        value={qty} 
                        onChange={validate}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    onClick={(e) => addToCart(item)}
                    className="btn btn-warning btn-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
    </div>
)
}

export default CategorySort;