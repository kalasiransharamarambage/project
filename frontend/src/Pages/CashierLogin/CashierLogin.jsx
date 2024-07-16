import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bgimg2 from '../../assets/Form/bgimg2.jpg';

const CashierLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('cashier');
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');

  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;

    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!isValidPassword(password)) {
      setPasswordError('Password must be at least 8 characters long.');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (event) => {
    console.log('Submit triggered');
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false || !validateForm()) {
      console.log('Form is invalid');
      event.stopPropagation();
    } else {
      console.log('Form is valid, proceeding to submit');
      try {
        const response = await axios.post('http://localhost:3000/cashier', 
          {
          email,
          password,
        });
navigate('/AdminHome');
        if (response.data.message === "Login successful") {
          setAlertMessage(response.data.message);
          setAlertVariant('success');
           // Navigate to AdminHome page on successful login
        } else {
          setAlertMessage(response.data.message);
          setAlertVariant('danger');
        }
      } catch (error) {
        console.error(error);
        setAlertMessage(error.response?.data?.message || 'Login error');
        setAlertVariant('danger');
      }
    }

    setValidated(true);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: `url(${bgimg2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Container>
        <Row className="justify-content-start">
          <Col xs={12} md={8} lg={6}>
            <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ padding: '30px', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px', marginLeft: 'auto', marginRight: 'auto', marginTop: '10vh' }}>
              <h1 className="text-center mb-4">Login</h1>
              {alertMessage && <Alert variant={alertVariant}>{alertMessage}</Alert>}
              <Form.Group className="mb-3" controlId="formBasicRole">
                <Form.Label>Role</Form.Label>
                <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)} required>
                  <option value="beautician">Beautician</option>
                  <option value="cashier">Cashier</option>
                  <option value="customer">Customer</option>
                  <option value="deliveryAgent">Delivery Agent</option>
                  <option value="admin">Admin</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  isInvalid={!!emailError}
                />
                <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    isInvalid={!!passwordError}
                  />
                  <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                  <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
                </div>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mb-3" style={{ backgroundColor: 'pink', borderColor: 'pink', color: 'black' }}>
                Log in
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CashierLogin;
