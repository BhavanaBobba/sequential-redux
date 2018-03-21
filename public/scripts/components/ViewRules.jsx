import React from 'react';
import {browserHistory} from 'react-router'
import Dropdown from 'react-dropdown'
import JsonTable from 'ts-react-json-table';
import superagent from 'superagent';
import 'react-dropdown/style.css'
import {Button} from 'react-bootstrap'

const ViewRules = React.createClass({
    getInitialState() {
        return {
            rules: []
        }
    },
    componentDidMount() {
        const url = 'http://localhost:8080/sequential/tables/consumption_rule/get-data';
        superagent
            .get(url)
            .set('Accept', 'application/json')
            .end((error, response) => {
                console.log(JSON.stringify(response.body));
                this.setState({
                    rules: response.body
                })
            })
    },

    render() {
        const {rules} = this.state;

        return (
            <div className="page-style">
                <div className="custom-table">
                    <h4>Available Consumption Rules</h4>
                    <JsonTable rows={rules} className={'table table-striped table-bordered table-hover'}/>
                </div>
                <Button bsStyle="primary pull-right" style={{margin: '10px'}}>Add Rule</Button>
            </div>
        )
    }
});

export default ViewRules;



{/*<h5>Please select Tables to Add</h5>*/}
{/*<Dropdown options={tables} placeholder="Tables" value={selectedTable} multiple={true}*/}
{/*id="dropdown-organization" className="dropdown" onChange={this._onSelect}/>*/}
{/*<h5>Please select Tables to Subtract</h5>*/}
{/*<Dropdown options={tables} placeholder="Tables" value={selectedTable}*/}
{/*id="dropdown-organization" className="dropdown" onChange={this._onSelect}/>*/}
