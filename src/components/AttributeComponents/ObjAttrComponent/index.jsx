import React from 'react';
import { connect } from 'react-redux';
import IntEdit from '../CustomComponents/IntEdit';
import { input_types } from '../../../lib/Scene';
import FloatEdit from '../CustomComponents/FloatEdit';
import StringEdit from '../CustomComponents/StringEdit';
import BooleanEdit from '../CustomComponents/BooleanEdit';
import SelectEdit from '../CustomComponents/SelectEdit';
import FileEdit from '../CustomComponents/FileEdit';
import TextAreaEdit from '../CustomComponents/TextAreaEdit';

const ObjAttrMenuItem = function (props) {
    const content_el = [];
    var attribute, input_field;
    const content = Object.keys(props.reference_object).forEach(key => {
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
            case input_types.TEXT_AREA:
                attribute = {
                    key,
                    desc: props.reference_object[key]
                }
                input_field = <TextAreaEdit attribute={attribute}
                />
                content_el.push(input_field);
                break;
            case undefined:
                break;
            default:
                break;

        }

        // content_el.push(<div> {key}</div>);
    });
    return (
        <> {content_el}</>

    )
};
const mapStateToProps = state => ({ reference_object: state.curr_graphical_object });
export default connect(mapStateToProps, null)(ObjAttrMenuItem);