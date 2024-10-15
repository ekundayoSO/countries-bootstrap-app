import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Spinner,
  Pagination,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { initializeCountries } from "../services/countriesServices";
import { search } from "../store/countriesSlice";
import { addFavourite } from "../store/favouritesSlice";
import "../custom.css";

const Countries = () => {
  const dispatch = useDispatch();

  const countries = useSelector((state) => state.countries.countries);
  const isLoading = useSelector((state) => state.countries.isLoading);
  const searchInput = useSelector((state) => state.countries.search);

  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredCard, setHoveredCard] = useState(null); 
  const itemsPerPage = 20;

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  if (isLoading) {
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

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchInput.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
  const indexOfLastCountry = currentPage * itemsPerPage;
  const indexOfFirstCountry = indexOfLastCountry - itemsPerPage;
  const currentCountries = filteredCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPaginationItems = () => {
    const items = [];

    items.push(
      <Pagination.Item
        key={1}
        active={currentPage === 1}
        onClick={() => handlePageChange(1)}
      >
        1
      </Pagination.Item>
    );

    if (currentPage > 3) {
      items.push(<Pagination.Ellipsis key="start-ellipsis" />);
    }

    for (
      let number = Math.max(2, currentPage - 1);
      number <= Math.min(totalPages - 1, currentPage + 1);
      number++
    ) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    if (currentPage < totalPages - 2) {
      items.push(<Pagination.Ellipsis key="end-ellipsis" />);
      items.push(
        <Pagination.Item
          key={totalPages}
          active={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  };

  return (
    <div className="background">
      <Container fluid>
        <Row className="d-flex align-items-center mt-5 mb-3">
          <Col
            xs={12}
            md={4}
            className="d-flex justify-content-center mb-3 mb-md-0"
          >
            <Form>
              <Form.Control
                style={{ width: "18rem" }}
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => dispatch(search(e.target.value))}
              />
            </Form>
          </Col>
          <Col xs={12} md={8} className="d-flex justify-content-end">
            <Pagination>
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />

              {renderPaginationItems()}

              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </Col>
        </Row>

        <Row xs={1} md={3} lg={4} className="g-3">
          {currentCountries.map((country) => (
            <Col
              className="mt-5"
              key={country.name.official}
              onMouseEnter={() => setHoveredCard(country.name.common)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card className="h-100 country-card">
                <Link
                  to={`/countries/${country.name.common}`}
                  state={{ country: country }}
                >
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
                  <ListGroup
                    variant="flush"
                    className="flex-grow-1 justify-content-center"
                  >
                    <ListGroup.Item>
                      <i className="bi bi-people me-2">
                        {country.population.toLocaleString()}
                      </i>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="me-2">
                        {Object.values(country.currencies || {})
                          .map((currency) => currency.name)
                          .join(", ") || "No currency"}
                      </i>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="me-2">
                        {Object.values(country.languages || {})
                          .map((language) => language)
                          .join(", ") || "No languages"}
                      </i>
                    </ListGroup.Item>
                  </ListGroup>
                  {hoveredCard === country.name.common && (
                    <Button
                      variant="primary"
                      onClick={() =>
                        dispatch(addFavourite(country.name.common))
                      }
                    >
                      Add Favourite
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="d-flex justify-content-end mt-3">
          <Col xs={12} md={8} className="d-flex justify-content-end">
            <Pagination>
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />

              {renderPaginationItems()}

              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Countries;
