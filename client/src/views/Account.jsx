import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Section from "../components/ui/Section";
import usePrivateRequest from "../hooks/usePrivateRequest";
import { setCurrentUser } from "../features/authSlice";

const Account = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { fetchData: submitData, loading } = usePrivateRequest(token);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setAddress(user?.addresses[0]?.address);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      address,
    };

    const res = await submitData("PATCH", "/user", data);

    if (res?.user) {
      dispatch(setCurrentUser({ user: res?.user }));
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    const data = {
      password,
    };

    if (password === confirmPassword) {
      const res = await submitData("PATCH", "/user", data);

      if (res?.user) {
        dispatch(setCurrentUser({ user: res?.user }));
      }
      console.log("Passwords match!");
      setPasswordsMatch(true);
    } else {
      console.log("Passwords do not match!");
      setPasswordsMatch(false);
    }
  };

  return (
    <Container className="mx-md-0 mx-lg-auto">
      <Section className="px-xl-5 mt-3 mt-md-5">
        <h2 className="account-heading">Account</h2>
        <p className="account-subheading text-muted">Manage your account profile</p>

        <div className="border-top mb-3" />

        <Card className="w-100 h-100 border-0 shadow-sm p-2 py-3 p-xl-2">
          <div className="px-2">
            <Card.Title className="card-heading">Profile Information</Card.Title>
            <Card.Subtitle className="card-subheading text-muted fw-normal">
              Update your account&apos;s profile
            </Card.Subtitle>
          </div>
          <Card.Body className="py-3 px-xl-2">
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className="form-label text-muted">Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  className="shadow-none update-form"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className="form-label text-muted">Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  className="shadow-none update-form"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className="form-label text-muted">Address</Form.Label>
                <Form.Control
                  type="text"
                  value={address}
                  className="shadow-none update-form"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="danger">
                Save
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Section>
      <Section className="px-xl-5 mt-3 mt-md-5">
        <Card className="w-100 h-100 border-0 shadow-sm p-2 py-3 p-xl-2">
          <div className="px-2">
            <Card.Title className="card-heading">Update Password</Card.Title>
            <Card.Subtitle className="card-subheading text-muted fw-normal">
              Update your account&apos;s profile
            </Card.Subtitle>
          </div>
          <Card.Body className="py-3 px-xl-2">
            <Form onSubmit={updatePassword}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className="form-label text-muted">New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  className="shadow-none update-form"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className="form-label text-muted">Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  className="shadow-none update-form"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="danger">
                Save
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Section>
    </Container>
  );
};

export default Account;
