import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import moment from 'moment';
const m = moment;

class PatientList extends React.Component {
    constructor(props) {
        super(props);
        this.patientsMock = [{ id: "1", name: "Nicolas Abarca", email: "nicolas.abarca@fligoo.com", birthday: "02/08/1989", phone: "+543513888665", medicine: "No Assigned" }]
        this.patients = sessionStorage.patients !== undefined ? JSON.parse(sessionStorage.patients) : this.patientsMock;
        this.state = {
            data : this.patients
        }
        sessionStorage.patients = JSON.stringify(this.state.data);
        this.afterInsertRow = this.afterInsertRow.bind(this);
        this.clearData = this.clearData.bind(this);
    }

    clearData () {
        this.setState({data: this.patientsMock});
        sessionStorage.patients = JSON.stringify(this.patientsMock);
    }

    //
    //START HANDLE TABLE METHODS
    //

    afterInsertRow(row) {
        row.medicine = "No Assigned";
        this.state.data.push(row);
        sessionStorage.patients = JSON.stringify(this.state.data);
    }

    handleDeletedRow(rowKeys) {
        var patients = JSON.parse(sessionStorage.patients);
        for (var i =0; i < patients.length; i++)
            if (patients[i].id === rowKeys[0]) {
                patients.splice(i,1);
                break;
            }
        sessionStorage.patients = JSON.stringify(patients);
    }

    afterSaveCell(row, cellName, cellValue) {
        var patients = JSON.parse(sessionStorage.patients);
        for (var i =0; i < patients.length; i++)
            if (patients[i].id === row.id) {
                patients[i][cellName] = cellValue;
                break;
            }
        sessionStorage.patients = JSON.stringify(patients);
    }

    //
    //END HANDLE TABLE METHODS
    //

    //
    //START VALIDATION METHODS
    //

    emailValidator(value) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(value)) return 'A correct Email must be entered!';
        return true;
    }

    dateOfBirthValidator(value) {
        var d = m(value,'MM/DD/YYYY', true);
        if(!d.isValid()) return 'A valid Date of Birth must be entered!';
        return true;
    }

    nameValidator(value) {
        const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
        if (!value) {
            response.isValid = false;
            response.notification.type = 'error';
            response.notification.msg = 'Value must be inserted';
            response.notification.title = 'Requested Value';
        } else if (value.length < 4) {
            response.isValid = false;
            response.notification.type = 'error';
            response.notification.msg = 'Value must have 4+ characters';
            response.notification.title = 'Invalid Value';
        }else if (value.length > 50){
            response.isValid = false;
            response.notification.type = 'error';
            response.notification.msg = 'Value must have 50- characters';
            response.notification.title = 'Invalid Value';
        }
        return response;
    }

    //
    //END VALIDATION METHODS
    //

    render() {
        const selectRow = {
            mode: 'radio'
        };
        const options = {
            afterInsertRow: this.afterInsertRow,
            afterDeleteRow: this.handleDeletedRow
        };
        const cellEditProp = {
            mode: 'click',
            blurToSave: true,
            afterSaveCell: this.afterSaveCell

        };
        return (
            <div>
                <BootstrapTable data={this.state.data} insertRow={ true } options={ options } selectRow={ selectRow } cellEdit={ cellEditProp } bordered={ false } deleteRow={ true }>
                    <TableHeaderColumn dataField="id" isKey={true} hidden={true}>Id</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" dataAlign="left" dataSort={true} editable={ { validator: this.nameValidator } }>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="email" editable={ { validator: this.emailValidator } } dataAlign="left" dataSort={true}>Email</TableHeaderColumn>
                    <TableHeaderColumn dataField="birthday" editable={ { validator: this.dateOfBirthValidator } } dataSort={true}>DOB (MM/DD/YYYY)</TableHeaderColumn>
                    <TableHeaderColumn dataField="phone" dataAlign="left">Phone Number</TableHeaderColumn>
                </BootstrapTable>
                <button className="customBtn"  onClick={this.clearData}>Clear Data</button>
            </div>
        );
    }
}

export default PatientList;