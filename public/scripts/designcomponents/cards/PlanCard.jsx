import Content from './Content.jsx';
import {CardTitleLink} from "../../common/Card";
import {routes} from "../routes"

export default ({plan}) => (
    <div className="card">
        <CardTitleLink title={plan.name} href={routes.toPlanDetail(plan.id)}/>
        <div className="content-row">
            <Content name="Type" value={plan.analysisType}/>
            <Content name="Model" value={plan.model}/>
        </div>
        <div className="content-row">
            <Content name="Factors" value={plan.factors}/>
        </div>
        <div className="content-row">
            <Content name="Number of Comparison Rules" value={plan.noOfComparisons}/>
        </div>
        <div className="content-row">
            <Content name="Number of Instructions" value={plan.noOfInstructions}/>
        </div>
        <div className="content-row">
            <Content name="Created By" value={plan.user}/>
            {plan.canEdit || <i className="fa fa-lock"></i>}
        </div>
    </div>
);