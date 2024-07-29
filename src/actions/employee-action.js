import axios from '../config/axios'


export const startCreateEmployee =({formData,setServerErrors, setToogle})=>{
    return async( dispatch)=>{
        try{
          console.log('ACTION PRODUCT11',formData)
          const response = await axios.post('/api/createEmployee',formData,{
              headers:{
                  //'Content-Type' : 'multipart/form-data',
                  'Authorization' : localStorage.getItem('token')
              }
          })
        console.log('jjjjjjjj',response)
        dispatch(addEmployee(response.data))
        setToogle(false)

          
      } catch (e) {
          console.log('catch',e)
          setServerErrors(e.response?.data?.errors || [{ msg: 'An unexpected error occurred' }]);
        }
    }
    
}
const addEmployee=(employee)=>{
    return {
        type: 'ADD_EMPLOYEE',
        payload: employee
    }
}


//get all employees
export const startAllEmployees =()=>{
    return async (dispatch) =>{
        try{
            const resp = await axios.get('/api/EmployeeList',{
                headers:{
                    'Authorization': localStorage.getItem('token')
                }
            })
            //console.log('allAdress',resp.data)
            dispatch(getAllEmployees(resp.data))
        }
        catch(e){
            console.log('error',e)
        }
    }
}
const getAllEmployees =(allEmployees)=>{
    return {
        type : 'ALL_EMPLOYEES',
        payload : allEmployees
    }
}


// Update employee action
export const startUpdateEmployee = (id, formData, setServerErrors, setToggle) => {
  return async (dispatch) => {
    try {
        console.log('data',id,formData)
      const response = await axios.put(`/api/Employee/${id}`, formData,{
        headers :{
            'Authorization':localStorage.getItem('token')
        }
    });
      const updatedEmployee = response.data;

      // Dispatch an action to update the employee in Redux store
      dispatch(updateEmployee(updatedEmployee));

      // Close the form and clear errors
      setToggle(false);
      setServerErrors([]);
    } catch (error) {
      // Handle server errors
      if (error.response && error.response.data.errors) {
        setServerErrors(error.response.data.errors);
      } else {
        setServerErrors([{ msg: "Failed to update employee" }]);
      }
    }
  };
};

// Action creator for updating employee in Redux store
export const updateEmployee = (employee) => ({
  type: 'UPDATE_EMPLOYEE',
  payload: employee,
});

//del emp 

export const startDeleteEmployee = (id) => {
    return async (dispatch) => {
      try {
        const ok = window.confirm(`Do u want to Delete this ${id} Employe`)
          if(ok){
            const response = await axios.delete(`/api/EmployeeDel/${id}`,{
                headers :{
                    'Authorization':localStorage.getItem('token')
                }
            });
            dispatch(deleteEmp(response.data._id))
      
          }
        
      } catch (error) {
        // Handle server errors
       console.log('errro',error)
      }
    };
  };
const deleteEmp =(id)=>{
    return {
        type : 'EMP_DELETE',
        payload : id
    }
}