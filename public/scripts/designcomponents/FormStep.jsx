import React from 'react'

export const FormStep = ({header, children, className}) => {
    return (
        <div className={"form-step" + (className ?  " " + className : "")}>
            <h4>{header}</h4>
            {children}
        </div>
    )
};

FormStep.propTypes = {
    header: React.PropTypes.string
};

export class FormRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="form-row" style={this.props.style}>
                {this.props.children}
            </div>
        )
    }
}

