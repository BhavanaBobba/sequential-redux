import React from "react";
import {Route, IndexRoute} from "react-router";
import Root from "./root";
import Dashboard from "../components/MainView";
import ListAnalysisSets from "../set/ListAnalysisSets";
import CreateAnalysisSet from "../set/CreateAnalysisSet";
import AnalysisSetDetail from "../set/AnalysisSetDetail";
import CreatePlan from "../plan/CreatePlan";
import ListPlans from "../plan/ListPlans";
import PlanDetail from "../plan/PlanDetail";
import ListInstructions from "../instruction/ListInstructions";
import CreateInstruction from "../instruction/CreateInstruction";
import InstructionDetailBase from "../instruction/InstructionDetailBase";
import InstructionDetail from "../instruction/InstructionDetail";
import UpdateAnalysisEntries from "../instruction/UpdateAnalysisEntries";
import AnalysisEntryGroupDetail from '../instruction/AnalysisEntryGroupDetail'
import RemovePartialText from "../instruction/RemovePartialText";
import RenameAndCombine from "../instruction/RenameAndCombine";
import UpdateAnalysisEntriesBase from "../instruction/UpdateAnalysisEntriesBase";
import HealthCheck from '../health/HealthCheck';
import path from "path";

const routeMap = {
    key: "DASHBOARD", name: "Dashboard", route: "/design-analysis", component: Root,
    indexRoute: {component: Dashboard},
    routes: [
        {
            key: "HEALTH_CHECK", name: "Health Check", route: "/design-analysis/health-check",
            indexRoute: {component: HealthCheck}
        },
        {
            key: "LIST_PLANS", name: "Plans", route: "plans",
            indexRoute: {component: ListPlans},
            routes: [
                {key: "CREATE_PLAN", name: "Create", route: "create", component: CreatePlan},
                {key: "PLAN_DETAIL", name: "Detail", route: ":planId", component: PlanDetail}
            ]
        },
        {
            key: "VIEW_SETS", name: "Analysis Sets", route: "sets",
            indexRoute: {component: ListAnalysisSets},
            routes: [
                {key: "CREATE_SET", name: "Create", route: "create", component: CreateAnalysisSet},
                {key: "SET_DETAIL", name: "Detail", route: ":analysisSetId", component: AnalysisSetDetail}
            ]
        },
        {
            key: "VIEW_INSTRUCTION", name: "Instructions", route: "instructions",
            indexRoute: {component: ListInstructions},
            routes: [
                {key: "CREATE_INSTRUCTION", name: "Create", route: "create", component: CreateInstruction},
                {
                    key: "INSTRUCTION_DETAIL", name: "Detail", route: ":id", component: InstructionDetailBase,
                    indexRoute: {component: InstructionDetail},
                    routes: [
                        {
                            key: "UPDATE_ANALYSIS_ENTRY", name: "Analysis Entry Groups", route: "update-analysis-entry-groups/:factorId", component: UpdateAnalysisEntriesBase,
                            indexRoute: {component: UpdateAnalysisEntries},
                            routes: [
                                {key: "REMOVE_PARTIAL_TEXT", name: "Remove Partial Text", route: "remove-partial-text", component: RemovePartialText},
                                {key: "RENAME_AND_COMBINE", name: "Rename and Combine", route: "rename-and-combine", component: RenameAndCombine},
                                {key: "ANALYSIS_ENTRY_GROUP_DETAIL", name: "Analysis Entries", route: "analysis-entries/:entryGroupId", component: AnalysisEntryGroupDetail}
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

export const routes = getRoutes();

export const routeComponent = createRouteComponent(routeMap);

function getRoutes() {

    const routeConstants = {};

    setRouteName(routeMap, "");
    routeConstants.toInstructionDetail = id => routes.INSTRUCTION_DETAIL.replace(":id", id);
    routeConstants.toUpdateAnalysisEntry = (id, factorId) => routes.UPDATE_ANALYSIS_ENTRY.replace(":id", id).replace(":factorId", factorId);
    routeConstants.toAnalysisEntryGroupDetail = (id, factorId, entryGroupId) => routes.ANALYSIS_ENTRY_GROUP_DETAIL.replace(":id", id).replace(":factorId", factorId).replace(":entryGroupId", entryGroupId);
    routeConstants.toRemovePartialText = (id, factorId) => routes.REMOVE_PARTIAL_TEXT.replace(":id", id).replace(":factorId", factorId);
    routeConstants.toRenameAndCombine = (id, factorId) => routes.RENAME_AND_COMBINE.replace(":id", id).replace(":factorId", factorId);
    routeConstants.toAnalysisSetDetail = id => routes.SET_DETAIL.replace(":analysisSetId", id);
    routeConstants.toPlanDetail = id => routes.PLAN_DETAIL.replace(":planId", id);

    return routeConstants;

    function setRouteName(routeMap, parent) {
        const url = path.join(parent, routeMap.route);
        routeConstants[routeMap.key] = url;
        if (routeMap.routes) {
            for (let subRoute of routeMap.routes)
                setRouteName(subRoute, url)
        }
    }
}


function createRouteComponent(routeMap, index) {
    return <Route
        key={index}
        path={routeMap.route}
        component={routeMap.component}
        name={routeMap.name}>
        {routeMap.indexRoute && <IndexRoute component={routeMap.indexRoute.component}/>}

        {routeMap.routes && routeMap.routes.map(createRouteComponent)}

    </Route>
}