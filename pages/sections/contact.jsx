import Link from "next/link";

export default function Contact() {
  return (
    <section className="d-flex justify-content-center py-5">
      <div className="container">
        <div className="d-flex flex-column text-center">
          <h4 className="fw-bold fs-4">Ready to increase your productivity?</h4>
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
  );
}
