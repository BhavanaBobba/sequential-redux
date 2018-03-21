import React from 'react';
// import {getAppUserProfile} from '@monsantoit/profile-client';
// import {Dropdown} from 'react-bootstrap'
import {MenuItem} from 'react-bootstrap'
import ReactDataGrid from 'react-data-grid';
import superagent from 'superagent';
import Griddle from 'griddle-react';
import JsonTable from 'ts-react-json-table';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import ReactTable from "react-table";
import "react-table/react-table.css";
import {Button} from 'react-bootstrap'
import _ from 'lodash';

// import 'bootstrap/dist/css/bootstrap.css';


const EditableTable = React.createClass({
    getInitialState() {
        return {};
    },

    renderEditable(cellInfo) {
            return (
                <div
                    style={{backgroundColor: "#fafafa"}}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => {
                        const data = [...this.props.mappingData];
                        data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                        this.setState({data});
                    }}
                    dangerouslySetInnerHTML={{
                        __html: this.props.mappingData[cellInfo.index][cellInfo.column.id]
                    }}
                />
            );
    },

    render() {

        return (
            <div>
                <ReactTable
                    data={this.props.mappingData}
                    columns={[
                        {
                            Header: "Internal Column",
                            accessor: "column_name",
                        },
                        {
                            Header: "DataType",
                            accessor: "data_type",
                        },
                        {
                            Header: "External Column",
                            accessor: "column_value",
                            Cell: this.renderEditable
                        }
                    ]}
                    showPagination={false}
                    className="-striped -highlight"
                />
            </div>
        )
    }
});

export default EditableTable;