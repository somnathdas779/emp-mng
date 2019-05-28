
import React from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { fetchAllEmplyees, deleteEmplyees} from '../actions/employee';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';

class EmplyeeList extends React.Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { 
            modal: false,
            loading: false,
            empname: "",
            mng: "",
            doj: "",
            dpt: "",
            phone: "",
            dob: "",
            salary: ""
        };
        this.props.loadAllEmplyees();
        this.rows =[];
        this.row= {};
        this.remove = this.remove.bind(this);
    }
    
    componentWillMount() {
      
    }
    remove() {
        console.log("deleteEmplyees=",this.rows);
        let obj = {data : this.rows};
        this.props.deleteEmplyees(obj); 
    }
    
   

    render() {
        const { SearchBar, ClearSearchButton } = Search;
        const { ExportCSVButton } = CSVExport;

        

        const employeesRowData = this.props.employees;
        const columns = [{
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
            text: 'Salary ($)'
            },
            {
                dataField: 'action',
                text: 'Action',
                events: {
                    onClick: (e, column, columnIndex, row, rowIndex) => {
                        this.handleClickEdit(row);
                        this.setState({ 
                            modal: true,
                            loading: false,
                            id:row.id,
                            empname: row.empname,
                            mng: row.mng,
                            doj: row.doj,
                            dpt: row.dpt,
                            phone: row.phone,
                            dob: row.dob,
                            salary: row.salary
                        });
                       
                    }
                },
                formatter: (cellContent, row) => (<div className="checkbox disabled">
                    <label>
                      <input type="button"  className="btn  btn-primary float-right padding-lr" value="Edit"/>
                    </label>
                  </div>
                )
              }
        ];
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: (row, isSelect, rowIndex, e) => {
              let rows =[];
              rows.push(row);
              this.rows = rows;
            },
            onSelectAll: (isSelect, rows, e) => {
             this.rows = rows;   
            }
        };
        return (
            <div className="emplyeeList">
               
                <ToolkitProvider
                    keyField="id"
                    data={ employeesRowData }
                    columns={ columns }
                    search
                    >
                    {
                        props => (
                        <div>
                            <h3>Emplyee Managament:</h3>
                            <SearchBar { ...props.searchProps } />
                            <ClearSearchButton { ...props.searchProps } />
                            <AddEmployee></AddEmployee>
                            <EditEmployee setClick={click => this.handleClickEdit = click}> </EditEmployee>
                            <button className="btn btn-danger float-right padding-lr" onClick={this.remove}>Remove</button>
                            <hr />
                            <BootstrapTable
                            { ...props.baseProps }
                            pagination={ paginationFactory() }
                            selectRow={ selectRow }
                            />
                            
                            <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
                        </div>
                        )
                    }
                </ToolkitProvider>
            </div>
        )
    }
    
}
const  mapStateToProps = state => {
    return {
        employees: state.employees,
        columnsData :state.columnsData
    }
}

const  mapDispatchToProps = dispatch => {
    return {
        loadAllEmplyees: () => {
            dispatch(fetchAllEmplyees());
        },
        deleteEmplyees: (rows) => {
            dispatch(deleteEmplyees(rows));
        }
    }
}





export default connect(mapStateToProps, mapDispatchToProps)(EmplyeeList);