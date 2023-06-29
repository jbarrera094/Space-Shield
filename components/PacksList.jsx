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
                    <div className="card-body pb-3 px-4">
                        <div className="d-flex row">
                            <h5 className="card-title text-secondary fs-4 mb-4 col-10">Standard Package Subscription</h5>
                        </div>
                        <span className='card-text'>
                            <span className='fw-bold fs-3'>&euro;</span> 
                            <span className='fw-bold fs-1'>150</span> 
                            <span className='fw-bold fs-4'>EUR</span>
                            <span className='text-secondary fw-semibold fs-5'>/month</span>
                        </span>
                        <div className="mt-4 mb-4 d-flex flex-column">
                            <p className='fs-6 text-secondary fw-normal mb-2'>Recommended for small businesses and freelancers, contains the following features:</p>
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
                                <span className='fs-6 text-secondary fw-normal'>NTC 4552 Calculation</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>Access to new features with each update</span>
                            </div>
                            

                            {/* NO INCLUDED IN THIS PACK */}
                            <div className="d-flex mb-2 opacity-50">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-secondary icon-pack-list-size' />
                                <span className='fs-6 fw-normal text-decoration-line-through'>Improved support response times</span>
                            </div>
                        </div>

                        <Link href={`${ router.asPath == "/" ? defaultURL : "/packs/add/1"}`} className="btn btn-outline-primary py-2 fw-semibold w-100">Monthly Subscription</Link>
                        <div className="d-flex justify-content-center mt-2 fw-bold">
                            <Link href='https://wa.me/573202864969?text=Hi! I would like to schedule a demo of Space shield.' target='_blank' rel="noopener noreferrer">
                                <span>Schedule a demo</span>
                            </Link>                            
                        </div>
                    </div>
                </div>

                <div className="card text-start shadow custom-w-card">

                    <div className='position-absolute fix-pos-award'>
                        <img src="/award_discount.png" alt="award" className='w-100' />
                    </div>
                    
                    <div className="card-body pb-3 px-4">
                        <div className="d-flex row">
                            <h5 className="card-title text-secondary fs-4 mb-4 col-10">Corporative Package Subscription</h5>
                        </div>
                        <span className='card-text text-secondary text-decoration-line-through'>
                            <span className='fw-bold fs-6'>&euro;</span> 
                            <span className='fw-bold fs-6'>300</span> 
                            <span className='fw-bold fs-6'>EUR</span>
                            <span className='fw-semibold fs-6'>/month</span>
                        </span>
                        <br></br>
                        <span className='card-text'>
                            <span className='fw-bold fs-4'>&euro;</span> 
                            <span className='fw-bold fs-1'>199</span> 
                            <span className='fw-bold fs-4'>EUR</span>
                            <span className='text-secondary fw-semibold fs-6'>/month</span>
                        </span>
                        
                        <br></br>
                        <span className='fs-6 fw-normal'>An annual recurring payment of <b>&euro;2.028 saving 15% (169 EUR/month)</b>.</span>

                        <div className="mt-3 mb-4 d-flex flex-column">
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
                                <span className='fs-6 text-secondary fw-normal'>NTC 4552 Calculation</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>Access to new features with each update</span>
                            </div>
                            
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>Improved support response times</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-around row">
                            <Link href={`${ router.asPath == "/" ? defaultURL : "/packs/add/2"}`} className="btn btn-success py-2 fw-semibold col-12 col-md-5 mb-2 mb-md-0">Annual Subscription</Link>
                            <Link href={`${ router.asPath == "/" ? defaultURL : "/packs/add/21"}`} className="btn btn-primary py-2 fw-semibold col-12 col-md-5">Monthly Subscription</Link>
                        </div>

                        <div className="d-flex justify-content-center mt-2 fw-bold">
                            <Link href='https://wa.me/573202864969?text=Hi! I would like to schedule a demo of Space shield.' target='_blank' rel="noopener noreferrer">
                                <span>Schedule a demo</span>
                            </Link>                            
                        </div>
                    </div>
                </div>

                <div className="card text-start shadow custom-w-card">

                    <div className='position-absolute fix-pos-award'>
                        <img src="/award_discount.png" alt="award" className='w-100' />
                    </div>

                    <div className="card-body pb-3 px-4">
                        <div className="d-flex row">
                            <h5 className="card-title text-secondary fs-4 mb-4 col-10">Enterprise Package Subscription</h5>
                        </div>
                        <span className='card-text text-secondary text-decoration-line-through'>
                            <span className='fw-bold fs-6'>&euro;</span> 
                            <span className='fw-bold fs-6'>500</span> 
                            <span className='fw-bold fs-6'>EUR</span>
                            <span className='fw-semibold fs-6'>/month</span>
                        </span>
                        <br></br>
                        <span className='card-text'>
                            <span className='fw-bold fs-3'>&euro;</span> 
                            <span className='fw-bold fs-1'>329</span> 
                            <span className='fw-bold fs-4'>EUR</span>
                            <span className='text-secondary fw-semibold fs-5'>/month</span>
                        </span>
                        
                        <br></br>
                        <span className='fs-6 fw-normal'>An annual recurring payment of <b>&euro;3.348 saving 15% (279 EUR/month)</b>.</span>

                        <div className="mt-3 mb-4 d-flex flex-column">
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
                                <span className='fs-6 text-secondary fw-normal'>NTC 4552 Calculation</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>Access to new features with each update</span>
                            </div>
                            <div className="d-flex mb-2">
                                <FontAwesomeIcon icon={faCircleCheck} className='me-2 my-auto text-primary icon-pack-list-size' />
                                <span className='fs-6 text-secondary fw-normal'>Improved support response times</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-around row">
                            <Link href={`${ router.asPath == "/" ? defaultURL : "/packs/add/3"}`} className="btn btn-outline-primary py-2 fw-semibold col-12 col-md-5 mb-2 mb-md-0">Annual Subscription</Link>
                            <Link href={`${ router.asPath == "/" ? defaultURL : "/packs/add/31"}`} className="btn btn-outline-primary py-2 fw-semibold col-12 col-md-5">Monthly Subscription</Link>
                        </div>

                        <div className="d-flex justify-content-center mt-2 fw-bold">
                            <Link href='https://wa.me/573202864969?text=Hi! I would like to schedule a demo of Space shield.' target='_blank' rel="noopener noreferrer">
                                <span>Schedule a demo</span>
                            </Link>                            
                        </div>
                    </div>
                </div>
            </div>
        
    );  
}
