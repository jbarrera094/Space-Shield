import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from 'services';

export { Nav };

function Nav() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    // only show nav when logged in
    // if (!user) return null;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark size-screen-nav py-2">
            <div className="container-fluid">
                <NavLink className="navbar-brand" exact href="/">
                    Space Shield
                </NavLink>
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
                        <NavLink href="/dashboard" className={!user ? "d-none" : "nav-item nav-link"}>Dashboard</NavLink>
                        <NavLink href="/licenses" className={!user ? "d-none" : user.licenses_available > 0 ? "nav-item nav-link" : "d-none"}>Licencias</NavLink>
                        <button onClick={userService.logout} className={!user ? "d-none" : "btn btn-link nav-item nav-link"}>Logout</button>
                        <NavLink className={user ? "d-none" : "btn btn-link nav-item nav-link"} href="/account/login">
                            Login
                        </NavLink>
                        <NavLink className={user ? "d-none" : "btn btn-link nav-item nav-link"} href="/account/register">
                            Register
                        </NavLink>
                    </ul>
                    
                    <button className="btn btn-outline-success">
                        Download Free
                    </button>
                </div>
            </div>
        </nav>
    );
}