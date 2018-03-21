import {appendClass} from "./util";

export const Input = ({label, className, ...props}) => {
    return (
        <div className={appendClass("form-group", className)}>
            <label className="control-label">{label}</label>
            <input className="form-control" {...props} />
        </div>
    )
};

