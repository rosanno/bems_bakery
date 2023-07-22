import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import Section from "../components/ui/Section";
import Button from "react-bootstrap/Button";
import usePublicRequest from "../hooks/usePublicRequest";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../features/authSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, error, fetchData } = usePublicRequest();
  const [validated, setValidated] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = useSelector((state) => state.auth.token);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const data = {
        email,
        password,
      };
      fetchData("POST", "auth/login", data);
    }

    setValidated(true);
  };

  useEffect(() => {
    if (data && data.accessToken) {
      dispatch(setToken({ token: data.accessToken }));
      console.log("token");
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <Section className="px-xl-5 mt-3 mt-md-5">
      <Container>
        <div>
          <h3 className="login-heading">Customer Login</h3>
          <div className="divider my-3" />
          <div className="login-form mt-3 mt-lg-5">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  className="w-100 shadow-none py-lg-2"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide an email.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  className="w-100 shadow-none py-lg-2"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">Password is required.</Form.Control.Feedback>
              </Form.Group>
              <div className="mt-3">
                <Button type="submit" variant="danger" className="w-100 py-2">
                  Login
                </Button>
              </div>
            </Form>
            <div className="mt-3">
              <span className="redirect-label">
                Don&apos;t have account{" "}
                <Link to="/sign-up" className="text-black">
                  Sign up
                </Link>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Login;
