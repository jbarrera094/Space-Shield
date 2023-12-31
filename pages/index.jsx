import Carousel from "components/Carousel";
import {
  faCircleDollarToSlot,
  faGaugeHigh,
  faStar,
  faCloudDownload,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default Home;

function Home() {
  return (
    <div>
      <Carousel />

      <section className="bg-white w-100 py-5">
        <div className="container">
          <div className="d-flex justify-content-center">
            <h4 className="fw-bold">FEATURES</h4>
          </div>
          <div className="row d-flex justify-content-center justify-content-md-between">
            <div className="card text-center col-10 col-md-3 shadow">
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

            <div className="card text-center col-10 col-md-3 shadow">
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

            <div className="card text-center col-10 col-md-3 shadow">
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
        <div className="container">
          <div className="d-flex justify-content-center">
            <iframe
              className="w-75 h-video-auto"
              src="https://www.youtube.com/embed/rSaCQe34qMU"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <div className="mx-4">
        <hr />
      </div>

      <section className="d-flex justify-content-center py-5">
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
      </section>
    </div>
  );
}
