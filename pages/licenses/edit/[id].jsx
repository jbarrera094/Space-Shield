import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout, AddEdit } from 'components/licenses';
import { Spinner } from 'components';
import { licenseService, alertService, packService } from 'services';

export default Edit;

function Edit() {
    const router = useRouter();
    const [ license, setLicense ] = useState(null);
    const [ pack, setPack ] = useState(null);

    useEffect(() => {
        const { id } = router.query;
        if (!id) return;

        // fetch user and set default form values if in edit mode
        licenseService.getById(id)
            .then(x => {
                x.user = x.user.split("_")[1];
                setLicense(x);

                packService.getById(x.id_pack)
                .then(x => setPack(x))
                .catch(alertService.error)
            })
            .catch(alertService.error)
    }, [router]);

    return (
        <Layout>
            {license ? pack ? <AddEdit license={license} pack={pack} /> : <Spinner /> : <Spinner />}
        </Layout>
    );
}