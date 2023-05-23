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
        <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
            <div className="navbar-nav">
                <NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
                <NavLink href="/dashboard" className={!user ? "d-none" : "nav-item nav-link"}>Dashboard</NavLink>
                <NavLink href="/licenses" className={!user ? "d-none" : user.licenses_available > 0 ? "nav-item nav-link" : "d-none"}>Licencias</NavLink>
                <button onClick={userService.logout} className={!user ? "d-none" : "btn btn-link nav-item nav-link"}>Logout</button>
                <NavLink className={user ? "d-none" : "btn btn-link nav-item nav-link"} href="/account/login">
                    Login
                </NavLink>
                <NavLink className={user ? "d-none" : "btn btn-link nav-item nav-link"} href="/account/register">
                    Register
                </NavLink>
            </div>
        </nav>
    );
}