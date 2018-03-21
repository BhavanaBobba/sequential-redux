import React from 'react';
import {Route, IndexRoute} from 'react-router';
import RootComponent from './RootComponent';
import DashBoard from './DashBoard';
import MainView from './MainView';
import ViewData from "./ViewData";
import ViewMapping from "./ViewMapping";
import GenerateMapping from "./GenerateMapping";
import ViewRules from "./ViewRules";
import CreateTable from "./CreateTable";
import {MappingList, ScheduleList, TableList, MonitorList} from "./DataMinning";

const routes = (
    <Route path="/sequential-ui" component={RootComponent}>
        <IndexRoute component={DashBoard}/>
        <Route path="/mainView" component={MainView}/>
        <Route path="/tableList" component={TableList}/>
        <Route path="/mappingList" component={MappingList}/>
        <Route path="/scheduleList" component={ScheduleList}/>
        <Route path="/monitorList" component={MonitorList}/>
        <Route path="/viewData" component={ViewData}/>
        <Route path="/viewMapping" component={ViewMapping}/>
        <Route path="/generateMapping" component={GenerateMapping}/>
        <Route path="/viewRules" component={ViewRules}/>
    </Route>
);

export default routes;