import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import {
  clearFavourites,
  getFavouritesFromSource,
} from "../store/favouritesSlice";
import CountryCard from "./CountryCard";
import "../custom.css"

// Favourites component
const Favourites = () => {
  const dispatch = useDispatch();
  let countriesList = useSelector((state) => state.countries.countries);
  const [search, setSearch] = useState("");
  const countriesLoading = useSelector((state) => state.countries.isLoading);
  const favouritesList = useSelector((state) => state.favourites.favourites);
  const favouritesLoading = useSelector((state) => state.favourites.isLoading);

  if (Array.isArray(favouritesList) && favouritesList.length > 0) {
    countriesList = countriesList.filter((country) =>
      favouritesList.includes(country.name.common)
    );
  } else {
    countriesList = [];
  }

  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromSource());
  }, [dispatch]);

  if (countriesLoading || favouritesLoading) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }

  return (
    <div className="background">
      <Container fluid>
        <Row>
          <Col className="mt-3 d-flex justify-content-center">
            <Form>
              <Form.Control
                style={{ width: "18rem" }}
                type="search"
                className="me-2"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Col>
        </Row>
        <Row xs={1} md={3} lg={4}>
          {countriesList
            .filter((country) => {
              return country.name.official
                .toLowerCase()
                .includes(search.toLowerCase());
            })
            .map((country) => (
              <CountryCard key={country.name.common} country={country}/>
            ))}
        </Row>
        {countriesList.length > 0 && (
          <Row
            xs={2}
            md={3}
            lg={4}
            className="d-flex justify-content-center mt-4"
          >
            <Button
              className="mt-1 mb-4"
              onClick={() => dispatch(clearFavourites())}
            >
              Clear Favourites
            </Button>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Favourites;
