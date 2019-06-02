import React from 'react';
import { editAttribute } from "../../../actions/index";
import { connect } from 'react-redux';




// const IntEdit = function (props) {
//     return (<><label> {props.attribute.key}</label>
//         <input type="text" value={props.attribute.desc.value} pattern="[0-9]*" onChange={(event) => {
//             props.editAttribute(props.attribute.key, event.target.value)
//         }} /></>);
// }

class IntEdit extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const min_value = this.props.attribute.desc.range[0];
        const max_value = this.props.attribute.desc.range[1];
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        // check value
        if (parseInt(event.target.value) < min_value || parseInt(event.target.value) > max_value) return;
        if (re.test(event.target.value)) {
            this.props.editAttribute(this.props.attribute.key, event.target.value)
        }
    }


    render() {

        return (
            <div class="field is-horizontal" >
                <div class="field-label is-small">
                    <label class="label">{this.props.attribute.key}</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <input class="input" value={this.props.attribute.desc.value} type="text" pattern="[0-9]*" onChange={this.handleChange} />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { editAttribute })(IntEdit);
