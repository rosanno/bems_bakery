import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";

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
    {
      question: "Can I change my shipping address after placing an order?",
      answer:
        "Yes, you can change your shipping address if your order hasn't been shipped yet. Please contact our customer support team as soon as possible to request the change.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping to most countries. Shipping costs and delivery times may vary depending on the destination.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept Visa, MasterCard, American Express, and PayPal as payment methods.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "To reset your password, go to the login page and click on the 'Forgot password' link. Follow the instructions to reset your password.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we take the security of your personal information seriously. We use industry-standard encryption to protect your data.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach our customer support team through the 'Contact Us' page on our website or by emailing support@example.com.",
    },
    {
      question: "Do you offer gift wrapping services?",
      answer:
        "Yes, we offer gift wrapping services for an additional fee. You can select this option during checkout.",
    },
    {
      question: "What is your response time for customer inquiries?",
      answer:
        "We strive to respond to customer inquiries within 24 hours on business days.",
    },
    {
      question: "Can I cancel my order after it has been placed?",
      answer:
        "If your order hasn't been shipped yet, you can cancel it. Please contact our customer support team to request the cancellation.",
    },
  ];

  const [activeQuestions, setActiveQuestions] = useState([0, 1]);

  const handleClick = (index) => {
    const activeQuestionsCopy = [...activeQuestions];

    if (activeQuestions.includes(index)) {
      activeQuestionsCopy.splice(activeQuestionsCopy.indexOf(index), 1);
    } else {
      if (activeQuestions.length >= 2) {
        activeQuestionsCopy.shift();
      }
      activeQuestionsCopy.push(index);
    }
    setActiveQuestions(activeQuestionsCopy);
  };

  return (
    <>
      <Container className="py-4 mb-5 text-center bg-color-pink " fluid>
        <Row>
          <h1>Frequently Asked Questions</h1>
        </Row>
      </Container>
      <Container>
        <Row className="pb-3">
          <h2>Cake Delights FAQ</h2>
        </Row>
        <Row>
          <Col>
            <Accordion>
              {questions.map((question, index) => (
                <Accordion.Item
                  key={index}
                  eventKey={index}
                  active={activeQuestions.includes(index)}
                >
                  <Accordion.Header onClick={() => handleClick(index)}>
                    {question.question}
                  </Accordion.Header>
                  <Accordion.Body>{question.answer}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FAQ;
