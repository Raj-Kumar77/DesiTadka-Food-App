import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardsData from "../static/CardData";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [cartData, setCartData] = useState(CardsData);
  const [filteredData, setFilteredData] = useState(cartData);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  // add to cart
  const send = (e) => {
    dispatch(addToCart(e));
    toast.success("Item added In Your Cart");
  };

  // filter by category
  const handleFilter = (category) => {
    if (category === "all") {
      setFilteredData(cartData);
    } else {
      const filteredItems = cartData.filter(
        (item) => item.category === category
      );
      setFilteredData(filteredItems);
    }
  };

  // search function
  const filterData = (query) => {
    const filtered = cartData.filter((item) =>
      item.dish.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterData(query);
  };

  return (
    <>
      <section className="item_section mt-4 container">
        <h2 style={{ fontWeight: 400 }}>Restaurants in Delhi Open now</h2>
        <br />
        <div className="d-flex justify-content-between ms-auto">
          <div className="col-md-3">
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => handleFilter(e.target.value)}
              className="form-control"
            >
              <option value="all">All</option>
              <option value="punjabi">Punjabi</option>
              <option value="fast-food">Fast food</option>
              <option value="beverages">Beverages</option>
            </Form.Select>
          </div>
        </div>

        <div className="row mt-5 d-flex justify-content-around align-items-center">
          {filteredData.map((element, index) => (
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
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
