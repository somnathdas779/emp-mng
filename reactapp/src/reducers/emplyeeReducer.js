import {EMPLYEE_LIST} from '../constants/emplyeeActionTypes';
const initialState = { 
    employees:[], 
    columnsData:
    [{
        dataField: 'id',
        text: 'Employee ID'
        }, {
        dataField: 'empname',
        text: 'Employee Name'
        }, {
        dataField: 'mng',
        text: 'Manager'
        }, {
        dataField: 'doj',
        text: 'Date of Joining'
        }, {
        dataField: 'dpt',
        text: 'Department'
        }, {
        dataField: 'phone',
        text: 'Phone Number'
        }, {    
        dataField: 'dob',
        text: 'Date of Birth'
        }, {    
        dataField: 'salary',
        text: 'Salary'
        }],
    loading : true};

export default (state= initialState, action) => {
    switch (action.type) {
        case EMPLYEE_LIST:
        return { ...state, employees: action.employeeList, loading: false };
        return;
        default:
          return state;
      }
};