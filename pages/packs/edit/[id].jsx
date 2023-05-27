import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout, AddEdit } from 'components/packs';
import { Spinner } from 'components';
import { alertService, packService } from 'services';

export default Edit;

function Edit() {
    const router = useRouter();
    const [ pack, setPack ] = useState(null);

    useEffect(() => {
        const { id } = router.query;
        if (!id) return;

        // fetch user and set default form values if in edit mode
        packService.getById(id)
            .then(x => setPack(x))
            .catch(alertService.error)
    }, [router]);

    return (
        <Layout>
            <h1>Edit Pack</h1>
            { pack ? <AddEdit pack={pack} /> : <Spinner /> }
        </Layout>
    );
}