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
                <footer className="bg-dark p-4 text-white size-footer">
                    <div className="container d-flex justify-content-between">
                        <span className='my-auto'>
                        © Copyright {new Date().getFullYear()} Space Shield.
                        </span>
                        <div className="d-flex">
                            <Link href={'#'}>
                                <FontAwesomeIcon icon={faYoutube} className='footer-icon-size'/>
                            </Link>
                        </div>
                    </div>
                </footer> 
            </body>

        </Html>
    );
}
