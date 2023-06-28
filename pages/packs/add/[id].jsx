import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout, AddEdit } from 'components/packs';
import { Spinner } from 'components';
import { alertService, packService } from 'services';

export default Add;

function Add() {
    const router = useRouter();
    const [ typePack, setTypePack ] = useState(0);

    useEffect(() => {
        const { id } = router.query;
        if (!id) return;

        setTypePack(id);
    }, [router]);

    return (
        <Layout>
            { typePack ? <AddEdit typePack={typePack} /> : <Spinner /> }
        </Layout>
    );
}