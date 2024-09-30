import {
  faCircleDollarToSlot,
  faGaugeHigh,
  faShieldHalved,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function VideoTutorial() {
  return (
    <div className="container-fluid">
      <main className="row">
        {/* Video Tutorial */}
        <div className="col-12 col-md-6 mb-4 mb-md-0 align-content-center">
          <lite-youtube videoid="rSaCQe34qMU"></lite-youtube>
        </div>

        {/* Features */}
        <section className="col-12 col-md-6">
          <div className="row h-md-50 pb-2">
            <div className="col-6">
              <div className="card h-100 text-center shadow">
                <div className="card-body align-content-center">
                  <FontAwesomeIcon
                    icon={faShieldHalved}
                    className="features-icon-size text-info"
                  />
                  <h5 className="card-title fw-bold pb-1">
                    Increases Performance
                  </h5>
                  <p className="card-text">
                    Ensure greater safety for life, goods, and services.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="card h-100 text-center shadow">
                <div className="card-body align-content-center">
                  <FontAwesomeIcon
                    icon={faCircleDollarToSlot}
                    className="features-icon-size text-info"
                  />
                  <h5 className="card-title fw-bold pb-1">Optimize Costs</h5>
                  <p className="card-text">
                    Increase productivity, lower infrastructure investment
                    costs, and empower your design professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row h-md-50 pt-2">
            <div className="col-6">
              <div className="card h-100 text-center shadow">
                <div className="card-body align-content-center">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="features-icon-size text-info"
                  />
                  <h5 className="card-title fw-bold pb-1">Higher Quality</h5>
                  <p className="card-text">
                    Stand out in the market with 3D models representation.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="card h-100 text-center shadow">
                <div className="card-body align-content-center">
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
