import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

function RegisterScreen({ location, history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      // Show success message without Toastify
      setSuccessMessage(`User ${name} registered successfully!`);
      setTimeout(() => {
        setSuccessMessage(""); // Clear message after 3 seconds
        history.push(redirect); // Redirect after success
      }, 3000);
    }
  }, [history, userInfo, redirect, name]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1 className="text-gray-900 dark:text-white">Register</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      {successMessage && <Message variant="success">{successMessage}</Message>}
      <Form
        onSubmit={submitHandler}
        className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg"
      >
        <Form.Group controlId="name">
          <Form.Label className="text-gray-900 dark:text-white">
            Name
          </Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label className="text-gray-900 dark:text-white">
            Email Address
          </Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label className="text-gray-900 dark:text-white">
            Password
          </Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
        </Form.Group>

        <Form.Group controlId="passwordConfirm">
          <Form.Label className="text-gray-900 dark:text-white">
            Confirm Password
          </Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-200"
        >
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col className="text-gray-900 dark:text-white">
          Have an Account?{" "}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            className="text-blue-500 dark:text-blue-400"
          >
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
