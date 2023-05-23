import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout, AddEdit } from 'components/licenses';
import { Spinner } from 'components';
import { licenseService, alertService } from 'services';

export default Edit;

function Edit() {
    const router = useRouter();
    const [license, setLicense] = useState(null);

    useEffect(() => {
        const { id } = router.query;
        if (!id) return;

        // fetch user and set default form values if in edit mode
        licenseService.getById(id)
            .then(x => setLicense(x))
            .catch(alertService.error)
    }, [router]);

    return (
        <Layout>
            <h1>Edit License</h1>
            {license ? <AddEdit license={license} /> : <Spinner />}
        </Layout>
    );
}