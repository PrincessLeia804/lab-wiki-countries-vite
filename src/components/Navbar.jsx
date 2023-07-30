import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-primary mb-3" >
      <Link to={'/'} style={{color: 'white', textDecoration: "none"}}><h4>WikiCountries</h4></Link>
    </nav>
  );
}

export default Navbar;
