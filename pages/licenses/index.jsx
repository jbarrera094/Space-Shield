import Link from 'next/link';
import { useState, useEffect } from 'react';
import moment from 'moment';


import { Spinner } from 'components';
import { Layout } from 'components/licenses';
import { licenseService, userService, packService } from 'services';

export default Index;

function Index() {
    const [licenses, setLicenses] = useState(null);
    const [licensesAvailable, setLicensesAvailable] = useState(0);
    const [packs, setPacks] = useState(null);
    const [idPack, setIdPack] = useState(0);

    useEffect(() => {
        packService.getAll({ id_user: userService.userValue?.id_user }).then(x => {
            setPacks(x);
            setLicensesAvailable(x[0].licenses_available);
            setIdPack(x[0].id_pack)
            licenseService.getAll({ id_pack: x[0].id_pack }).then(x => setLicenses(x));
        });
    }, []);

    function deleteLicense(id_license) {
        setLicenses(licenses.map(x => {
            if (x.id_license === id_license) { x.isDeleting = true; }
            return x;
        }));
        licenseService.delete(id_license).then(() => {
            setLicenses(licenses => licenses.filter(x => x.id_license !== id_license));
            setLicensesAvailable(licensesAvailable + 1);
        });
    }

    const handleSelect = (e) => {
        // Update Id Pack
        setIdPack(e.target.value)

        // Enable loader
        setLicenses(null);

        // Search pack without looking fro database
        packs.map(pack => {
            if (pack.id_pack == e.target.value) {
                setLicensesAvailable(pack.licenses_available);
            }
        });

        // Get licenses available for this Pack
        licenseService.getAll({ id_pack: e.target.value }).then(x => setLicenses(x));
    }

    return (
        <Layout>
            <h1>Licenses</h1>
            <span>Please select a license package</span>

            {/** -------------------------------------- Select Pack of Licenses -------------------------------------- */}

            <div className="d-flex mb-3">

                <select className="form-select me-3" aria-label="Default select packages" onChange={handleSelect}>
                    {packs && packs.map(pack =>
                        <option key={pack.id_pack} value={pack.id_pack}>{pack.alias}</option>
                    )}
                </select>

                <Link href={`/packs/edit/${idPack}`} className="btn btn-outline-primary">Update Alias</Link>
            </div>

            {/** --------------------------------------  Manager Licenses -------------------------------------- */}

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>User</th>
                        <th style={{ width: '30%' }}>Key</th>
                        <th style={{ width: '30%' }}>Last Update</th>
                        <th style={{ width: '10%' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {licenses && licenses.map(license =>
                        <tr key={license.id_license}>
                            <td>{license.user}</td>
                            <td>{license.hash}</td>
                            <td>{moment(license.updatedAt).format('LLLL')}</td>
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

            <div className="d-flex">
                <Link href={`/licenses/add/${idPack}`} className={licensesAvailable > 0 ? "btn btn-outline-primary w-100" : "btn btn-outline-primary w-100 disabled"}>Add License ({licensesAvailable})</Link>
            </div>
        </Layout>
    );
}
