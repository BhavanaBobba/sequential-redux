import React from 'react';

export const TableList = React.createClass({
    render() {
        return (
            <div className="vertical-menu">
                    <a href="createTable">Create Table</a>
                <a href="viewData">View Table</a>
            </div>
        )
    }
});

export const MappingList = React.createClass({
    render() {
        return (
            <div>
                <li><a href="generateMapping">Generate Mapping</a></li>
                <li><a href="viewMapping">View Mapping</a></li>
            </div>
        )
    }
});

export const ScheduleList = React.createClass({
    render() {
        return (
            <div>
                <li><a href="schedule">Schedule</a></li>
                <li><a href="viewSchedules">View Scheduled Jobs</a></li>
            </div>
        )
    }
});

export const MonitorList = React.createClass({
    render() {
        return (
            <div>
                <li><a href="monitor">Monitor</a></li>
            </div>
        )
    }
});

// module.exports[TableList, MappingList, ScheduleList, MonitorList]
