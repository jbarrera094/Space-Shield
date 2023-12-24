/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from "next/document";
import {
  faYoutube,
  faWhatsapp,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";

export default Document;

function Document() {
  return (
    <Html lang="en" className="style-scrollbar">
      <Head>
        <link rel="icon" href="/logo.png" />
      </Head>

      <body>
        <Main />
        <NextScript />
        {/* footer */}
        <footer className="bg-dark text-white">
          <div className="d-flex flex-column justify-content-center size-footer">
            <div className="px-2 px-md-5 row w-100">
              <div className="my-auto col-12 col-md-4 d-flex justify-content-center justify-content-md-start">
                <Link
                  href="mailto:sps@bsenergy.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex flex-column justify-content-center text-decoration-none w-fit-contain"
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="footer-icon-social-size my-auto mx-auto"
                  />
                  <span>sps@bsenergy.co</span>
                </Link>
              </div>

              <div className="my-auto col-12 col-md-4 my-auto text-center">
                <span>
                  {" "}
                  © Copyright {new Date().getFullYear()} Space Shield.
                </span>
              </div>

              {/* <div className='my-auto col-12 col-md-4 my-auto'>
                                <div className='d-flex flex-column justify-content-center text-center text-decoration-none'>
                                    <div className='d-flex justify-content-center'>
                                        <Link href='https://wa.me/573202864969' target='_blank' rel="noopener noreferrer">
                                            <FontAwesomeIcon icon={faWhatsapp} className='footer-icon-social-size my-auto me-2'/>
                                        </Link>
                                        <Link href='https://t.me/+573202864969' target='_blank' rel="noopener noreferrer">
                                            <FontAwesomeIcon icon={faTelegram} className='footer-icon-social-size my-auto me-2'/>
                                        </Link>
                                    </div>
                                    <span className='text-primary'>(+57) 3202864969</span>
                                </div>                                
                </div> */}

              <div className="my-auto col-12 col-md-4 d-flex justify-content-center justify-content-md-end">
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex flex-column justify-content-center text-decoration-none w-fit-contain"
                >
                  <FontAwesomeIcon
                    icon={faYoutube}
                    className="footer-icon-social-size my-auto mx-auto"
                  />
                  <span>@space shield</span>
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </Html>
  );
}
