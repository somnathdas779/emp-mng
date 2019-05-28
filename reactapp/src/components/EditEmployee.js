import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { editEmplyee } from '../actions/employee';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';

import 'moment/locale/it';

class EditEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      id: "",
      empname: "",
      mng: "",
      doj: "",
      dpt: "",
      phone: "",
      dob: "",
      salary: "",
      touched: {
        empname: false,
        mng: false,
        doj :false,
        dpt :false,
        phone :false,
        salary : false
    }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleOnEdit = this.toggleOnEdit.bind(this);
    this.props.setClick(this.toggleOnEdit);

  }

  
  toggleOnEdit(row) {
    console.log("row",row);
    this.setState({
      modal: !this.state.modal,
      id: row.id,
      empname: row.empname,
      mng: row.mng,
      doj: row.doj,
      dpt: row.dpt,
      phone: row.phone,
      dob: row.dob,
      salary: row.salary,
      touched: {
        empname: false,
        mng: false,
        doj :false,
        dpt :false,
        phone :false,
        salary : false
      }
   });
   console.log(this.state);
  }

  
 

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    if (!this.canBeSubmitted()) {
        return;
    }
    if(this.state.doj === "" || this.state.dob === ""){
      this.setState({
        touched: { ...this.state.touched, doj: true , dob:true },
      });
      return;
    }  
    
    this.props.editEmplyee(this.state);
    setTimeout(() => {
        this.setState({
            modal: false
        });
    }, 2000);
    
  }

  canBeSubmitted() {
    const errors = this.validate(this.state.empname,this.state.mng,this.state.dpt,this.state.phone,this.state.salary);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }


  handleBlur = (field) => (evt) => {

    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }
   validate = (empname, mng , dpt, phone, salary) => {
    // true means invalid, so our conditions got reversed
    return {
      empname: empname.length === 0 || empname === undefined,
      mng: mng.length === 0,
      dpt: dpt.length === 0,
      phone: phone.length === 0,
      salary: salary.length === 0,
    };
  }

  render() {
    const errors = this.validate(this.state.empname, this.state.mng, this.state.dpt,this.state.phone,this.state.salary);
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = field => {
      console.log(field);
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      console.log(shouldShow);
      return hasError ? shouldShow : false;
    };


    return (

    
        <div className="float-right"> 
      
        <Modal isOpen={this.state.modal}>
        <form onSubmit={this.handleSubmit}>
          <ModalHeader>Add New Employee</ModalHeader>
          <ModalBody>
          <div className="row">
            <div className="form-group col-md-8">
            <label>Employee Name:</label>
           
            
            <input type="text"  onBlur={this.handleBlur('empname')}  value={this.state.empname} onChange={e => this.setState({empname: e.target.value})} className={shouldMarkError('empname') ? 'form-control error ' : 'form-control'} />
            </div>
            
            </div>
            <div className="row">
             <div className="form-group col-md-8">
            <label>Manager:</label>
                <input type="text"  onBlur={this.handleBlur('mng')}  value={this.state.mng} onChange={e => this.setState({mng: e.target.value})} className={shouldMarkError('empname') ? 'form-control error' : 'form-control'} />
               </div>
              </div>
            <div className="row">
             <div className="form-group col-md-8">
              <label>Date of Joining:</label>
              <div className={this.state.touched.doj ? 'error' : ''}>
              <DayPickerInput
                formatDate={formatDate}
                
                onDayChange={day => {this.setState({doj: day});}} 
                parseDate={parseDate}
                value={this.state.doj}
                className="form-control"
              />
              </div>
              
               </div>
            </div>
            <div className="row">
             <div className="form-group col-md-8">
              <label>Department:</label>
              <select id="sel1"  value={this.state.dpt} onChange={e => this.setState({dpt: e.target.value})} onBlur={this.handleBlur('dpt')} className={shouldMarkError('dpt') ? 'form-control error' : 'form-control'}>
                <option value =""></option>
                <option value ="APPS">APPS</option>
                <option value ="BPO">BPO</option>
                <option value ="HR">HR</option>
                <option value ="Finance">Finance</option>
             </select>
               
               </div>
            </div>
            <div className="row">
             <div className="form-group col-md-8">
              <label>Phone Number:</label>
                <input type="number" onBlur={this.handleBlur('phone')} className={shouldMarkError('phone') ? 'form-control error' : 'form-control'} value={this.state.phone} onChange={e => this.setState({phone: e.target.value})}  />
               </div>
            </div>
            <div className="row">
             <div className="form-group col-md-8">
              <label>Date of Birth:</label>
              <div className={this.state.touched.dob ? 'error' : ''} >
              <DayPickerInput
                formatDate={formatDate}
                onDayChange={day => {this.setState({dob: day});}} className="form-control"
                parseDate={parseDate}
                value={this.state.dob}
              /> 
              </div>
               </div>
            </div>
            <div className="row">
             <div className="form-group col-md-8">
              <label>salary:</label>
                <input type="number" onBlur={this.handleBlur('salary')} className={shouldMarkError('salary') ? 'form-control error' : 'form-control'}  value={this.state.salary} onChange={e => this.setState({salary: e.target.value})} />
               </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <input type="submit" value="Submit" color="primary" className="btn btn-primary"  disabled={isDisabled}/>
            <Button color="danger" onClick={this.toggleOnEdit}>Cancel</Button>
          </ModalFooter>
          </form>
        </Modal>
        </div>
      
    );
  }
}



const  mapDispatchToProps = dispatch => {
    return {
      editEmplyee: emplyee => {
            dispatch(editEmplyee(emplyee));
        }
    }
}



export default connect(null, mapDispatchToProps)(EditEmployee);