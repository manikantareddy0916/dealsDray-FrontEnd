import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Table, Pagination, Dropdown } from "react-bootstrap";
import validator from "validator";
import { useSelector, useDispatch } from "react-redux";
import { startAllEmployees, startCreateEmployee, startDeleteEmployee, startUpdateEmployee } from "../actions/employee-action";

export default function EmployeeList() {
  const dispatch = useDispatch();

  const allEmp = useSelector((state) => state.allEmployees.allEmployees);

  // Sort employees by name
  const sortByName = () => {
    return [...allEmp].sort((a, b) => a.name.localeCompare(b.name));
  };
  const sortedEmp = sortByName();
  // Function to sort employees by ID
  const sortById = () => {
    return [...allEmp].sort((a, b) => a.id - b.id);
  };

  // Get sorted employees by ID
  const sortedEmpId = sortById();
  //email 
  const sortByEmail = () => {
    return [...allEmp].sort((a, b) => a.email.localeCompare(b.email));
  };
  
  // Get sorted employees by Email
  const sortedEmpEmail = sortByEmail();
  //Date 
  const sortByDate = () => {
    return [...allEmp].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };
  
  // Get sorted employees by Date
  const sortedEmpDate = sortByDate();
  
  

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    designation: "",
    gender: "",
    course: "",
    imgUpload: null,
  });

  
  const [serverErrors, setServerErrors] = useState([]);
  const [clientErrors, setClientErrors] = useState({});
  const [toggle, setToggle] = useState(false);
  const [editEmpId, setEditEmpId] = useState(null);

  const [search , setSearch] = useState('')
  const [type, setType] = useState('list')
  const [filter, setFilter] = useState('Filter By')

  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 5; // Items per page

  const errors = {};

