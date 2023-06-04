import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default PacksList;

function PacksList() {
    const router = useRouter();

    return (
        <div className="d-flex justify-content-between">
            <div className="card text-center shadow">
                <div className="card-body">
                    <h5 className="card-title">Personal Plan</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <Link href={`${ router.asPath == "/" ? "/account/register" : "/packs/add/1"}`} className="btn btn-primary">Buy Now!</Link>
                </div>
            </div>

            <div className="card text-center shadow">
                <div className="card-body">
                    <h5 className="card-title">Corporate Plan</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <Link href={`${ router.asPath == "/" ? "/account/register" : "/packs/add/2"}`} className="btn btn-primary">Buy Now!</Link>
                </div>
            </div>
        </div>
    );  
}
