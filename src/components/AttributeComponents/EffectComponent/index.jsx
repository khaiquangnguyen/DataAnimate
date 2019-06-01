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

const EffectStackMenuItem = function (props) {
    const content_el = [];
    var attribute, input_field;
    Object.keys(props.reference_object).forEach(key => {
        switch (props.reference_object[key]['type']) {
            case input_types.INT:
                attribute = {
                    key,
                    desc: props.reference_object[key]
                }
                input_field = <IntEdit attribute={attribute}
                />
                content_el.push(input_field);
                break;
            case input_types.FLOAT:
                attribute = {
                    key,
                    desc: props.reference_object[key]
                }
                input_field = <FloatEdit attribute={attribute}
                />
                content_el.push(input_field);
                break;
            case input_types.BOOLEAN:
                attribute = {
                    key,
                    desc: props.reference_object[key]
                }
                input_field = <BooleanEdit attribute={attribute}
                />
                content_el.push(input_field);
                break;
            case input_types.DROPDOWN:
                attribute = {
                    key,
                    desc: props.reference_object[key]
                }
                input_field = <SelectEdit attribute={attribute}
                />
                content_el.push(input_field);
                break;
            case input_types.SELECTOR:
                attribute = {
                    key,
                    desc: props.reference_object[key]
                }
                input_field = <FileEdit attribute={attribute}
                />
                content_el.push(input_field);
                break;
            case input_types.STRING:
                attribute = {
                    key,
                    desc: props.reference_object[key]
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
    return (
        <>
            {content_el}
            <AddEffectButton></AddEffectButton>
        </>
    )

};
const mapStateToProps = state => ({ reference_object: state.curr_effectstack });
export default connect(mapStateToProps, null)(EffectStackMenuItem);