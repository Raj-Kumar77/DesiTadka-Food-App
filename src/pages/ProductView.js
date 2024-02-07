import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CardsData from "../static/CardData";
import { addToCart } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Button, Card } from "react-bootstrap";

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [simiProducts, setSimiProducts] = useState([]);
  useEffect(() => {
    const filterProduct = CardsData.filter((product) => product.id == id);
    setProduct(filterProduct[0]);
  }, [id]);

  const dispatch = useDispatch();

  // add to cart
  const send = (e) => {
    dispatch(addToCart(e));
    toast.success("Item added In Your Cart");
  };

  //   get simmilar product
  const similarProducts = () => {
    const filterData = CardsData.filter(
      (item) => item.category === product.category && item.id != product.id
    );
    setSimiProducts(filterData);
  };

  useEffect(() => {
    similarProducts();
  }, [product]);

  return (
    <div class="py-3 py-md-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-md-5 mt-3">
            <div class="bg-white border">
              <img src={product.imgdata} class="w-100" alt="Img" />
            </div>
          </div>
          <div class="col-md-7 mt-3">
            <div class="product-view">
              <h4 class="product-name">{product.dish}</h4>
              <hr />
              <div>
                <span class="selling-price">₹{product.price}</span>
                {/* <span class="original-price">$499</span> */}
              </div>
              {/* <div class="mt-2">
                <div class="input-group">
                  <span class="btn btn1">
                    <i class="fa fa-minus"></i>
                  </span>
                  <input
                    type="text"
                    value="1"
                    class="input-quantity"
                    style={{ borderColor: "#ff3054db" }}
                  />

                  <span class="btn btn1">
                    <i class="fa fa-plus"></i>
                  </span>
                </div>
              </div> */}
              <div class="mt-2">
                <div href="" class="btn btn1" onClick={() => send(product)}>
                  {" "}
                  <i class="fa fa-shopping-cart"></i> Add To Cart
                </div>
                {/* <a href="" class="btn btn1">
                  {" "}
                  <i class="fa fa-heart"></i> Add To Wishlist{" "}
                </a> */}
              </div>
              <div class="mt-3">
                <h5 class="mb-0">Description</h5>
                <p>{product.address}</p>
                <i>{product.somedata}</i>
              </div>
            </div>
          </div>
        </div>

        {/* similar proudcts  */}
        <div className="row mt-5 d-flex justify-content- gap-2 align-items-center similar">
          <h2 style={{ fontWeight: 400 }}>Similar Products</h2>
          {simiProducts.length <= 0
            ? (<p>No similar products available</p>)
            : (simiProducts.map((element, index) => (
                <>
                  <Card
                    style={{ width: "22rem", border: "none" }}
                    className="hove mb-4"
                    key={element.id}
                  >
                    <Link
                      to={`/products/${element.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card.Img
                        variant="top"
                        className="cd"
                        src={element.imgdata}
                      />
                    </Link>
                    <div className="card_body">
                      <div className="upper_data d-flex justify-content-between align-items-center">
                        <h4 className="mt-2">{element.dish}</h4>
                        <span>{element.rating}&nbsp;★</span>
                      </div>

                      <div className="lower_data d-flex justify-content-between">
                        <h5 className="mt-2">{element.address}</h5>
                        <span>₹ {element.price}</span>
                      </div>

                      <div className="extra"></div>

                      <Button
                        style={{
                          background: "#ff3054db",
                          border: "none",
                        }}
                        variant="outline-light"
                        className="w-100 mt-2 mb-3"
                        onClick={() => send(element)}
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </Card>
                </>
              )))}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
