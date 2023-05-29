import { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';

import { NavLink } from '.';
import { userService } from 'services';

export { Nav };

function Nav() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    const handleDescargarImagen = () => {
        const url = 'https://download2338.mediafire.com/ptikwfogkfkgVWau7llC4XZmB1OlWUTlQpg43KIGvY4-JGrSULrPzYTVqDjKd2dIj4IHZMbwVUEt7P_eUmLRPWeA2CIasSmqV7m1r6Nz82hEqWXPXdqb-Zos2bdxmT8jmV5IrzxbUJeGd8YlAGP2sKvcLB99gQb0P0uLwmmIDU2ZjFA/i61v724r82svozg/7z1900-x64.exe';
        const nombreArchivo = 'space_shield.exe';
    
        saveAs(url, nombreArchivo);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-2">
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
                        <NavLink href="/dashboard" className={!user ? "d-none" : "btn btn-link nav-item nav-link"}>Dashboard</NavLink>
                        <NavLink href="/licenses" className={!user ? "d-none" : user.licenses_available > 0 ? "btn btn-link nav-item nav-link" : "d-none"}>Licencias</NavLink>
                        <button onClick={userService.logout} className={!user ? "d-none" : "btn btn-link nav-item nav-link"}>Logout</button>
                        <NavLink className={user ? "d-none" : "btn btn-link nav-item nav-link"} href="/account/login">
                            Login
                        </NavLink>
                        <NavLink className={user ? "d-none" : "btn btn-link nav-item nav-link"} href="/account/register">
                            Register
                        </NavLink>
                    </ul>

                    <a className="btn btn-outline-success d-hiden-movile" onClick={handleDescargarImagen}>
                        Download Free
                    </a>
                </div>
            </div>
        </nav>
    );
}