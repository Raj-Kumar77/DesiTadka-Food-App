import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decrementItem,
  removeFromCart,
} from "../redux/slices/cartSlice";
import toast from "react-hot-toast";

const CartDetails = () => {
  const { carts } = useSelector((state) => state.allCart);
  const dispatch = useDispatch();

  const [totalprice, setPrice] = useState(0);
  const [totalquantity, setQuantity] = useState(0);

  // increment cart item
  const handleIncrement = (e) => {
    dispatch(addToCart(e));
  };

  // remove item from cart
  const handleRemove = (e) => {
    dispatch(removeFromCart(e));
    toast.success('Item removed from your cart')
  };

  // decrement item from cart
  const handleDecrement = (e) => {
    dispatch(decrementItem(e));
  };

  // empty cart
  const emptyCart = () => {
    dispatch(clearCart());
    toast.success("Your cart is empty");
  };

  // count total price
  const total = () => {
    let totalprice = 0;
    carts.map((ele, ind) => {
      totalprice = ele.price * ele.qnty + totalprice;
    });
    setPrice(totalprice);
  };

  useEffect(() => {
    total();
  }, [total]);

  //   count total quantity
  const countquantity = () => {
    let totalquantity = 0;
    carts.map((ele, ind) => {
      totalquantity = ele.qnty + totalquantity;
    });
    setQuantity(totalquantity);
  };

  useEffect(() => {
    countquantity();
  }, [countquantity]);

  return (
    <>
      <div className="row justify-content-center m-0">
        <div className="col-md-8 mt-5 mb-5 cardsdetails">
          <div className="card">
            <div className="card-header bg-dark p-3">
              <div className="card-header-flex">
                <h5 className="text-white m-0">
                  Cart Calculation{carts.length > 0 ? `(${carts.length})` : ""}
                </h5>
                {carts.length > 0 ? (
                  <button
                    className="btn btn-danger mt-0 btn-sm"
                    onClick={() => emptyCart()}
                  >
                    <i className="fa fa-trash-alt mr-2"></i>EmptyCart
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="card-body p-0">
              {carts.length === 0 ? (
                <table className="table cart-table mb-0">
                  <tbody>
                    <tr>
                      <td colSpan={6}>
                        <div className="cart-empty">
                          <i className="fa fa-shopping-cart"></i>
                          <p>Your Cart Is Empty</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="table cart-table mb-0 table-responsive-sm">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th className="text-right">
                        <span id="amount" className="amount">
                          Total Amount
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts.map((data, index) => (
                      <>
                        <tr>
                          <td>
                            <button
                              className="prdct-delete"
                              onClick={() => handleRemove(data.id)}
                            >
                              <i className="fa fa-trash-alt"></i>
                            </button>
                          </td>
                          <td>
                            <div className="product-img">
                              <img src={data.imgdata} alg={data.dish} />
                            </div>
                          </td>
                          <td>
                            <div className="product-name">
                              <p>{data.dish}</p>
                            </div>
                          </td>
                          <td>{data.price}</td>
                          <td>
                            <div className="prdct-qty-container">
                              <button
                                className="prdct-qty-btn"
                                type="button"
                                onClick={
                                  data.qnty <= 1
                                    ? () => handleRemove(data.id)
                                    : () => handleDecrement(data)
                                }
                              >
                                <i className="fa fa-minus"></i>
                              </button>
                              <input
                                type="text"
                                className="qty-input-box"
                                value={data.qnty}
                                name=""
                                id=""
                              />
                              <button
                                className="prdct-qty-btn"
                                type="button"
                                onClick={() => handleIncrement(data)}
                              >
                                <i className="fa fa-plus"></i>
                              </button>
                            </div>
                          </td>
                          <td className="text-right">
                            {data.qnty * data.price}
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>&nbsp;</th>
                      <th colSpan={3}>&nbsp;</th>
                      <th>
                        Items In Cart <span className="ml-2 mr-2">:</span>
                        <span className="text-danger">{totalquantity}</span>
                      </th>
                      <th className="text-right">
                        Total Price <span className="ml-2 mr-2">:</span>
                        <span className="text-danger">{totalprice}</span>
                      </th>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
            {
              carts.length > 0 ? <div className="col-md-3 my-3">
              <button
                className="btn px-4 btn-danger mt-0 btn-sm"
              >
                Checkout
              </button>
            </div> : ''
            }
            
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetails;
