"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_API_KEY;

const CountrySingle = (props) => {
  const location = useLocation();
  const country = props.country || location.state.country;
  const [weather, setWeather] = useState(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          country.capital
        }&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      )
      .catch((error) => {
        console.log(error);
      })
      .then((response) => {
        setWeather(response.data);
        setIsWeatherLoading(false);
      });
  }, [country.capital]);

  if (isWeatherLoading) {
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
        <Row className="mt-3">
          <Col className="d-flex flex-column align-items-center">
            <Image
              src={country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              fluid
              className="mb-4"
              style={{
                height: "600px",
                width: "80%",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            />
            <h2>{country.name.common}</h2>
            <h3>{country.capital}</h3>
            <div className="text-center">
              <p>
                Right now it is{" "}
                <strong>{Math.round(weather.main.temp)}°C </strong>
                in {country.capital} and {weather.weather[0].description}
              </p>
              <Image
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
            </div>
            <Button
              variant="primary"
              className="mt-3"
              onClick={() => navigate("/countries")}
            >
              Back to Countries
            </Button>
            <div
              style={{
                height: "600px",
                width: "80%",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <Map
                initialViewState={{
                  longitude: country.latlng[1],
                  latitude: country.latlng[0],
                  zoom: 4,
                }}
                style={{ width: "100%", height: "100%" }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
              >
                <Marker
                  longitude={country.latlng[1]}
                  latitude={country.latlng[0]}
                  anchor="bottom"
                ></Marker>
              </Map>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CountrySingle;
