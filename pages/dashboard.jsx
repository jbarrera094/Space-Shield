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
                {anyPack ? 
                    <Link href="/licenses">Manage Licenses</Link>
                : <div className=""></div>}
                    <div className="d-flex justify-content-between">
                        <div className="card text-center">
                            <div className="card-body">
                                <h5 className="card-title">Personal Plan</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <Link href={`/packs/add/1`} className="btn btn-primary">Buy Now!</Link>
                            </div>
                        </div>

                        <div className="card text-center">
                            <div className="card-body">
                                <h5 className="card-title">Corporate Plan</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <Link href={`/packs/add/2`} className="btn btn-primary">Buy Now!</Link>
                            </div>
                        </div>
                    </div>             
                
            </div>
        </div>
    );
}
