import Link from 'next/link';
import { useState, useEffect } from 'react';
import moment from 'moment';


import { Spinner } from 'components';
import { Layout } from 'components/licenses';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { licenseService, userService, packService } from 'services';

export default Index;

function Index() {
    const [licenses, setLicenses] = useState(null);
    const [licensesAvailable, setLicensesAvailable] = useState(0);
    const [ packs, setPacks ] = useState(null);

    useEffect(() => {
        packService.getAll({id_user: userService.userValue?.id_user}).then(x  => {
            setPacks(x);
            setLicensesAvailable(x[0].licenses_available);
            licenseService.getAll({id_pack: x[0].id_pack}).then(x => setLicenses(x));
        });
    }, []);

    function deleteLicense(id_license) {
        setLicenses(licenses.map(x => {
            if (x.id_license === id_license) { x.isDeleting = true; }
            return x;
        }));
        licenseService.delete(id_license).then(() => {
            setLicenses(licenses => licenses.filter(x => x.id_license !== id_license));
        });
    }

    const handleSelect = (e) => {
        let id_pack = e.target.value;
        packs.map(pack => {
            if(pack.id_pack == id_pack){
                setLicensesAvailable(pack.licenses_available);
            }
        });
        licenseService.getAll({id_pack: id_pack}).then(x => setLicenses(x));
    }

    return (
        <Layout>
            <h1>Licenses</h1>
            <span>Please select a license package</span>
            <div className="d-flex mb-3">

                <select className="form-select me-3" aria-label="Default select packages" onChange={handleSelect}>
                    { packs && packs.map(pack => 
                        <option key={pack.id_pack} value={pack.id_pack}>{pack.alias}</option>
                    ) }
                </select>

                <button type="button" className="btn btn-outline-secondary" disabled>Update Alias</button>
            </div>
            <div className="d-flex justify-content-between">
                <Link href="/licenses/add" className={ licensesAvailable > 0 ? "btn btn-sm btn-success mb-2" : " btn btn-sm btn-success mb-2 disabled"}>Add License ({licensesAvailable})</Link>
                <span>Licenses Avalilable {licensesAvailable}</span>
            </div>
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
                                <Link href={`/licenses/edit/${license.id_license}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                                <button onClick={() => deleteLicense(license.id_license)} className="btn btn-sm btn-danger btn-delete-license" style={{ width: '60px' }} disabled={license.isDeleting}>
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
