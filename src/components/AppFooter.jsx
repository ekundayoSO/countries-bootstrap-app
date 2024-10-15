import React from "react";
import { Container } from "react-bootstrap";

const AppFooter = () => {
  const year = new Date().getFullYear();

  return (
    <div className="py-3 bg-black text-white sticky-bottom">
      <Container className="text-center">
        <small>Copyright &copy; countries app {year}</small>
      </Container>
    </div>
  );
};

export default AppFooter;
