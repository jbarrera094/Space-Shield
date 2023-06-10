import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default PacksList;

function PacksList() {
    const router = useRouter();
    const defaultURL = "/account/register";

    return (
            <div className="d-flex flex-column flex-md-row justify-content-between">
                <div className="card text-start shadow custom-w-card">
                    <div className="card-body py-5 px-4">
                        <h5 className="card-title text-secondary fs-4 mb-4">Standard Package</h5>
                        <span className='card-text'>
                            <span className='fw-bold fs-3'>$</span> 
                            <span className='fw-bold fs-1'>750.000</span> 
                            <span className='fw-bold fs-4'>COP</span>
                            <span className='text-secondary fw-semibold fs-5'>/month</span>
                        </span>
                        <div className="mt-4 mb-4 d-flex flex-column">
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary' />
                                <span className='fs-6 text-secondary fw-normal'>One-year subscription</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary' />
                                <span className='fs-6 text-secondary fw-normal'>20GB Cloud storage</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary' />
                                <span className='fs-6 text-secondary fw-normal'>Integration help</span>
                            </div>

                            {/* NO INCLUDED IN THIS PACK */}
                            <div className="d-flex mb-2 opacity-50">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-secondary' />
                                <span className='fs-6 fw-normal text-decoration-line-through'>Sketch Files</span>
                            </div>
                            <div className="d-flex mb-2 opacity-50">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-secondary' />
                                <span className='fs-6 fw-normal text-decoration-line-through'>API Access</span>
                            </div>
                            <div className="d-flex mb-2 opacity-50">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-secondary' />
                                <span className='fs-6 fw-normal text-decoration-line-through'>Complete documentation</span>
                            </div>
                            <div className="d-flex mb-2 opacity-50">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-secondary' />
                                <span className='fs-6 fw-normal text-decoration-line-through'>24/7 phone & email support</span>
                            </div>
                        </div>
                        <Link href={`${ router.asPath == "/" ? defaultURL : "/packs/add/1"}`} className="btn btn-primary py-2 fw-semibold w-100">Choose Plan</Link>
                    </div>
                </div>

                <div className="card text-start shadow custom-w-card">
                    <div className="card-body py-5 px-4">
                        <h5 className="card-title text-secondary fs-4 mb-4">Corporative Package</h5>
                        <span className='card-text'>
                            <span className='fw-bold fs-4'>$</span> 
                            <span className='fw-bold fs-1'>1.000.000</span> 
                            <span className='fw-bold fs-4'>COP</span>
                            <span className='text-secondary fw-semibold fs-6'>/month</span>
                        </span>
                        <div className="mt-4 mb-4 d-flex flex-column">
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary' />
                                <span className='fs-6 text-secondary fw-normal'>One-year subscription</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary' />
                                <span className='fs-6 text-secondary fw-normal'>20GB Cloud storage</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary' />
                                <span className='fs-6 text-secondary fw-normal'>Integration help</span>
                            </div>

                            {/* NO INCLUDED IN THIS PACK */}
                            <div className="d-flex mb-2 opacity-50">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-secondary' />
                                <span className='fs-6 fw-normal text-decoration-line-through'>Sketch Files</span>
                            </div>
                            <div className="d-flex mb-2 opacity-50">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-secondary' />
                                <span className='fs-6 fw-normal text-decoration-line-through'>API Access</span>
                            </div>
                            <div className="d-flex mb-2 opacity-50">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-secondary' />
                                <span className='fs-6 fw-normal text-decoration-line-through'>Complete documentation</span>
                            </div>
                            <div className="d-flex mb-2 opacity-50">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-secondary' />
                                <span className='fs-6 fw-normal text-decoration-line-through'>24/7 phone & email support</span>
                            </div>
                        </div>
                        <Link href={`${ router.asPath == "/" ? defaultURL : "/packs/add/2"}`} className="btn btn-primary py-2 fw-semibold w-100">Choose Plan</Link>
                    </div>
                </div>

                <div className="card text-start shadow custom-w-card">
                    <div className="card-body py-5 px-4">
                        <h5 className="card-title text-secondary fs-4 mb-4">Enterprise Package</h5>
                        <span className='card-text'>
                            <span className='fw-bold fs-3'>$</span> 
                            <span className='fw-bold fs-1'>1.680.000</span> 
                            <span className='fw-bold fs-4'>COP</span>
                            <span className='text-secondary fw-semibold fs-5'>/month</span>
                        </span>
                        <div className="mt-4 mb-4 d-flex flex-column">
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary' />
                                <span className='fs-6 text-secondary fw-normal'>One-year subscription</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary' />
                                <span className='fs-6 text-secondary fw-normal'>20GB Cloud storage</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary' />
                                <span className='fs-6 text-secondary fw-normal'>Integration help</span>
                            </div>

                            {/* NO INCLUDED IN THIS PACK */}
                            <div className="d-flex mb-2 opacity-50">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-secondary' />
                                <span className='fs-6 fw-normal text-decoration-line-through'>Sketch Files</span>
                            </div>
                            <div className="d-flex mb-2 opacity-50">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-secondary' />
                                <span className='fs-6 fw-normal text-decoration-line-through'>API Access</span>
                            </div>
                            <div className="d-flex mb-2 opacity-50">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-secondary' />
                                <span className='fs-6 fw-normal text-decoration-line-through'>Complete documentation</span>
                            </div>
                            <div className="d-flex mb-2 opacity-50">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-secondary' />
                                <span className='fs-6 fw-normal text-decoration-line-through'>24/7 phone & email support</span>
                            </div>
                        </div>
                        <Link href={`${ router.asPath == "/" ? defaultURL : "/packs/add/3"}`} className="btn btn-primary py-2 fw-semibold w-100">Choose Plan</Link>
                    </div>
                </div>
            </div>
        
    );  
}
