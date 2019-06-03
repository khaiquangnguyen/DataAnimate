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
        let target = (this.props.attribute.reference_object);
        this.props.editAttribute(target, this.props.attribute.key, 1 - event.target.value)
    }
    render() {
        return (
            <div className="field is-horizontal">
                <div className="field-label is-small">
                    <label className="label">{this.props.attribute.key}</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <label className="checkbox">
                                <input className="checkbox" type="checkbox" value={this.props.attribute.desc.value} checked={this.props.attribute.desc.value === 1} onChange={this.handleChange} />

                            </label>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

export default connect(null, { editAttribute })(BooleanEdit);
