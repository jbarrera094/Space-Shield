import Link from "next/link";

export default AwaitSuccess;

function AwaitSuccess() {
    return (
        <div className="container app-container">
            <div className='d-flex justify-content-center app-container'>
                <div className="d-flex flex-column justify-content-center">
                <div className="card bg-blur p-4">
                    <div className="card-body">
                        <h1 className='text-center mb-4 text-white fs-1 fw-bold'>Successful Transaction</h1>
                        <p className="text-white text-center fs-5">We will be enabling your license package(s) in the next 24 hours. Don&apos;t forget that you can find it in the following <Link className="text-decoration-none" href="/dashboard">dashboard link</Link>.</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
