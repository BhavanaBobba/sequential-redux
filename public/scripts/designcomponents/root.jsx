import path from "path";
import {Link} from "react-router";

export default (props)=> {
    return (
        <div>
            <ol className="breadcrumb">
                {crumbs()}
            </ol>
            {props.children}
        </div>
    );

    function crumbs() {
        let thePath = "";
        const validRoutes =props.routes.filter(r=>r.path);
        return validRoutes
            .map((route, index)=> {
                thePath = path.join(thePath, parseParams(route.path));
                if (index < validRoutes.length -1)
                    return <li key={index}><Link to={thePath}>{route.name}</Link></li>;
                else
                    return <li key={index} className="active">{route.name}</li>;
            });
    }

    function parseParams(route){
        return route.replace(":id", props.params.id).replace(":factorId", props.params.factorId);
    }
};