import Image from "next/image";

const bentoCards = [
  {
    title: "Hydrocarbon Facilities",
    description:
      "The software is suitable for all types of facilities, such as hydrocarbon facilities",
    image: "/bento1.png",
    featured: true,
  },
  {
    title: "Large Industries",
    description:
      "Large industries such as data centers, logistics facilities, pharmaceutical plants, and manufacturing facilities",
    image: "/bento2.png",
  },
  {
    title: "Civil Projects",
    description:
      "Civil projects such as hotels, hospitals, and residential buildings",
    image: "/bento3.png",
  },
];

export default function BentoGrid() {
  return (
    <section className="container-fluid py-4 mb-4">
      <h2 className="fw-bold fs-4 text-center mb-4">Industries & Applications</h2>

      <div className="bento-grid">
        {bentoCards.map((card) => (
          <article
            key={card.title}
            className={`card shadow border-0 h-100 bento-card${card.featured ? " bento-card--featured" : ""}`}
          >
            <div className="bento-card__media bg-light">
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
                className="bento-card__image"
              />
            </div>
            <div className="bento-card__body card-body">
              <h3 className="card-title fw-bold">{card.title}</h3>
              <p className="card-text text-muted mb-0">{card.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
