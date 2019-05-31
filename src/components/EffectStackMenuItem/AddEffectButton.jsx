
import React from 'react';
import { connect } from 'react-redux';
import IntEdit from '../AttributeMenu/IntEdit';
// import './style.css';
import BluePrintContainer from './BluePrintContainer'
class AddEffectButton extends React.Component {
    handleClick() {
      console.log('this is:', this);
    }
    render() {
      // This syntax ensures `this` is bound within handleClick
      return (
          <>
          <BluePrintContainer></BluePrintContainer>
        <button onClick={(e) => this.handleClick(e)}>
          Click me
        </button>
        </>
      );
    }
  }

  export default (AddEffectButton);  