import React from "react"
import ReactDOM from "react-dom"
import {Link} from "react-router";
import {appendClass} from "./util";

export class InfiniteScrollTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rowsToLoad: 100};

        this.handleScroll = (()=> {
            const component = ReactDOM.findDOMNode(this);
            const clientRect = component.getBoundingClientRect();

            if ((clientRect.bottom < window.innerHeight + 50) && this.state.rowsToLoad < this.props.data.length) {
                this.loadMoreRows();
            }

            const cutoff = 39; // height of navbar
            const header = component.getElementsByClassName("sticky-header")[0];

            if (clientRect.top > cutoff || clientRect.bottom < cutoff) {
                header.style.display = "none";
            } else {
                header.style.top = cutoff + "px";
                header.style.left = clientRect.left + "px";
                header.style.width = clientRect.width + "px";
                header.style.display = "table";
            }
        }).bind(this);
    }

    render() {
        const {data, ...props} = this.props;
        return (
            <div className="sticky-header-container">
                <table className="table table-bordered sticky-header">
                    <ColGroup columns={props.columns}/>
                    <THead columns={props.columns}/>
                </table>
                <Table data={data.slice(0, this.state.rowsToLoad)} {...props}/>
            </div>
        );
    }

    loadMoreRows() {
        this.setState({"rowsToLoad": this.state.rowsToLoad + 100});
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("resize", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("resize", this.handleScroll);
    }
}

export const Table = ({data, columns, className}) => {
    return (
        <table className={appendClass("table table-striped table-bordered", className)}>
            <ColGroup columns={columns}/>
            <THead columns={columns}/>
            <tbody>
            {data.map((item, index)=>(
                <tr key={index}>
                    {
                        columns.map((col, index) => (<td key={index} className={col.dataClassName}>{col.getValue(item)}</td>))
                    }
                </tr>
            ))}
            </tbody>
            {footer()}

        </table>

    );

    function footer() {
        if (!data.length) {
            return (
                <tfoot>
                <tr>
                    <td colSpan={columns.length} className="no-data">There is no data to display</td>
                </tr>
                </tfoot>);
        }

        if (columns.any(column => column.footer)){
            return (
                <tfoot>
                    <tr>
                        {columns.map((column, index) => <th key={index}>{column.footer && column.footer.getValue()}</th>)}
                    </tr>
                </tfoot>
            )
        }
    }
};

function ColGroup({columns}) {
    return <colgroup>
        {
            columns.map((col, index)=> (<col key={index} style={{width: col.width}}/>))
        }
    </colgroup>;
}

function THead({columns}) {
    return <thead>
    <tr>
        {
            columns.map((col, index)=> (<th className={col.header.className} key={index} onClick={col.header.onClick}>{col.header.getValue()}</th>))
        }
    </tr>
    </thead>
}

export const Filter = ({onChange, value})=>(
    <div className="form-group filter">
        <label className="control-label">Filter</label>
        <input className="form-control" type="text" value={value || ""} placeholder="Filter" onChange={e => onChange(e.target.value)}/>
        {value && <div className="remove-filter" onClick={()=>onChange("")}>×</div>}
    </div>
);

export const Counts = ({total, visible, selected})=>(
    <div className="form-group row-counts">Showing {visible} of <span className={total >= 10000 ? "too-many-rows" : ""}>{total}</span> rows. {selected} selected.</div>
);

export const linkColumn = (href, column) => {
    return {
        ...column,
        getValue: item => (<Link to={href(item)}>{column.getValue(item)}</Link>)
    };
};

export const dataFieldColumn = (field, column) => {
    return {
        ...column,
        getValue: (item) => item[field]
    }
};

export const selectableColumn = (data, onSelect, onDeselect)=> {
    const selectedCount = data.filter(d => d.isSelected).length;
    const anySelected = selectedCount > 0;
    const selectAllChecked = anySelected;
    const selectAllIndeterminate = anySelected && selectedCount < data.length;

    return {
        getValue: (item)=>(<input type="checkbox" checked={item.isSelected} onChange={() => {onSelectItem(item)}}/>),
        header: {getValue: ()=>(<input type="checkbox" checked={selectAllChecked} onChange={onSelectAllChanged} className={selectAllIndeterminate ? "indeterminate" : ""}/>)},
        width: "30px"
    };

    function onSelectItem(item) {
        if (item.isSelected) {
            onDeselect([item]);
        } else {
            onSelect([item]);
        }
    }

    function onSelectAllChanged() {

        if (anySelected) {
            onDeselect(data.filter(d => d.isSelected))
        } else {
            onSelect(data.filter(d => !d.isSelected))
        }
    }
};

export function wordBreakColumn(column) {
    return {
        ...column,
        getValue: item => addWordBreakOpportunity(column.getValue(item))
    };

    function addWordBreakOpportunity(value) {
        if (typeof value != "string")
            return value;

        const lineBreaks = ["_", ")", ","];
        return value.split("").map(char => {
            if (lineBreaks.includes(char)) {
                return [char, <wbr/>];
            } else {
                return char;
            }
        });
    }
}

export const simpleHeader = value => ({getValue: ()=> value});

export const simpleFooter = value => ({getValue: ()=> value});

const sortableHeader = (fieldName, headerText, onSort, sort) => ({
    getValue: ()=> {
        if (fieldName == sort.field) {
            return [headerText, sort.descending ? <i key="1" className="fa fa-sort-desc"/> : <i key="1" className="fa fa-sort-asc"/>]
        } else {
            return headerText;
        }
    },
    onClick: () => onSort(fieldName),
    className: "sortable"
});

export const sortableDataField = ({fieldName, headerText, onSort, sort}, column) => {
    return {
        ...column,
        getValue: (item) => item[fieldName],
        header: sortableHeader(fieldName, headerText, onSort, sort)
    }
};
