/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from 'next/document'
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from "next/link";

export default Document;

function Document() {
    return (
        <Html lang="en" className='style-scrollbar'>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossOrigin="anonymous"/>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossOrigin="anonymous"></script>
            </Head>


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
