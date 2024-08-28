/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from "next/document";
import {
  faYoutube,
  faWhatsapp,
  faTelegram,
  faLinkedin
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body>
        <script
          type="module"
          src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1.5.0/lite-youtube.js"
        ></script>
        <Main />
        <NextScript />
        {/* footer */}
        <footer className="bg-dark text-white">
          <div className="d-flex flex-column justify-content-center size-footer">
            <div className="p-2 px-md-5 py-md-1 row w-100 mx-auto">
              <div className="my-auto d-none d-md-block col-md-4 d-flex justify-content-center justify-content-md-start">
                <Link
                  href="mailto:lps@bsenergy.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex flex-column justify-content-center text-decoration-none w-fit-contain"
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="footer-icon-social-size my-auto mx-auto"
                  />
                  <span>lps@bsenergy.co</span>
                </Link>
              </div>

              <div className="my-auto d-none d-md-block col-md-4 text-center">
                <span> © Copyright {new Date().getFullYear()} LPS CAD.</span>
              </div>

              <div className="my-auto col-12 col-md-4 my-auto">
                <div className="d-flex flex-column justify-content-center text-center text-decoration-none">
                  <div className="d-flex justify-content-center">
                    <Link
                      href="https://wa.me/34616453084"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faWhatsapp}
                        className="footer-icon-social-size my-auto me-2"
                      />
                    </Link>
                    <Link
                      href="https://t.me/+34616453084"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faTelegram}
                        className="footer-icon-social-size my-auto me-2"
                      />
                    </Link>
                    <Link
                      href="http://www.linkedin.com/in/lpscad"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        className="footer-icon-social-size my-auto me-2"
                      />
                    </Link>
                    <Link
                      href="mailto:lps@bsenergy.co"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="d-md-none"
                    >
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="footer-icon-social-size my-auto mx-auto"
                      />
                    </Link>
                  </div>
                  <p className="text-primary m-0">
                    (+34) 616453084
                    <span className="text-primary ms-1 d-md-none">
                      - lps@bsenergy.co
                    </span>
                  </p>
                </div>
              </div>

              <div className="my-auto d-md-none text-center">
                <span> © Copyright {new Date().getFullYear()} LPS CAD.</span>
              </div>

              {/* <div className="my-auto col-12 col-md-4 d-flex justify-content-center justify-content-md-end">
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
                  <span>@LPS CAD</span>
                </Link>
              </div> */}
            </div>
          </div>
        </footer>
      </body>
    </Html>
  );
}
