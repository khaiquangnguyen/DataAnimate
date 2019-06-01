import React from 'react';
import { editAttribute } from "../../../actions/index";
import { connect } from 'react-redux';




// const IntEdit = function (props) {
//     return (<><label> {props.attribute.key}</label>
//         <input type="text" value={props.attribute.desc.value} pattern="[0-9]*" onChange={(event) => {
//             props.editAttribute(props.attribute.key, event.target.value)
//         }} /></>);
// }

class BooleanEdit extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const min_value = this.props.attribute.desc.range[0];
        const max_value = this.props.attribute.desc.range[1];
        console.log(min_value, max_value);
        // if value is not blank, then test the regex
        // check value
        if (parseFloat(event.target.value) < min_value || parseInt(event.target.value) > max_value) return;
        this.props.editAttribute(this.props.attribute.key, event.target.value)
    }

    render() {
        return (<><label> {this.props.attribute.key}</label>
            <input type="number" step="0.01" value={this.props.attribute.desc.value} onChange={this.handleChange} /></>);
    }
}

export default connect(null, { editAttribute })(BooleanEdit);
