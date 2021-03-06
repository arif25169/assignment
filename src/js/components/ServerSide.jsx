import React from "react";
import { render } from "react-dom";
import _ from "lodash";
import { mockData, Logo, Tips } from "../utils/Script";
import ReactTable from "react-table";
import "react-table/react-table.css";

const rawData = mockData();

const requestData = (pageSize, page, sorted, filtered) => {
    return new Promise((resolve, reject) => {
        //  Using generated local data.
        let filteredData = rawData;

        // Filtering data
        if (filtered.length) {
            filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
                return filteredSoFar.filter(row => {
                    return (row[nextFilter.id] + "").includes(nextFilter.value);
                });
            }, filteredData);
        }

        //sorting data
        const sortedData = _.orderBy(
            filteredData,
            sorted.map(sort => {
                return row => {
                    if (row[sort.id] === null || row[sort.id] === undefined) {
                        return -Infinity;
                    }
                    return typeof row[sort.id] === "string"
                        ? row[sort.id].toLowerCase()
                        : row[sort.id];
                };
            }),
            sorted.map(d => (d.desc ? "desc" : "asc"))
        );

        //returning an object containing the rows of the current page, and optionally the total pages number.
        const res = {
            rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
            pages: Math.ceil(filteredData.length / pageSize)
        };

        // simulating a server response with 500ms of delay.
        setTimeout(() => resolve(res), 500);
    });
};

class ServerSide extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            pages: null,
            loading: true
        };
        this.fetchData = this.fetchData.bind(this);
    }
    fetchData(state, instance) {
        this.setState({ loading: true });
        // Request the data however you want.
        requestData(
            state.pageSize,
            state.page,
            state.sorted,
            state.filtered
        ).then(res => {
            this.setState({
                data: res.rows,
                pages: res.pages,
                loading: false
            });
        });
    }
    render() {
        const { data, pages, loading } = this.state;
        return (
            <div>
                <ReactTable
                    columns={[
                        {
                            Header: "First Name",
                            accessor: "firstName"
                        },
                        {
                            Header: "Last Name",
                            id: "lastName",
                            accessor: d => d.lastName
                        },
                        {
                            Header: "Mandatory Medicine",
                            accessor: "mandatoryMedicine"
                        },
                        {
                            Header: "Optional Medicine",
                            accessor: "optionalMedicine"
                        }
                    ]}
                    manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                    data={data}
                    pages={pages} // Display the total number of pages
                    loading={loading} // Display the loading overlay when we need it
                    onFetchData={this.fetchData} // Request new data when things change
                    filterable
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
            </div>
        );
    }
}
export default ServerSide;
