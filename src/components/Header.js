import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { carts } = useSelector((state) => state.allCart);
  
  return (
    <>
      <Navbar style={{ height: "60px", background: "black", color: "white" }}>
        <Container>
          <Link to="/" className="text-decoration-none text-light mx-2">
            <h3 className="text-light">
              Desi<span style={{ color: "#ff3054db" }}>Tadka</span>
            </h3>
          </Link>
          <Link to="/cart" className="text-decoration-none text-light mx-2">
            <div id="ex4">
              <span
                className="p1 fa-stack fa-2x has-badge"
                data-count={carts.length}
              >
                <i class="fa-solid fa-cart-shopping"></i>
              </span>
            </div>
          </Link>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
