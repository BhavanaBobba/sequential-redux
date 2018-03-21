import React from 'react';
import {browserHistory} from 'react-router'
import Dropdown from 'react-dropdown'
import JsonTable from 'ts-react-json-table';
import superagent from 'superagent';
import 'react-dropdown/style.css'

const ViewData = React.createClass({
    getInitialState() {
        return {
            tables: [],
            selectedTable: null,
            tableData: []
        }
    },
    componentDidMount() {
        const url = 'http://localhost:8080/sequential/tables';
        superagent
            .get(url)
            .set('Accept', 'application/json')
            .end((error, response) => {
                console.log(JSON.stringify(response.body));
                this.setState({
                    tables: response.body
                })
            })
    },
    getTableData(tableName) {
        const getDataUrl = `http://localhost:8080/sequential/tables/${tableName}/get-data`
        superagent
            .get(getDataUrl)
            .set('Accept', 'application/json')
            .end((error, response) => {
                console.log(JSON.stringify(response.body));
                this.setState({
                    tableData: response.body
                })
            })
    },
    _onSelect(option) {
        console.log('You selected ', option.label)
        this.setState({selectedTable: option})
        this.getTableData(option.value)
    },
    render() {
        const {tables} = this.state;
        const {selectedTable} = this.state;
        const {tableData} = this.state;

        return (
            <div className="page-style">
                <div>
                    <h5>Please select a Table to view Data</h5>
                    <Dropdown options={tables} placeholder="Tables" value={selectedTable}
                              id="dropdown-organization" className="dropdown" onChange={this._onSelect}/>
                </div>
                <div className="custom-table">
                    <JsonTable rows={tableData} className={'table table-striped table-bordered table-hover'}/>
                </div>
            </div>
        )
    }
});

export default ViewData;



