import React from 'react';
import {browserHistory} from 'react-router'
import Dropdown from 'react-dropdown'
import JsonTable from 'ts-react-json-table';
import superagent from 'superagent';
import 'react-dropdown/style.css'

const CreateTable = React.createClass({
    getInitialState() {
        return {
            tables: [],
            selectedTable: null,
            tableData: []
        }
    },
    render() {
        const {tables} = this.state;
        const {selectedTable} = this.state;
        const {tableData} = this.state;

        return (
            <div className="page-style">
                <div>
                    <h5>Table Name</h5>
                    <h5>No. of Columns</h5>
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

export default CreateTable;



