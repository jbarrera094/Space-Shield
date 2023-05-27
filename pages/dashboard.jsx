import Link from 'next/link';
import { useEffect, useState } from 'react';

import { userService, packService } from 'services';

export default Dashboard;

function Dashboard() {
    const [ anyPack, setAnyPack ] = useState(false);

    useEffect(() => {
        packService.getAll({id_user: userService.userValue?.id_user}).then(x => setAnyPack(x.length > 0));
    }, []);    

    return (
        <div className="p-4">
            <div className="container">
                <h1>Hola {userService.userValue?.firstName}!</h1>
                <p className={anyPack ? '': 'd-none'}><Link href="/licenses">Manage Licenses</Link></p>
            </div>
        </div>
    );
}
