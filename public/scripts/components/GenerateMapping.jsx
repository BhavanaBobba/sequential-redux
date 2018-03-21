import React from 'react';
import {browserHistory} from 'react-router'
import Dropdown from 'react-dropdown'
import superagent from 'superagent';
import 'react-dropdown/style.css'
import _ from 'lodash';
import {Button} from 'react-bootstrap'
import EditableTable from './EditableTable'

const ViewMapping = React.createClass({
    getInitialState() {
        return {
            tables: [],
            selectedTable: null,
            mappingData: [],
            tableColumns: []
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
    getMappingData(tableName) {
        const getDataUrl = `http://localhost:8080/sequential/tables/${tableName}/get-mapping`
        superagent
            .get(getDataUrl)
            .set('Accept', 'application/json')
            .end((error, response) => {
                console.log(JSON.stringify(response.body));
                this.setState({
                    mappingData: response.body
                })
            })
    },
    getColumns(tableName) {
        console.log(tableName)
        const getDataUrl = `http://localhost:8080/sequential/tables/${tableName}/get-columns`
        superagent
            .get(getDataUrl)
            .set('Accept', 'application/json')
            .end((error, response) => {
                console.log(JSON.stringify(response.body));
                this.setState({
                    tableColumns: response.body
                })
            })
    },
    _onSelect(option) {
        console.log('You selected ', option.label)
        this.setState({selectedTable: option})
        this.getMappingData(option.value)
        this.getColumns(option.value)
    },

    saveMapping(mappingToSave, tableName) {
        const postMappingUrl = `http://localhost:8080/sequential/tables/${tableName}/create-mapping`
        superagent
            .post(postMappingUrl)
            .send(_.map((mappingToSave), column => {
                return {
                    columnname: column.column_name,
                    columnvalue: column.column_value
                }
            }))
            .set('Accept', 'application/json')
            .end((error, response) => {
                console.log(JSON.stringify(response.body));
                this.setState({
                    // mappingData: getMappingData(tableName)
                })
            })
        browserHistory.push({
            pathname: '/viewMapping'
        })
    },
    render() {
        const {tables} = this.state;
        const {selectedTable} = this.state;
        const {mappingData} = this.state;
        const {tableColumns} = this.state;

        let mergedData = [];
        if (mappingData.length > 0) {
            mergedData = _.map((mappingData, tableColumns), row => {
                return {
                    column_name: row.column_name,
                    data_type: row.data_type,
                    column_value: _.find(mappingData, data => {
                        return row.column_name === data.tablecolumn
                    }).mappingcolumn
                }
            })
        }
        else {
            mergedData = tableColumns
        }
        console.log(mergedData)

        return (
            <div className="page-style">
                <div>
                    <h5>Please select a Table to Generate Mapping</h5>
                    <Dropdown options={tables} placeholder="Tables" value={selectedTable}
                              id="dropdown-organization" className="dropdown" onChange={this._onSelect}/>
                </div>
                <EditableTable mappingData={mergedData}/>
                <Button bsStyle="primary pull-right" style={{margin: '10px'}}
                        onClick={() => this.saveMapping(mergedData, selectedTable.value)}>Save</Button>
            </div>
        )
    }
});

export default ViewMapping;
