import React from 'react';
import { connect } from 'react-redux';
import { input_types } from '../../../lib/Scene';
import IntEdit from '../CustomComponents//IntEdit';
import FloatEdit from '../CustomComponents/FloatEdit';
import StringEdit from '../CustomComponents/StringEdit';
import BooleanEdit from '../CustomComponents/BooleanEdit';
import SelectEdit from '../CustomComponents/SelectEdit';
import FileEdit from '../CustomComponents/FileEdit';
import AddEffectButton from './AddEffectButton';
import { edit_effect_stack } from '../../../actions/index';

class EffectStackMenuItem extends React.Component {

    render() {
        let content_el = [];
        const all_effect_contents = [];
        var attribute, input_field;

        input_field = (
            <div class="field is-horizontal">
                <div class="field-label is-small">
                    <label class="label">duration</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <input class="input" value={this.props.reference_object.duration} type="text" pattern="[0-9]*" onChange={(e) => {
                                this.props.edit_effect_stack(this.props.reference_object.start_time, e.target.value);

                            }} />
                        </div>

                    </div>
                </div>
            </div>
        );
        content_el.push(input_field);
        input_field = input_field = (
            <div class="field is-horizontal">
                <div class="field-label is-small">
                    <label class="label">start time</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <input class="input" value={this.props.reference_object.start_time} type="text" pattern="[0-9]*" onChange={(e) => {
                                this.props.edit_effect_stack(e.target.value, this.props.reference_object.duration);

                            }} />
                        </div>

                    </div>
                </div>
            </div>
        );
        content_el.push(input_field);
        let section = (
            <div>
                <h3 class="title">Effect Stack</h3>
                {content_el}
                <hr></hr>
            </div>);

        all_effect_contents.push(section);
        const effects = this.props.reference_object.effects;
        if (!effects) return (<></>);
        effects.forEach(effect => {
            content_el = [];
            Object.keys(effect).forEach(key => {
                switch (effect[key]['type']) {
                    case input_types.INT:
                        attribute = {
                            key,
                            desc: effect[key]
                        }
                        input_field = <IntEdit attribute={attribute}
                        />
                        content_el.push(input_field);
                        break;
                    case input_types.FLOAT:
                        attribute = {
                            key,
                            desc: effect[key]
                        }
                        input_field = <FloatEdit attribute={attribute}
                        />
                        content_el.push(input_field);
                        break;
                    case input_types.BOOLEAN:
                        attribute = {
                            key,
                            desc: effect[key]
                        }
                        input_field = <BooleanEdit attribute={attribute}
                        />
                        content_el.push(input_field);
                        break;
                    case input_types.DROPDOWN:
                        attribute = {
                            key,
                            desc: effect[key]
                        }
                        input_field = <SelectEdit attribute={attribute}
                        />
                        content_el.push(input_field);
                        break;
                    case input_types.SELECTOR:
                        attribute = {
                            key,
                            desc: effect[key]
                        }
                        input_field = <FileEdit attribute={attribute}
                        />
                        content_el.push(input_field);
                        break;
                    case input_types.STRING:
                        attribute = {
                            key,
                            desc: effect[key]
                        }
                        input_field = <StringEdit attribute={attribute}
                        />
                        content_el.push(input_field);
                        break;
                    case undefined:
                        break;
                    default:
                        break;
                }

            });
            let section_name = effect.name.value;
            console.log(section_name);
            let section = (
                <div>
                    <h3 class="title">{section_name}</h3>
                    {content_el}
                    <hr></hr>
                </div>);

            all_effect_contents.push(section);
        })

        return (
            <>
                {all_effect_contents}
                <AddEffectButton></AddEffectButton>
            </>
        )

    };
}
const mapStateToProps = state => ({ reference_object: state.curr_effectstack });

export default connect(mapStateToProps, { edit_effect_stack })(EffectStackMenuItem);