import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";

const FAQ = () => {
  const questions = [
    {
      question: "How much does shipping cost?",
      answer:
        "Shipping costs vary depending on the weight and destination of your order. You can calculate your shipping costs during checkout.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy on all items. You can return any item for a full refund within 30 days of purchase.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order has been shipped, you will receive an email with a tracking number. You can track your order by visiting our website and entering your tracking number.",
    },
  ];

  const [activeQuestion, setActiveQuestion] = useState(0);

  return (
    <>
      <Container>
        <Row className="my-4 py-4">
          <Col>
            <h1>What can we help you?</h1>
            <Col>
              <InputGroup className="mb-3">
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
                <InputGroup.Text id="inputGroup-sizing-default">
                  Search
                </InputGroup.Text>
              </InputGroup>
            </Col>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <ul>
              {questions.map((question, index) => (
                <li key={index}>
                  <a href="#" onClick={() => setActiveQuestion(index)}>
                    {question.question}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{questions[activeQuestion].question}</Card.Title>
                <Card.Text>{questions[activeQuestion].answer}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FAQ;
