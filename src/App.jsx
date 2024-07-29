import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Correctly import BrowserRouter, Routes, and Route
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Navbar1 from './components/navbar'; // Import the Navbar component
import Login from './components/login'; // Import Login component
import Home from './components/Home'; // Import Home component
import EmployeeList from './components/EmployeeList';
import { useSelector, useDispatch } from "react-redux"
import { startAllEmployees } from './actions/employee-action';


function App() {
  const dispatch = useDispatch() //redux

  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication

  // Function to check if the user is authenticated
  const checkAuth = () => {
    setIsAuthenticated(!!localStorage.getItem('token')); // Check if token is present
  };

  useEffect(() => {
    checkAuth(); // Check authentication status on initial render
    if(localStorage.getItem('token')){
     dispatch(startAllEmployees())
     
    }
  
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <div>
        <nav>
          <Navbar1 isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          {/* Pass authentication state and updater function to Navbar */}
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            {/* Pass setIsAuthenticated to Login for updating authentication status */}
            <Route path="/Home" element={<Home />} /> {/* Home route */}
            <Route path="/EmployeeList" element={<EmployeeList/>} /> {/* Home route */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
