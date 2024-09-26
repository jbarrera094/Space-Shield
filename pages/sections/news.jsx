import {
    faStar,
    faTriangleExclamation,
    faCircleCheck,
    faBell
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import Image from "next/image";
import { contentfulService } from "services";

const newsTypeConfig = {
    "Bug": { icon: faTriangleExclamation, className: "text-warning" },
    "Caracteristica": { icon: faCircleCheck, className: "text-success" },
    "Evento": { icon: faBell, className: "text-primary" },
    "Notificacion": { icon: faStar, className: "text-warning" },
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
        <div className="container">
            <div className="d-flex justify-content-between mb-4">
                <div className="opacity-0 d-none d-md-block">.</div>
                <h2 className="fw-bold fs-4">News</h2>

                <div className="btn-group">
                    <button type="button" className="btn btn-primary dropdown-toggle w-10rem" data-bs-toggle="dropdown" aria-expanded="false">
                        {language === "es-CO" ? "Español" : "English"}
                    </button>

                    <ul className="dropdown-menu">
                        <li>
                            <button className="dropdown-item d-flex align-items-center" onClick={() => setLanguage("es-CO")}>
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
                            <button className="dropdown-item d-flex align-items-center" onClick={() => setLanguage("en-US")}>
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

            <table className="table table-striped">
                <tbody>
                    {loading && !entries.length && (
                        <tr>
                            <td colSpan="3" className="text-center">
                                <p class="placeholder-glow">
                                    <span class="placeholder col-12"></span>
                                </p>
                            </td>
                        </tr>
                    )}

                    {entries.map((entry) => {
                        const { icon, className } = newsTypeConfig[entry.fields.typeNews] || {};

                        return (
                            <tr key={entry.sys.id}>
                                <th scope="row" className={`align-middle fs-4 ${className}`}>
                                    <FontAwesomeIcon icon={icon} />
                                </th>
                                <td className="align-middle">{entry.fields.date}</td>
                                <td className="d-flex flex-column">
                                    <span className="fw-semibold">{
                                        !loading ?
                                            entry.fields.title :
                                            <p class="placeholder-glow mb-0">
                                                <span class="placeholder w-10rem"></span>
                                            </p>
                                    }</span>
                                    <p className="mb-0">{
                                        !loading ?
                                            entry.fields.description :
                                            <p class="placeholder-glow mb-0">
                                                <span class="placeholder w-20rem"></span>
                                            </p>
                                    }</p>
                                </td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
        </div>
    )
}