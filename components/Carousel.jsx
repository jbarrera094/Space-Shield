import Image from 'next/image';

export default Carousel;

function Carousel() {
  return (
    <div id="carouselExampleAutoplaying" className="carousel slide size-screen-main" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/bg-c1.jpeg" className="d-block w-100" alt="..."/>
        </div>
        <div className="carousel-item">
          <img src="/bg-c2.jpeg" className="d-block w-100" alt="..."/>
        </div>
        <div className="carousel-item">
          <img src="/bg-c3.jpeg" className="d-block w-100" alt="..."/>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );

  
}
