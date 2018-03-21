import React from "react";
import {connect} from "react-redux";
import {combineStatuses, SUCCESS, FAILURE} from "../redux/status";

export function wrapComponentLifecycleAndConnect(render, mapStateToProps, mapDispatchToProps) {
    @connect(mapStateToProps, mapDispatchToProps)
    class wrapper extends React.Component {
        constructor(props) {
            super(props);
        }

        componentDidMount() {
            this.props.onComponentDidMount && this.props.onComponentDidMount();
        }

        componentWillUnmount() {
            this.props.onComponentWillUnmount && this.props.onComponentWillUnmount();
        }

        render() {
            return render(this.props);
        }
    }
    return wrapper;
}

export function wrapWithLoading(InnerComponent, onComponentDidMount, getDependencies, onComponentWillUnmount) {
    return wrapComponentLifecycleAndConnect(render, mapStateToProps, mapDispatchToProps);

    function mapStateToProps(state) {
        return combineStatuses(getDependencies(state));
    }

    function mapDispatchToProps(dispatch, ownProps) {
        return {
            onComponentDidMount: () => {
                onComponentDidMount(dispatch, ownProps)
            },
            onComponentWillUnmount: () => {
                onComponentWillUnmount && onComponentWillUnmount(dispatch, ownProps)
            }
        };
    }

    function render(props) {
        switch (props.status) {
            case SUCCESS:
                return <InnerComponent {...props} />;

            case FAILURE:
                return <div className="alert alert-danger">{props.errorMessage}</div>;

            default:
                return <div className="velocity-spinner-page"/>;
        }

    }
}

export function connectAndWrapWithLoading(InnerComponent, mapStateToProps, mapDispatchToProps, onComponentDidMount, getDependencies, onComponentWillUnmount) {
    return wrapWithLoading(connect(mapStateToProps, mapDispatchToProps)(InnerComponent), onComponentDidMount, getDependencies, onComponentWillUnmount);
}