import React from 'react';
import { editAttribute } from "../../../actions/index";
import { connect } from 'react-redux';




// const IntEdit = function (props) {
//     return (<><label> {props.attribute.key}</label>
//         <input type="text" value={props.attribute.desc.value} pattern="[0-9]*" onChange={(event) => {
//             props.editAttribute(props.attribute.key, event.target.value)
//         }} /></>);
// }

class StringEdit extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let target = (this.props.attribute.reference_object);
        this.props.editAttribute(target, this.props.attribute.key, event.target.value)
    }

    render() {

        return (
            <div className="field is-horizontal">
                <div className="field-label is-small">
                    <label className="label">{this.props.attribute.key}</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <input type="text" class="input" value={this.props.attribute.desc.value} onChange={this.handleChange} />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { editAttribute })(StringEdit);
