import { useRouter } from 'next/router';

export { Layout };

function Layout({ children }) {
    const router = useRouter();

    return (
        <div className={` ${router.pathname == '/licenses' ? 'pt-5' : 'container app-container'}`}>
            <div className={` ${router.pathname == '/licenses' ? 'container pt-3' : 'd-flex justify-content-center app-container'}`}>
                <div className="d-flex flex-column justify-content-center">
                    {children}
                </div>
            </div>
        </div>
    );
}