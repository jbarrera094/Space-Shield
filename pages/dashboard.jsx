import Link from 'next/link';
import { useEffect, useState } from 'react';
import PacksList from 'components/PacksList';

import { userService, packService } from 'services';

export default Dashboard;

function Dashboard() {
    const [ anyPack, setAnyPack ] = useState(false);

    useEffect(() => {
        packService.getAll({id_user: userService.userValue?.id_user}).then(x => setAnyPack(x.length > 0));
    }, []);    

    return (
        <div className="pt-5">
            <div className="container">
                <h1>Hola {userService.userValue?.firstName}!</h1>
                <hr />
                {anyPack ? 
                    <div>
                        <section className='d-flex justify-content-center'>
                            <Link href="/licenses" className='btn btn-primary btn-lg'>Manage Licenses</Link>
                        </section>
                        <hr className=''/>
                    </div>
                : <div className=""></div>}
                <PacksList />
            </div>
        </div>
    );
}
