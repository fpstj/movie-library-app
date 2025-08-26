import React from "react";
import Cinevo from "../assets/logo.png";

const Navbar: React.FC = () => (
  <nav
    className="navbar d-flex align-items-center px-4 py-3"
    // style={{ height: "64px" }}
  >
    <div className="navbar-brand">
      <img src={Cinevo} alt="Cinevo" width="150rem" />
    </div>
    <button className="btn btn-outline-danger" type="submit">
      Login
    </button>
  </nav>
);

export default Navbar;
