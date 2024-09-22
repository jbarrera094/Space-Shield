import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { userService } from 'services';

export { Layout };

function Layout({ children }) {
    const router = useRouter();

    useEffect(() => {
        // redirect to home if already logged in
        if (userService.userValue) {
            router.push('/');
        }
    }, []);

    return (
        <div className="container app-container">
            <div className='d-flex justify-content-center app-container'>
                <div className="d-flex flex-column justify-content-center">
                    {children}
                </div>
            </div>
        </div>
    );
}