import { useEffect, useState } from "react";
import { contentfulService } from "services";

export default function Status() {

    const [aplicationStatus, setAplicationStatus] = useState(true);
    const [freeTrialStatus, setFreeTrialStatus] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await contentfulService.status();
        setAplicationStatus(res.items[0].fields.aplicationStatus);
        setFreeTrialStatus(res.items[0].fields.freeTrialStatus);
    };

    return (
        <div className="custom-status-position px-md-5">
            <section className="container-fluid d-flex flex-column">
                <div className="form-check form-switch">
                    <input className="form-check-input text-green" type="checkbox" role="switch" id="aplication_status" checked={aplicationStatus ?? false} disabled />
                    <label className="form-check-label text-white status-label" htmlFor="aplication_status">APLICATION STATUS</label>
                </div>
                <div className="form-check form-switch">
                    <input className="form-check-input text-green" type="checkbox" role="switch" id="free-trial_status" checked={freeTrialStatus ?? false} disabled />
                    <label className="form-check-label text-white status-label" htmlFor="free-trial_status">FREE TRIAL STATUS</label>
                </div>
            </section>
        </div>
    )
}