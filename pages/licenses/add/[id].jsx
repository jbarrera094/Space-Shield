import { Layout, AddEdit } from 'components/licenses';
import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import { Spinner } from 'components';

import { packService, alertService } from 'services';

export default Add;

function Add() {
    const router = useRouter();
    const [ pack, setPack ] = useState(-1);

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
            {pack ? <AddEdit pack={pack} /> : <Spinner />}
        </Layout>
    );
}