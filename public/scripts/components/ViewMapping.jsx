import React from 'react';
import {browserHistory} from 'react-router'
import Dropdown from 'react-dropdown'
import JsonTable from 'ts-react-json-table';
import superagent from 'superagent';
import 'react-dropdown/style.css'

const ViewMapping = React.createClass({
    getInitialState() {
        return {
            tables: [],
            selectedTable: null,
            mappingData: []
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
    _onSelect(option) {
        console.log('You selected ', option.label)
        this.setState({selectedTable: option})
        this.getMappingData(option.value)
    },
    render() {
        const {tables} = this.state;
        const {selectedTable} = this.state;
        const {mappingData} = this.state;

        return (
            <div className="page-style">
                <div>
                    <h5>Please select a Table to view Mapping</h5>
                    <Dropdown options={tables} placeholder="Tables" value={selectedTable}
                              id="dropdown-organization" className="dropdown" onChange={this._onSelect}/>
                </div>
                <div className="custom-table">
                    <JsonTable rows={mappingData} className={'table table-striped table-bordered table-hover'}/>
                </div>
            </div>
        )
    }
});

export default ViewMapping;



