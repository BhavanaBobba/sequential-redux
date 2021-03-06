import React from 'react';
import Header from "../common/Header";
import {CardTitleLink} from "../common/Card";
import ReactDOM from "react-dom"
import {Link} from "react-router";

const MainView = React.createClass({
    // componentDidMount() {
    //     this.handleScroll = (()=> {
    //         const component = ReactDOM.findDOMNode(this);
    //         const clientRect = component.getBoundingClientRect();
    //         const cutoff = 39; // height of navbar
    //         const header = component.getElementsByClassName("sticky-header")[0];
    //
    //         if (clientRect.top > cutoff || clientRect.bottom < cutoff) {
    //             header.style.display = "none";
    //         } else {
    //             header.style.top = cutoff + "px";
    //             header.style.left = clientRect.left + "px";
    //             header.style.width = clientRect.width + "px";
    //             header.style.display = "table";
    //         }
    //     }).bind(this);
    //     window.addEventListener("scroll", this.handleScroll);
    //     window.addEventListener("resize", this.handleScroll);
    // },
    //
    // componentWillUnmount() {
    //     this.handleScroll = (()=> {
    //         const component = ReactDOM.findDOMNode(this);
    //         const clientRect = component.getBoundingClientRect();
    //         const cutoff = 0; // height of navbar
    //         const header = component.getElementsByClassName("sticky-header")[0];
    //
    //         if (clientRect.top > cutoff || clientRect.bottom < cutoff) {
    //             header.style.display = "none";
    //         } else {
    //             header.style.top = cutoff + "px";
    //             header.style.left = clientRect.left + "px";
    //             header.style.width = clientRect.width + "px";
    //             header.style.display = "table";
    //         }
    //     }).bind(this);
    //     window.removeEventListener("scroll", this.handleScroll);
    //     window.removeEventListener("resize", this.handleScroll);
    // },
    render() {
        return (
            <div>
                <div className="style">
                    <nav>
                        <ul className="sticky-header">
                            <li><a href="#dataMining">Data Mining</a></li>
                            <li><a href="#dataModelling">Data Modelling</a></li>
                            <li><a href="#dataUtilization">Data Utilization</a></li>
                            <li><a href="#customization">Customization</a></li>
                            <li><a href="#dataAnalytics">Data Analytics</a></li>
                            <li><a href="#dataMonitoring">Data Monitoring</a></li>
                            <li><a href="#security">Security</a></li>
                            <li><a href="#settings">Settings</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="data style">
                    <div id="dataMining">
                        <Header>
                            <Header.Title>Data Mining</Header.Title>
                        </Header>
                        <CardTitleLink title="Table" href={'tableList'}/>
                        <CardTitleLink title="Mapping" href={'mappingList'}/>
                        <CardTitleLink title="Schedule" href={'https://www.google.com'}/>
                        <CardTitleLink title="Monitor" href={'https://www.google.com'}/>
                        <hr/>
                    </div>
                    <div id="dataModelling">
                        <Header>
                            <Header.Title>Data Modelling</Header.Title>
                        </Header>
                        <CardTitleLink title="Rule" href={'https://www.google.com'}/>
                        <CardTitleLink title="Version" href={'https://www.google.com'}/>
                        <CardTitleLink title="Change Log" href={'https://www.google.com'}/>
                        <hr/>
                    </div>
                    <div id="dataUtilization">
                        <Header>
                            <Header.Title>Data Utilization</Header.Title>
                        </Header>
                        <CardTitleLink title="Incoming" href={'https://www.google.com'}/>
                        <CardTitleLink title="Outgoing" href={'https://www.google.com'}/>
                        <CardTitleLink title="Monitoring" href={'https://www.google.com'}/>
                        <CardTitleLink title="Reports" href={'https://www.google.com'}/>
                        <CardTitleLink title="Change Log" href={'https://www.google.com'}/>
                        <hr/>
                    </div>
                    <div id="customization">
                        <Header>
                            <Header.Title>Customization</Header.Title>
                        </Header>
                        <CardTitleLink title="Consumption Rule" href={'viewRules'}/>
                        <CardTitleLink title="Request Type" href={'https://www.google.com'}/>
                        <CardTitleLink title="Model" href={'https://www.google.com'}/>
                        <CardTitleLink title="UOM" href={'https://www.google.com'}/>
                        <CardTitleLink title="Alert" href={'https://www.google.com'}/>
                        <CardTitleLink title="Lead Time Maintenance" href={'https://www.google.com'}/>
                        <hr/>
                    </div>
                    <div id="dataAnalytics">
                        <Header>
                            <Header.Title>Data Analytics</Header.Title>
                        </Header>
                        <CardTitleLink title="Report" href={'https://www.google.com'}/>
                        <CardTitleLink title="Graph" href={'https://www.google.com'}/>
                        <hr/>
                    </div>
                    <div id="dataMonitoring">
                        <Header>
                            <Header.Title>Data Monitoring</Header.Title>
                        </Header>
                        <CardTitleLink title="Load Monitoring" href={'https://www.google.com'}/>
                        <CardTitleLink title="Security" href={'https://www.google.com'}/>
                        <CardTitleLink title="Job" href={'https://www.google.com'}/>
                        <hr/>
                    </div>
                    <div id="security">
                        <Header>
                            <Header.Title>Security</Header.Title>
                        </Header>
                        <CardTitleLink title="Profile" href={'https://www.google.com'}/>
                        <CardTitleLink title="Role" href={'https://www.google.com'}/>
                        <CardTitleLink title="Health" href={'https://www.google.com'}/>
                        <hr/>
                    </div>
                    <div id="settings">
                        <Header>
                            <Header.Title>Settings</Header.Title>
                        </Header>
                        <CardTitleLink title="Theme" href={'https://www.google.com'}/>
                        <CardTitleLink title="Colors" href={'https://www.google.com'}/>
                        <CardTitleLink title="Customize" href={'https://www.google.com'}/>
                    </div>
                </div>
            </div>

        );
    }
});

export default MainView;

// sticky-header
// data style