import React from 'react';
import { connect } from 'react-redux';

// import './style.css';

const ObjAttrMenuItem = function (props) {
    const content_el = [];
    console.log(props.reference_object);
    const content = Object.keys(props.reference_object).forEach(key => {
        content_el.push(<div> {key}</div>);
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