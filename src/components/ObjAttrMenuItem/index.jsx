import React from 'react';
import { connect } from 'react-redux';
import IntEdit from '../AttributeMenu/IntEdit';
// import './style.css';

const ObjAttrMenuItem = function (props) {
    const content_el = [];
    const content = Object.keys(props.reference_object).forEach(key => {
        const attribute = {
            key,
            desc: props.reference_object[key]
        }
        const input_field = <IntEdit attribute={attribute}
        />
        content_el.push(input_field);
        // content_el.push(<div> {key}</div>);
    });
    return (
        <div className="card">
            <header className="card-header">
                <p className="card-header-title">
                    {content_el}
                </p>
            </header>
            <div className="card-content">
                <div className="content ">

                </div>
            </div>
        </div>)
};
const mapStateToProps = state => ({ reference_object: state.curr_graphical_object });
export default connect(mapStateToProps, null)(ObjAttrMenuItem);