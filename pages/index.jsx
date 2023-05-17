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
                    <div className="row d-flex justify-content-between">
                        <div className="card text-center col-3 shadow">
                            <div className="card-body">
                                <h5 className="card-title pb-3">Special title treatment</h5>
                                <p className="card-text">
                                    With supporting text below as a natural lead-in to additional
                                    content.
                                </p>
                            </div>
                        </div>

                        <div className="card text-center col-3 shadow">
                            <div className="card-body">
                            <h5 className="card-title pb-3">Special title treatment</h5>
                            <p className="card-text">
                                With supporting text below as a natural lead-in to additional
                                content.
                            </p>
                            </div>
                        </div>

                        <div className="card text-center col-3 shadow">
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

            <section>
                
            </section>
        </div>
    );
}
