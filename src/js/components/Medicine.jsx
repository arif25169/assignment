import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import axios from 'axios';

class Medicine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            medicine : [],
            patients : JSON.parse(sessionStorage.patients),
            showBtn: false,
            patientVisible: false
        }

        axios.get('https://fest-searcher.herokuapp.com/api/fest/s/panodil').then(response => {
            this.setState({ medicine: response.data });
            console.log(JSON.stringify(response));
        }).catch(function(error) { console.log(error); })

        this.assignMedicine = this.assignMedicine.bind(this);
        this.onRowSelectMedicine = this.onRowSelectMedicine.bind(this);
        this.onRowSelectPatient = this.onRowSelectPatient.bind(this);

    }

    assignMedicine () {
        this.setState({patientVisible: true, showBtn: false});
    }

    //
    //START HANDLE TABLE METHODS
    //
    onRowSelectMedicine(row, isSelected, e) {
        this.setState({showBtn: true});
        let rowStr = '';
        for (const prop in row) {
            rowStr += prop + ': "' + row[prop] + '"';
        }
        sessionStorage.medicine = row.productName;
    }

    onRowSelectPatient(row, isSelected, e) {
        var patients = JSON.parse(sessionStorage.patients);
        for (var i =0; i < patients.length; i++)
            if (patients[i].id === row.id) {
                patients[i].medicine = sessionStorage.medicine;
                break;
            }
        sessionStorage.patients = JSON.stringify(patients);
        this.setState({showBtn: false, patientVisible: false});
        alert('Medication ' + sessionStorage.medicine + ' has been assigned to ' + row.name + ' successful');
    }
    //
    //END HANDLE TABLE METHODS
    //
    render() {
        const options = {
            searchPosition: 'left'  // right or left
        };
        const selectRowPropMedicine = {
            mode: 'radio',
            clickToSelect: true,
            onSelect: this.onRowSelectMedicine,
        };
        const selectRowPropPatient = {
            mode: 'radio',
            clickToSelect: true,
            onSelect: this.onRowSelectPatient,
        };
        return (
            <div>
                <h2>Assign Medicine to Pacient</h2>
                <BootstrapTable data={ this.state.medicine } options={ options } bordered={ false } selectRow={ selectRowPropMedicine } search>
                    <TableHeaderColumn dataField='id' isKey={ true }>Product ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='typeName'>Type Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='atcCatName'>Category Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='productName'>Product Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='form'>Form</TableHeaderColumn>
                    <TableHeaderColumn dataField='strength'>Stength</TableHeaderColumn>
                    <TableHeaderColumn dataField='units'>Units</TableHeaderColumn>
                </BootstrapTable>
                {
                    this.state.showBtn ?
                        <div>
                            <span>You are about to assign this medication to a patient</span>
                            <button className="customBtn" onClick={this.assignMedicine}>Got it</button>
                        </div> : null
                }
                {
                    this.state.patientVisible
                        ?   <div className="container-patient-search">
                                <span>Please select a patient from the list below</span>
                                <BootstrapTable data={this.state.patients} bordered={ false } tableContainerClass={"table-patient-search"} selectRow={ selectRowPropPatient }>
                                    <TableHeaderColumn dataField="id" isKey={true} hidden={true}>Id</TableHeaderColumn>
                                    <TableHeaderColumn dataField="name" dataAlign="left">Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField="email" dataAlign="left">Email</TableHeaderColumn>
                                    <TableHeaderColumn dataField="birthday">DOB (MM/DD/YYYY)</TableHeaderColumn>
                                    <TableHeaderColumn dataField="phone" dataAlign="left">Phone Number</TableHeaderColumn>
                                </BootstrapTable>
                            </div>
                        : null
                }
            </div>

        );
    }
}

export default Medicine;