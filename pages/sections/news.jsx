import {
  faStar,
  faTriangleExclamation,
  faPlay,
  faExclamation,
  faCircleCheck,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import Image from "next/image";
import { contentfulService } from "services";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { CalendarStar } from "components/icons";

const newsTypeConfig = {
  // Bug: { icon: faTriangleExclamation, className: "text-warning" },
  Caracteristica: { icon: faCircleCheck, className: "text-success" },
  Notificacion: { icon: faBell, className: "text-primary" },
  Evento: { icon: faStar, className: "text-warning" },
};
export default function News() {
  const [language, setLanguage] = useState("en-US");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    contentfulService.news(language).then((data) => {
      setLoading(false);
      setEntries(data.items);
    });
  }, [language]);

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="opacity-0 d-none d-md-block col">.</div>
        <h2 className="fw-bold fs-4 col text-center">Latest News</h2>

        {/* Language */}
        <div className="col d-flex justify-content-end">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-primary dropdown-toggle w-10rem"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {language === "es-CO" ? "Español" : "English"}
            </button>

            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item d-flex align-items-center"
                  onClick={() => setLanguage("es-CO")}
                >
                  <Image
                    src="/es-flag.svg"
                    alt="es-flag"
                    width={28}
                    height={28}
                    className="me-2"
                  />
                  <span>Español</span>
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item d-flex align-items-center"
                  onClick={() => setLanguage("en-US")}
                >
                  <Image
                    src="/uk-flag.svg"
                    alt="uk-flag"
                    width={28}
                    height={28}
                    className="me-2"
                  />
                  <span>English</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 12px" }}>
        <table className="table table-striped">
          <tbody>
            {loading && !entries.length && (
              <tr>
                <td colSpan="3" className="text-center">
                  <p className="placeholder-glow">
                    <span className="placeholder col-12"></span>
                  </p>
                </td>
              </tr>
            )}

            {entries.map((entry) => {
              const { icon, className } =
                newsTypeConfig[entry.fields.typeNews] || {};

              return (
                <tr key={entry.sys.id} className="row">
                  <th scope="row" className="col-1">
                    {icon ? (
                      <span
                        className={`h-100 d-flex flex-column justify-content-center fs-4 ${className}`}
                      >
                        {/* Icono */}
                        {className === "text-warning" ? (
                          // <CalendarStar />
                          <Image
                            src="/star-icon.svg"
                            width={24}
                            height={24}
                            alt="star"
                            className="mx-auto"
                          />
                        ) : (
                          <FontAwesomeIcon icon={icon} />
                        )}
                      </span>
                    ) : (
                      <span className="fa-layers fa-fw h-100 d-flex flex-column justify-content-center fs-4">
                        {/* Triángulo amarillo */}
                        <FontAwesomeIcon
                          icon={faPlay}
                          color="#ff9300"
                          rotation={270}
                        />

                        {/* Signo de exclamación negro */}
                        <FontAwesomeIcon
                          icon={faExclamation}
                          color="black"
                          transform="shrink-6"
                        />
                      </span>
                    )}
                  </th>
                  <td className="col-11 col-md-2">
                    <span className="h-100 d-flex flex-column justify-content-center">
                      {entry.fields.date}
                    </span>
                  </td>
                  <td className="col-12 col-md-9">
                    <div className="d-flex flex-column">
                      <span className="fw-semibold">
                        {!loading ? (
                          entry.fields.title
                        ) : (
                          <p className="placeholder-glow mb-0">
                            <span className="placeholder w-10rem"></span>
                          </p>
                        )}
                      </span>
                      <p className="mb-0">
                        {!loading ? (
                          documentToReactComponents(entry.fields.description)
                        ) : (
                          <p className="placeholder-glow mb-0">
                            <span className="placeholder w-20rem"></span>
                          </p>
                        )}
                      </p>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
