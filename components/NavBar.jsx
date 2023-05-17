import Link from "next/link";

import { userService } from "services";

export default NavBar;

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light size-screen-nav">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Space Shield
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/account/login">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/account/register">
                Register
              </a>
            </li>
          </ul>
          
          <button className="btn btn-outline-success" type="submit">
            Download Free
          </button>
        </div>
      </div>
    </nav>
  );
}