console.log('vtypev',type)
  // Function for client-side validation
  const runValidation = () => {
    // Name Validation
    if (formData.name.trim().length === 0) {
      errors.name = "Name is required";
    }

    // Email Validation
    if (formData.email.trim().length === 0) {
      errors.email = "Email is required";
    } else if (!validator.isEmail(formData.email)) {
      errors.email = "Valid email is required";
    }

    // Designation Validation
    if (formData.designation.trim().length === 0) {
      errors.designation = "Designation is required";
    }

    // Mobile Number Validation
    if (formData.mobileNo.trim().length === 0) {
      errors.mobileNo = "*Mobile number is required";
    } else if (!/^[0-9]+$/.test(formData.mobileNo)) {
      errors.mobileNo = "*Mobile number must contain only numbers";
    } else if (formData.mobileNo.length !== 10) {
      errors.mobileNo = "*Mobile number must be 10 digits long";
    }

    // Gender Validation
    if (formData.gender.length === 0) {
      errors.gender = "* Gender is required";
    }

    // Course Validation
    if (formData.course.length === 0) {
      errors.course = "* Select course";
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Toggle between form and table view
  const handleToggle = () => {
    
    setToggle(!toggle);
    setEditEmpId(null); // Reset edit ID when closing form
    setClientErrors({}); // Clear client errors when toggling
    setFormData({
      name: "",
      email: "",
      mobileNo: "",
      designation: "",
      gender: "",
      course: "",
      imgUpload: null,
    }); // Reset form data
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    runValidation();

    if (Object.keys(errors).length === 0) {
      setClientErrors(errors);
      console.log("Submitting data:", formData);

      if (editEmpId) {
        // If in edit mode, dispatch update action
        dispatch(startUpdateEmployee(editEmpId, formData, setServerErrors, handleToggle));
      } else {
        // Otherwise, dispatch create action
        dispatch(startCreateEmployee({ formData, setServerErrors, handleToggle }));
      }

      // Reset the form after submission
      handleToggle();
    } else {
      setClientErrors(errors);
    }
  };

  // Handle edit action
  const handleEdit = (emp) => {
    setFormData(emp);
    setEditEmpId(emp._id);
    setToggle(true); // Open the form for editing
  };

  // Calculate pagination
  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = allEmp.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(allEmp.length / itemsPerPage);

  // Create pagination items
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  // const datt=(e)=>{
  //   console.log('1',e)
  //   setType('search')
  // }
  const dropDownChange = (value) => {
    setFilter(value);
    console.log('v',value)
    setType(value)
    
  };
  const searchClick=(e)=>{
    setType('search')
  }
  
  console.log('j',type, sortedEmpId)


  useEffect(() => {
    dispatch(startAllEmployees());
  }, [editEmpId, toggle]);

  const filteredEmployees = allEmp.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div>
      
      <Container className="mt-3">
        <Row className="mb-4">
        <h2>Total count - {allEmp.length}</h2>
          <Col className="d-flex justify-content-end">
            <Button className="mb-3" onClick={handleToggle}>
              {toggle ? "Close" : "Create Employee"}
            </Button>
          </Col>
        </Row>
        
      {!toggle &&

      <>
       <div className="mb-3">
      <Dropdown className="me-2">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {filter}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => dropDownChange('Name')}>Name</Dropdown.Item>
          <Dropdown.Item onClick={() => dropDownChange('Id')}>ID</Dropdown.Item>
          <Dropdown.Item onClick={() => dropDownChange('Email')}>Email</Dropdown.Item>
          <Dropdown.Item onClick={() => dropDownChange('Date')}>Date</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
      <div className="mb-3">
          {type == 'search' ?
          <>
          <Button onClick={()=>{setType('list')}}>close search</Button> 
          <input  placeholder="search name"  
          onChange={(e)=>{setSearch(e.target.value)}} value={search}/>
          </>
          : <Button onClick={searchClick}>Search</Button>
        }
        </div>
      </>
      
    
    }
   
        
        {toggle && (
          <Container>

            <h2 className="text-start mb-4">{editEmpId ? "Edit Employee" : "Create Employee"}</h2>

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
              {/* Name Input */}
              <Row className="mb-3">
                <Form.Group as={Row} controlId="formName">
                  <Form.Label column sm={2}>
                    Name
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      name="name"
                      onChange={handleInputChange}
                      value={formData.name}
                      isInvalid={!!clientErrors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {clientErrors.name}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Row>

              {/* Email Input */}
              <Row className="mb-3">
                <Form.Group as={Row} controlId="formEmail">
                  <Form.Label column sm={2}>
                    Email
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      onChange={handleInputChange}
                      value={formData.email}
                      isInvalid={!!clientErrors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {clientErrors.email}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Row>

              {/* Mobile Number Input */}
              <Row className="mb-3">
                <Form.Group as={Row} controlId="formMobile">
                  <Form.Label column sm={2}>
                    Mobile No
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      placeholder="Enter mobile number"
                      name="mobileNo"
                      onChange={handleInputChange}
                      value={formData.mobileNo}
                      isInvalid={!!clientErrors.mobileNo}
                    />
                    <Form.Control.Feedback type="invalid">
                      {clientErrors.mobileNo}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Row>

              {/* Designation Input */}
              <Row className="mb-3">
                <Form.Group as={Row} controlId="formDesignation">
                  <Form.Label column sm={2}>
                    Designation
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      as="select"
                      name="designation"
                      onChange={handleInputChange}
                      value={formData.designation}
                      isInvalid={!!clientErrors.designation}
                    >
                      <option value="">Select Designation</option>
                      <option>HR</option>
                      <option>Manager</option>
                      <option>Sales</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {clientErrors.designation}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Row>

              {/* Gender Selection */}
              <Row className="mb-3">
                <Form.Group as={Row} controlId="formGender">
                  <Form.Label column sm={2}>
                    Gender
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Check
                      type="radio"
                      label="Male"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleInputChange}
                      id="genderMale"
                      isInvalid={!!clientErrors.gender}
                    />
                    <Form.Check
                      type="radio"
                      label="Female"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleInputChange}
                      id="genderFemale"
                      isInvalid={!!clientErrors.gender}
                    />
                    {clientErrors.gender && (
                      <div className="text-danger">{clientErrors.gender}</div>
                    )}
                  </Col>
                </Form.Group>
              </Row>

              {/* Course Input */}
              <Row className="mb-3">
                <Form.Group as={Row} controlId="formCourse">
                  <Form.Label column sm={2}>
                    Course
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      as="select"
                      name="course"
                      onChange={handleInputChange}
                      value={formData.course}
                      isInvalid={!!clientErrors.course}
                    >
                      <option value="">Select Course</option>
                      <option>MCA</option>
                      <option>BCA</option>
                      <option>BSC</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {clientErrors.course}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Row>

              {/* Image Upload */}
              {/* <Row className="mb-4">
                <Form.Group as={Row} controlId="formImgUpload">
                  <Form.Label column sm={2}>Image Upload</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="file"
                      name="imgUpload"
                      onChange={(e) => setFormData({ ...formData, imgUpload: e.target.files[0] })}
                      accept="image/*"
                    />
                  </Col>
                </Form.Group>
              </Row> */}

              {/* Submit Button */}
              <Form.Group as={Row} className="mb-4">
                <Col sm={{ span: 9, offset: 3 }}>
                  <Button
                    variant="success"
                    type="submit"
                    size="lg"
                    className="w-100"
                  >
                    {editEmpId ? "Update Employee" : "Add Employee"}
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Container> ) }

         


        {(type == 'list' && !toggle)  &&

         (
          <>   
          {/* <h2>search</h2><input placeholder="search name" onClick={datt}/> */}
          
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Unique ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile No</th>
                  <th>Designation</th>
                  <th>Gender</th>
                  <th>Course</th>
                  <th>Created Date</th>
                  <th colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((emp, index) => (
                  <tr key={emp._id}>
                    <td>{emp._id + index}</td>
                    <td>{emp.imgUpload ? <img src={URL.createObjectURL(emp.imgUpload)} alt="Employee" width="50" /> : "N/A"}</td>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.mobileNo}</td>
                    <td>{emp.designation}</td>
                    <td>{emp.gender}</td>
                    <td>{emp.course}</td>
                    <td>{new Date(emp.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Button onClick={() => handleEdit(emp)}>Edit</Button>
                    </td>
                    <td>
                      <Button variant="danger" onClick={() => dispatch(startDeleteEmployee(emp._id))}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table> 

            <Pagination className="mt-3 justify-content-center">
              <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
              <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
              {paginationItems}
              <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
              <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>
          </>
        ) 
        }

        {/* {(type == 'search'  && (!toggle)) ? 
         <>
           
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Unique ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile No</th>
                  <th>Designation</th>
                  <th>Gender</th>
                  <th>Course</th>
                  <th>Created Date</th>
                  <th colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                 filteredEmployees.map((emp, index) => (
                  <tr key={emp._id}>
                    <td>{emp._id + index}</td>
                    <td>{emp.imgUpload ? <img src={URL.createObjectURL(emp.imgUpload)} alt="Employee" width="50" /> : "N/A"}</td>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.mobileNo}</td>
                    <td>{emp.designation}</td>
                    <td>{emp.gender}</td>
                    <td>{emp.course}</td>
                    <td>{new Date(emp.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Button onClick={() => handleEdit(emp)}>Edit</Button>
                    </td>
                    <td>
                      <Button variant="danger" onClick={() => dispatch(startDeleteEmployee(emp._id))}>Delete</Button>
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </Table>
         </>
         : ''
        } */}

        { (type === 'Name' || 'Id' || 'Email' || 'Date' || 'search')&& (type !== 'list') ?
        <>
        <h2 className="mb-3">Employee List - {type}</h2>
      <ul>
      <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Unique ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile No</th>
                  <th>Designation</th>
                  <th>Gender</th>
                  <th>Course</th>
                  <th>Created Date</th>
                  <th colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                (type === 'Id' ? sortedEmpId :
                   (type =='Name' ? sortedEmp : 
                      (type == 'Email' ? sortedEmpEmail : 
                        (type == 'Date' ? sortedEmpDate :
                           (type == 'search' ? filteredEmployees :
                             []))))
                ).map((emp, index) => (
                  <tr key={emp._id}>
                    <td>{emp._id + index}</td>
                    <td>{emp.imgUpload ? <img src={URL.createObjectURL(emp.imgUpload)} alt="Employee" width="50" /> : "N/A"}</td>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.mobileNo}</td>
                    <td>{emp.designation}</td>
                    <td>{emp.gender}</td>
                    <td>{emp.course}</td>
                    <td>{new Date(emp.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Button onClick={() => handleEdit(emp)}>Edit</Button>
                    </td>
                    <td>
                      <Button variant="danger" onClick={() => dispatch(startDeleteEmployee(emp._id))}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table> 
      </ul>
        </>
        : ""}

      </Container>
    </div>
  );
}
