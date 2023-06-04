/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from 'next/document'
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from "next/link";

export default Document;

function Document() {
    return (
        <Html lang="en" className='style-scrollbar'>
            <Head></Head>


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
                            <span className='my-auto col-12 col-md-4 text-center'>soporte@bsenergy.co / (+57) 3XX XXX XXXX</span>
                            <div className="d-flex col-12 col-md-4 d-flex justify-content-center justify-content-md-end">
                                <Link href={'#'}>
                                    <FontAwesomeIcon icon={faYoutube} className='footer-icon-size'/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </footer> 
            </body>

        </Html>
    );
}
