import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { addEmplyee } from '../actions/employee';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';

import 'moment/locale/it';

class AddEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        modal: false,
        formValiDate :false,
        empname: "",
        mng: "",
        doj: new Date(1990, 0, 1),
        dpt: "",
        phone: "",
        dob: new Date(),
        salary: "",
        touched: {
            empname: false,
            mng: false,
            doj :false,
            dpt :false,
            phone :false,
            salary : false
        }
    };

    this.toggle = this.toggle.bind(this);
    this.reset = this.reset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  reset(){
    this.setState({
      empname: "",
      mng: "",
      doj: new Date(),
      dpt: "",
      phone: "",
      dob: new Date(1990, 0, 1),
      salary: "",
      touched: {
        empname: false,
        mng: false,
        doj :false,
        dpt :false,
        phone :false,
        salary : false
    }
  });
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
    this.reset();
    this.props.addNewEmplyee(this.state);
    setTimeout(() => {
        this.setState({
            modal: !this.state.modal
        });
    }, 2000);
  }
  
  canBeSubmitted() {
    const errors = this.validate(this.state.empname,this.state.mng,this.state.dpt,this.state.phone,this.state.salary);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  componentWillMount(){
    this.setState({
        empname: "",
        mng: "",
        doj: "",
        dpt: "",
        phone: "",
        dob: "",
        salary: ""
     });
  }
  
  handleBlur = (field) => (evt) => {

    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }
   validate = (empname, mng , dpt, phone, salary) => {
    // true means invalid, so our conditions got reversed
    return {
      empname: empname.length === 0,
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
        <Button color="btn btn-success" onClick={this.toggle}>New</Button>
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
            <input type="submit" value="Submit" color="primary" className="btn btn-primary" disabled={isDisabled}/>
            <input type="button" value="Reset" color="default" className="btn btn-primary" onClick={this.reset} />
            <Button color="danger" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
          </form>
        </Modal>
        </div>
      
    );
  }
}



const  mapDispatchToProps = dispatch => {
    return {
        addNewEmplyee: emplyee => {
            dispatch(addEmplyee(emplyee));
        }
    }
}



export default connect(null, mapDispatchToProps)(AddEmployee);