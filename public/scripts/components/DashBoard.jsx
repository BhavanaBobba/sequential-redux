import React from 'react';
import {browserHistory} from 'react-router'
import {Button} from 'react-bootstrap'


const DashBoard = React.createClass({

    createTable(event) {
        browserHistory.push({
            pathname: '/createTable'
        })
    },

    viewData(event) {
        browserHistory.push({
            pathname: '/viewData'
        })
    },

    viewMapping(event) {
        browserHistory.push({
            pathname: '/viewMapping'
        })
    },

    generateMapping(event) {
        browserHistory.push({
            pathname: '/generateMapping'
        })
    },

    viewRules(event) {
        browserHistory.push({
            pathname: '/viewRules'
        })
    },

    render() {

        return (
            <div className="page-style">
                <h1>
                    Hello, Bhavana
                </h1>

                <Button bsStyle="primary pull-left" style={{margin: '10px'}}
                        onClick={this.createTable}>Create Table</Button>

                <Button bsStyle="primary pull-left" style={{margin: '10px'}}
                        onClick={this.viewData}>View Data</Button>

                <Button bsStyle="primary pull-left" style={{margin: '10px'}}
                        onClick={this.generateMapping}>Generate Mapping</Button>

                <Button bsStyle="primary pull-left" style={{margin: '10px'}}
                        onClick={this.viewMapping}>View Mapping</Button>

                <Button bsStyle="primary pull-left" style={{margin: '10px'}}
                        onClick={this.viewRules}>View Rules</Button>

            </div>
        )
    }
});

export default DashBoard;
