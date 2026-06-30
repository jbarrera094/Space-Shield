import Carousel from "components/Carousel";
import Status from "components/Status";
import VideoTutorial from "./sections/videoTutorial";
import News from "./sections/news";
import BentoGrid from "./sections/bentoGrid";
import Contact from "./sections/contact";

export default Home;

function Home() {
  return (
    <>
      <Carousel />

      <Status />

      <main className="mx-md-5 mt-4">
        <VideoTutorial />

        <div className="mx-4">
          <hr />
        </div>

        <News />

        <BentoGrid />

        <div className="mx-4">
          <hr />
        </div>

        <Contact />
      </main>
    </>
  );
}
