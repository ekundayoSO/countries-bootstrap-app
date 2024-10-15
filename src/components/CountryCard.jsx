import { useState } from "react";
import { Button, Card, Col, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeFavourite } from "../store/favouritesSlice";
import { Link } from "react-router-dom";
import "../custom.css";

const CountryCard = ({ country }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Col
      className="mt-5"
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="h-100 country-card">
        <Link to={`/countries/${country.name.common}`} state={{ country }}>
          <Card.Img
            variant="top"
            src={country.flags.svg}
            alt={country.name.common}
            className="rounded h-50"
            style={{
              objectFit: "cover",
              minHeight: "200px",
              maxHeight: "200px",
            }}
          />
        </Link>
        <Card.Body className="d-flex flex-column">
          <Card.Title>{country.name.common}</Card.Title>
          <Card.Subtitle className="mb-1 text-muted">
            {country.name.official}
          </Card.Subtitle>
          <ListGroup variant="flush" className="flex-grow-1">
            <ListGroup.Item>
              Population: {country.population.toLocaleString()}
            </ListGroup.Item>
            <ListGroup.Item>
              Currencies:{" "}
              {Object.values(country.currencies || {})
                .map((currency) => currency.name)
                .join(", ") || "No currency"}
            </ListGroup.Item>
            <ListGroup.Item>
              Languages:{" "}
              {Object.values(country.languages || {})
                .map((language) => language)
                .join(", ") || "No languages"}
            </ListGroup.Item>
          </ListGroup>

          {isHovered && (
            <Button
              variant="warning"
              onClick={() => dispatch(removeFavourite(country.name.common))}
            >
              Remove Favourite
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CountryCard;
