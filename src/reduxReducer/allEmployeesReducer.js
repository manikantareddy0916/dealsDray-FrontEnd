const initialState={
    employee :[] , allEmployees: []
}

export default function allEmployeesReducer(state = initialState, action){
        switch(action.type){
            case 'ADD_EMPLOYEE' :{
                console.log('redux',state.employee,'new',action.payload)
                return{...state, employee:[...state.employee, action.payload]}
            }
            case 'ALL_EMPLOYEES':{
                return {...state, allEmployees: action.payload}
            }
            case 'UPDATE_EMPLOYEE':
                return {
                  ...state,
                  allEmployees: state.allEmployees.map((emp) =>
                    emp._id === action.payload._id ? action.payload : emp
                  ),
                };
                case 'EMP_DELETE':
                return {
                    ...state,
                    allEmployees: state.allEmployees.filter((emp) => emp._id !== action.payload),
                };
               
            // case 'EDIT_ADDRESS' :{
            //     console.log('edited','address',action.payload)
            //     return { ...state, address: state.address.map((ele)=>{
            //         if(ele._id === action.payload._id){
            //             return {...ele, ...action.payload}
            //         }else{
            //             return {...ele}
            //         }
            //     })}
            // }
            
            // case 'ALL_USER_ADDRESS' : {
            //     return {...state, allAddress: action.payload}
            // }
           
            default:{
                return { ...state }
            }
        }
}