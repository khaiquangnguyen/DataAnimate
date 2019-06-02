import React from 'react';
import { editAttribute } from "../../../actions/index";
import { connect } from 'react-redux';




// const IntEdit = function (props) {
//     return (<><label> {props.attribute.key}</label>
//         <input type="text" value={props.attribute.desc.value} pattern="[0-9]*" onChange={(event) => {
//             props.editAttribute(props.attribute.key, event.target.value)
//         }} /></>);
// }

class TextAreaEdit extends React.Component {
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
            <div class="field is-horizontal">
                <div class="field-label is-small">
                    <label class="label">{this.props.attribute.key}</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <textarea class="textarea" rows="10" value={this.props.attribute.desc.value} onChange={this.handleChange}></textarea>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { editAttribute })(TextAreaEdit);
