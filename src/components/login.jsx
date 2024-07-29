import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import validator from 'validator';
import axios from "../config/axios"
import { useNavigate } from 'react-router-dom';

export default function Login({ setIsAuthenticated }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [serverErrors, setServerErrors] = useState([]);
  const [clientErrors, setClientErrors] = useState({});
  const errors = {};

  const navigate = useNavigate();

  const runValidation = () => {
    // Username Validation
    if (userName.trim().length === 0) {
      errors.userName = 'Username is required';
    }

    // Password Validation
    if (password.trim().length === 0) {
      errors.password = 'Password is required';
    } else if (!validator.isStrongPassword(password)) {
      errors.password = 'A strong password is required';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    runValidation();
    if (Object.keys(errors).length === 0) {
      const formData = {
        userName,
        password,
      };
      setClientErrors(errors);
      try {
        const response = await axios.post('/api/login', formData);
        //console.log('Response:', response);
        localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true); // Update authentication state on successful login
        navigate('/Home', { state: { message: 'You logged in successfully' } });
      } catch (e) {
        setServerErrors(e.response?.data?.errors || [{ msg: 'An unexpected error occurred' }]);
      }
    } else {
      setClientErrors(errors);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Login Page</h2>

          {/* Display Server Errors */}
          {serverErrors.length > 0 && (
            <div className="alert alert-danger" role="alert">
              <ul className="mb-0">
                {serverErrors.map((error, index) => (
                  <li key={index}>{error.msg}</li>
                ))}
              </ul>
            </div>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Username Row */}
            <Form.Group as={Row} controlId="formBasicEmail" className="mb-3">
              <Form.Label column sm={3} className="text-end">
                Username
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  required
                  isInvalid={!!clientErrors.userName}
                />
                <Form.Control.Feedback type="invalid">
                  {clientErrors.userName}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* Password Row */}
            <Form.Group as={Row} controlId="formBasicPassword" className="mb-4">
              <Form.Label column sm={3} className="text-end">
                Password
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  isInvalid={!!clientErrors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {clientErrors.password}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* Login Button */}
            <Form.Group as={Row} className="mb-4">
              <Col sm={{ span: 9, offset: 3 }}>
                <Button variant="success" type="submit" size="lg" className="w-100">
                  Login
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
