import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class SearchPatients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patients : JSON.parse(sessionStorage.patients)
        }
    }

    render() {
        return (
            <div>
                <h2>Search Patient</h2>
                <BootstrapTable data={this.state.patients} bordered={ false } search>
                    <TableHeaderColumn dataField="id" isKey={true} hidden={true}>Id</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" dataAlign="left">Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="email" dataAlign="left">Email</TableHeaderColumn>
                    <TableHeaderColumn dataField="birthday">DOB (MM/DD/YYYY)</TableHeaderColumn>
                    <TableHeaderColumn dataField="phone" dataAlign="left">Phone Number</TableHeaderColumn>
                    <TableHeaderColumn dataField="medicine" dataAlign="left">Medicine</TableHeaderColumn>
                </BootstrapTable>
            </div>

        );
    }
}

export default SearchPatients;