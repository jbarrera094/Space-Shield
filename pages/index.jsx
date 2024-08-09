import Carousel from "components/Carousel";
import {
  faCircleDollarToSlot,
  faGaugeHigh,
  faStar,
  faCloudDownload,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VideoTutorial from "./sections/videoTutorial";

export default Home;

function Home() {
  return (
    <div>
      <Carousel />

      <section className="bg-white w-100 py-5">
        <div className="container">
          <div className="d-flex justify-content-center">
            <h4 className="fw-bold">Features</h4>
          </div>
          <div className="row d-flex justify-content-center justify-content-md-between">
            <div className="card text-center col-10 col-md-3 shadow mt-4 mt-md-0">
              <div className="card-body">
                <FontAwesomeIcon
                  icon={faCircleDollarToSlot}
                  className="features-icon-size text-info"
                />
                <h5 className="card-title fw-bold pb-1">Optimize Costs</h5>
                <p className="card-text">
                  Increase productivity, lower infrastructure investment costs,
                  and empower your design professionals.
                </p>
              </div>
            </div>

            <div className="card text-center col-10 col-md-3 shadow mt-4 mt-md-0">
              <div className="card-body">
                <FontAwesomeIcon
                  icon={faGaugeHigh}
                  className="features-icon-size text-info"
                />
                <h5 className="card-title fw-bold pb-1">
                  Increases Performance
                </h5>
                <p className="card-text">
                  Accelerate productivity, speed up design tasks.
                </p>
              </div>
            </div>

            <div className="card text-center col-10 col-md-3 shadow mt-4 mt-md-0">
              <div className="card-body">
                <FontAwesomeIcon
                  icon={faStar}
                  className="features-icon-size text-info"
                />
                <h5 className="card-title fw-bold pb-1">Higher Quality</h5>
                <p className="card-text">
                  Enhance precision, stand out in the market, improve quality,
                  and ensure greater safety for life, goods, and services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-4">
        <hr />
      </div>

      <section className="bg-white w-100 py-5">
        <VideoTutorial />
      </section>

      <div className="mx-4">
        <hr />
      </div>

      {/* <section className="d-flex justify-content-center py-5">
        <Link
          type="button"
          class="btn btn-success d-flex btn-lg fs-2"
          href="/packages"
        >
          <FontAwesomeIcon
            icon={faCloudDownload}
            className="me-2 my-auto icon-download-size"
          />
          <span>Decargar y Comprar</span>
        </Link>
      </section> */}

      <section className="d-flex justify-content-center py-5">
        <div className="container">
          <div className="d-flex flex-column text-center">
            <h4 className="fw-bold fs-4">
              Ready to increase your productivity?
            </h4>
            <p className="fs-5">We can take your project to the next level.</p>
            <div className="d-flex justify-content-center">
              <a href="/LPS.zip" className="btn btn-success btn-lg me-2">
                Download
              </a>
              <Link
                href="mailto:lps@bsenergy.co"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary btn-lg"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
