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
                            <span className='fw-bold fs-1'>150</span> 
                            <span className='fw-bold fs-4'>EUR</span>
                            <span className='text-secondary fw-semibold fs-5'>/month</span>
                        </span>
                        <div className="mt-4 mb-4 d-flex flex-column">
                            <p className='fs-6 text-secondary fw-normal mb-0'>Recommended for small businesses and freelancers, contains the following features:</p>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>1 License</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>Basic Features</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>Advanced Features</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>IEC 62305 Calculation</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>NTC 2050 Calculation</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>Access to new features with each update</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>150 EUR/License</span>
                            </div>

                            {/* NO INCLUDED IN THIS PACK */}
                            <div className="d-flex mb-2 opacity-50">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-secondary icon-pack-list-size' />
                                <span className='fs-6 fw-normal text-decoration-line-through'>Improved support response times</span>
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
                            <span className='fw-bold fs-1'>199</span> 
                            <span className='fw-bold fs-4'>EUR</span>
                            <span className='text-secondary fw-semibold fs-6'>/month</span>
                        </span>
                        <div className="mt-4 mb-4 d-flex flex-column">
                            <p className='fs-6 text-secondary fw-normal mb-0'>Recommended for medium and growing businesses, contains the following features:</p>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>5 License</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>Basic Features</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>Advanced Features</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>IEC 62305 Calculation</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>NTC 2050 Calculation</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>Access to new features with each update</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>40 EUR/License</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>Improved support response times</span>
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
                            <span className='fw-bold fs-1'>330</span> 
                            <span className='fw-bold fs-4'>EUR</span>
                            <span className='text-secondary fw-semibold fs-5'>/month</span>
                        </span>
                        <div className="mt-4 mb-4 d-flex flex-column">
                            <p className='fs-6 text-secondary fw-normal mb-0'>Recommended for large and very large businesses, contains the following features:</p>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>10 License</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>Basic Features</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>Advanced Features</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>IEC 62305 Calculation</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>NTC 2050 Calculation</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>Access to new features with each update</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>33 EUR/License</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>Improved support response times</span>
                            </div>
                        </div>
                        <Link href={`${ router.asPath == "/" ? defaultURL : "/packs/add/3"}`} className="btn btn-primary py-2 fw-semibold w-100">Choose Plan</Link>
                    </div>
                </div>
            </div>
        
    );  
}
