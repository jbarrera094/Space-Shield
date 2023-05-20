import Link from "next/link";

import { userService } from "services";

export default NavBar;

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light size-screen-nav py-2">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          Space Shield
        </Link>
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
            <Link className="nav-item nav-link" href="/account/login">
              Login
            </Link>
            <Link className="nav-item nav-link" href="/account/register">
              Register
            </Link>
            <button onClick={userService.logout} className="btn btn-link nav-item nav-link">Logout</button>
          </ul>
          
          <button className="btn btn-outline-success" type="submit">
            Download Free
          </button>
        </div>
      </div>
    </nav>
  );
}
