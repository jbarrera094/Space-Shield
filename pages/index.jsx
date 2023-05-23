import Carousel from "components/Carousel";

export default Home;

function Home() {
    return (
        <div>
            <Carousel />

            <section className="bg-white w-100 py-5">
                <div className="container">
                    <div className="d-flex justify-content-center">
                        <h4>FEATURES</h4>
                    </div>
                    <div className="row d-flex justify-content-center justify-content-md-between">
                        <div className="card text-center col-10 col-md-3 shadow">
                            <div className="card-body">
                                <h5 className="card-title pb-3">Special title treatment</h5>
                                <p className="card-text">
                                    With supporting text below as a natural lead-in to additional
                                    content.
                                </p>
                            </div>
                        </div>

                        <div className="card text-center col-10 col-md-3 shadow">
                            <div className="card-body">
                            <h5 className="card-title pb-3">Special title treatment</h5>
                            <p className="card-text">
                                With supporting text below as a natural lead-in to additional
                                content.
                            </p>
                            </div>
                        </div>

                        <div className="card text-center col-10 col-md-3 shadow">
                            <div className="card-body">
                            <h5 className="card-title pb-3">Special title treatment</h5>
                            <p className="card-text">
                                With supporting text below as a natural lead-in to additional
                                content.
                            </p>
                            </div>
                        </div>
                    </div>                    
                </div>
            </section>

            <section className="bg-secondary bg-opacity-75 w-100 py-5">
                <div className="container">
                    <div className="d-flex justify-content-center">
                        <iframe className="w-75 h-video-auto" src="https://www.youtube.com/embed/vwu7UrO5B5M" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
}
