/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from 'next/document'
import { faYoutube, faWhatsapp, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from "next/link";

export default Document;

function Document() {
    return (
        <Html lang="en" className='style-scrollbar'>
            <Head>
                <link rel="icon" href="/logo.png"/>
            </Head>


            <body>
                <Main />
                <NextScript />
                {/* footer */}
                <footer className="bg-dark text-white">
                    <div className='d-flex flex-column justify-content-center size-footer'>
                        <div className="px-2 px-md-5 row w-100">
                            <span className='my-auto col-12 col-md-4 text-center text-md-start'>
                            © Copyright {new Date().getFullYear()} Space Shield.
                            </span>
                            <span className='my-auto col-12 col-md-4 text-center'>sps@bsenergy.co / (+57) 3202864969</span>
                            <div className="d-flex col-12 col-md-4 d-flex justify-content-center justify-content-md-end">
                                <Link href='https://wa.me/573202864969' target='_blank' rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faWhatsapp} className='footer-icon-social-size my-auto me-2'/>
                                </Link>
                                <Link href='https://t.me/+573202864969' target='_blank' rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faTelegram} className='footer-icon-social-size my-auto me-2'/>
                                </Link>
                                <Link href={'#'} target='_blank' rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faYoutube} className='footer-icon-stream-size my-auto'/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </footer> 
            </body>

        </Html>
    );
}
