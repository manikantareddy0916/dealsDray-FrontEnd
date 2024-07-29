import React from 'react';
import { Navbar, Nav, Col } from 'react-bootstrap'; // Import necessary components from React Bootstrap
import { Link,useNavigate } from 'react-router-dom'; // Import Link for navigation

export default function Navbar1({ isAuthenticated, setIsAuthenticated }) {

    const navigate = useNavigate();

  // Define a function to handle click events
  const handleClick = (path) => {
    if (path === 'logout') {
      localStorage.removeItem('token'); // Remove token from local storage on logout
      setIsAuthenticated(false); // Update authentication state
      navigate('/')
      //window.location.href = '/'; // Redirect to login page after logout
    }
  };

  return (
    <Navbar bg="dark" variant="dark" >
      <Navbar.Brand style={{ fontSize: '24px' }}>
        {/* Brand Logo or Name */}
        Logo
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          {isAuthenticated ? ( // Check authentication state for conditional rendering
            <>
              <Col>
                <Nav.Link
                  as={Link}
                  to="/Home"
                  style={{ color: 'white', fontSize: '22px' }}
                >
                  Home
                </Nav.Link>
              </Col>
              <Col>
                <Nav.Link  
                as={Link}
                to="/EmployeeList"                 
                style={{ color: 'white', fontSize: '22px', cursor: 'pointer' }}
                >
                    EmployeeList
                </Nav.Link>
              </Col>
              <Col>
                <Nav.Link                   
                style={{ color: 'white', fontSize: '22px', cursor: 'pointer' }}
                >
                    {}
                </Nav.Link>
              </Col>
              <Col>
                <Nav.Link
                  style={{ color: 'white', fontSize: '22px', cursor: 'pointer' }}
                  onClick={() => handleClick('logout')}
                >
                  Logout
                </Nav.Link>
              </Col>
            </>
          ) : (
            <Col>
              <Nav.Link
                as={Link}
                to="/"
                style={{ color: 'white', fontSize: '22px' }}
              >
                Login
              </Nav.Link>
            </Col>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
