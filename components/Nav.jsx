import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { saveAs } from 'file-saver';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink } from '.';
import { userService } from 'services';

export { Nav };

function Nav() {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const customBg = [
        '/',
        '/account/login', 
        '/account/register',
        '/packs/add/[id]',
        '/packs/edit/[id]',
        '/licenses/add/[id]',
        '/licenses/edit/[id]',
        '/awaitSuccess'
    ];

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
        <nav className={`navbar navbar-expand-lg py-2 px-md-5 position-absolute top-0 start-0 z-index-10 w-100 ${customBg.includes(router.pathname) ?'bg-dark bg-opacity-50' : 'bg-main-nav'}`}>
            <div className="container-fluid">
                <NavLink className="navbar-brand text-white fs-4" exact href="/">
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
                        <NavLink href="/dashboard" className={!user ? "d-none" : "btn btn-link nav-item nav-link text-white"}>
                            <div className="d-flex">
                                <FontAwesomeIcon icon={faCircleUser} className='me-1 my-auto icon-nav-size' />
                                <span>Panel</span>
                            </div>
                        </NavLink>
                        <NavLink href="/licenses" className={!user ? "d-none" : user.licenses_available > 0 ? "btn btn-link nav-item nav-link text-white" : "d-none"}>Licencias</NavLink>
                        <button onClick={userService.logout} className={!user ? "d-none" : "btn btn-link nav-item nav-link text-white"}>Logout</button>
                        <NavLink className={user ? "d-none" : "btn btn-link nav-item nav-link text-white"} href="/account/login">
                            Login
                        </NavLink>
                        <NavLink className={user ? "d-none" : "btn btn-link nav-item nav-link text-white"} href="/account/register">
                            Register
                        </NavLink>
                    </ul>

                    <a className="btn btn-outline-light d-hiden-movile me-2" href='/SpS.rar'>
                        Download Free
                    </a>

                    <a className="btn btn-light d-hiden-movile" href='/packages'>
                        Order Now
                    </a>
                </div>
            </div>
        </nav>
    );
}