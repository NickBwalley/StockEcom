import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-light dark:bg-gray-800 text-gray-900 dark:text-gray-200 py-4 transition-all duration-300">
      <Container>
        <Row>
          <Col className="text-center">
            <p className="mb-0">Copyright &copy; StockEcom</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
