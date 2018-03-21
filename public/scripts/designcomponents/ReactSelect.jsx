import React from 'react'
import Select from 'react-select'
import 'react-select/less/select.less'
import {contains, compare} from "../common/util";

export function ReactSelect ({label, className, errorMessage, ...props}) {
    const defaultProps = {
        options: [],
        valueKey: 'id',
        labelKey: 'name',
        multi: false,
        autoBlur: true
    };
    props = {...defaultProps, ...props};
    return (
        <div className={"form-group " + className + (errorMessage ? " has-error" : "")}>
            <label className="control-label">{label}</label>
            <Select matchProp="label" {...props}/>
            <span className="validation-message">{errorMessage}</span>
        </div>
    )

}

export function ReactSelectGrouped({groupKey, labelKey, ...props}) {

    groupKey = groupKey || "groupName";
    labelKey = labelKey || "name";

    return <ReactSelect filterOptions={filterOptions} valueRenderer={valueRenderer} className="grouped" labelKey={labelKey} {...props} />

    function filterOptions(options, filter, currentValues) {
        const filteredOptions = options
            .filter(option => (contains(option.name, filter) && !currentValues.includes(option)))
            .sort(byGroupAndLabel);

        let prevGroup = undefined;
        const values = [];
        for (const option of filteredOptions) {
            if (option[groupKey] != prevGroup) {
                prevGroup = option[groupKey];
                values.push({id: prevGroup, name: prevGroup, disabled: true});
            }
            values.push(option);
        }

        return values;

        function byGroupAndLabel(option1, option2) {
            return compare(option1[groupKey], option2[groupKey]) || compare(option1[labelKey], option2[labelKey]);
        }
    }

    function valueRenderer(option) {
        return option[groupKey] + ": " + option[labelKey];
    }
}

