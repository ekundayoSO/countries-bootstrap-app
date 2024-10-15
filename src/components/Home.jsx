import { useState } from "react";
import { Button, Card, Carousel, Container } from "react-bootstrap";
import "../custom.css";
import { useNavigate } from "react-router-dom";
import "../custom.css"

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();

  const countries = [
    { name: "Finland", flag: "https://flagcdn.com/fi.svg" },
    { name: "Sweden", flag: "https://flagcdn.com/se.svg" },
    { name: "Japan", flag: "https://flagcdn.com/jp.svg" },
    { name: "Brazil", flag: "https://flagcdn.com/br.svg" },
    { name: "Malaysia", flag: "https://flagcdn.com/ma.svg" },
  ];

  return (
    <div className="min-h-screen">
      <section className="text-center custom-bg">
        <h2 className="text-5xl font-bold mb-4 pt-4 pb-4">
          Discover the World
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Explore and learn more about the countries of your choice.
        </p>
        <Button
          onClick={() => navigate("/countries")}
          className="mb-4 bg-black"
          size="lg"
        >
          Start Exploring
        </Button>
      </section>

      <section className="py-5 bg-white background">
        <Container>
          <h3 className="text-center mt-4 mb-3">Featured Countries</h3>
          <Carousel
            activeIndex={activeSlide}
            onSelect={(index) => setActiveSlide(index)}
            className="mx-auto"
          >
            {countries.map((country, index) => (
              <Carousel.Item key={index}>
                <Card className="bg-black text-white">
                  <Card.Img
                    src={country.flag}
                    alt={country.name}
                    style={{
                      width: "100%",
                      height: "700px",
                      objectFit: "cover",
                    }}
                  />
                  <Card.ImgOverlay className="d-flex justify-content-center align-items-center">
                    <Card.Title className="display-2">
                      {country.name}
                    </Card.Title>
                  </Card.ImgOverlay>
                </Card>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </section>
    </div>
  );
};

export default Home;
