
import React from 'react';
import { connect } from 'react-redux';
import { toggle_effect_bps } from "../../actions/index";
// import './style.css';
import BluePrintContainer from './BluePrintContainer';
class AddEffectButton extends React.Component {
  handleClick() {
    console.log(this.props);
    this.props.toggle_effect_bps();
  }
  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <>
        <button onClick={(e) => this.handleClick(e)}>
          Add Effect
        </button>
      </>
    );
  }
}

export default connect(null, { toggle_effect_bps })(AddEffectButton);  