import Link from 'next/link';
import { useState, useEffect } from 'react';
import moment from 'moment';


import { Spinner } from 'components';
import { Layout } from 'components/licenses';
import { licenseService, userService } from 'services';

export default Index;

function Index() {
    const [licenses, setLicenses] = useState(null);

    useEffect(() => {
        licenseService.getAll({id_user: userService.userValue?.id_user}).then(x => setLicenses(x));
    }, []);

    function deleteLicense(id) {
        setUsers(users.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        licenseService.delete(id).then(() => {
            setUsers(users => users.filter(x => x.id !== id));
        });
    }

    return (
        <Layout>
            <h1>Licenses</h1>
            <Link href="/licenses/add" className="btn btn-sm btn-success mb-2">Add License</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>User</th>
                        <th style={{ width: '30%' }}>Password</th>
                        <th style={{ width: '30%' }}>Expiration Date</th>
                        <th style={{ width: '10%' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {licenses && licenses.map(license =>
                        <tr key={license.id_license}>
                            <td>{license.user}</td>
                            <td>{license.hash}</td>
                            <td>{moment(license.expiration_date).format('LLLL')}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/licenses/edit/${license.id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                                <button onClick={() => deleteLicense(license.id)} className="btn btn-sm btn-danger btn-delete-license" style={{ width: '60px' }} disabled={license.isDeleting}>
                                    {license.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!licenses &&
                        <tr>
                            <td colSpan="4">
                                <Spinner />
                            </td>
                        </tr>
                    }
                    {licenses && !licenses.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Licenses To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </Layout>
    );
}
