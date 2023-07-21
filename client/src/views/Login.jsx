import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import Section from "../components/ui/Section";
import Button from "react-bootstrap/Button";

const Login = () => {
  return (
    <Section>
      <Container>
        <div>
          <h3>Customer Login</h3>
          <div className="border-top my-3" />
          <div className="login-form mt-3 mt-lg-5">
            <Form>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control required type="text" className="w-100 shadow-none py-lg-2" />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" className="w-100 shadow-none py-lg-2" />
              </Form.Group>
              <div className="mt-3">
                <Button type="submit" variant="danger" className="w-100 py-2">
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Login;
