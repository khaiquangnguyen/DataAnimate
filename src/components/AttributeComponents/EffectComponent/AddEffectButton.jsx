
import React from 'react';
import { connect } from 'react-redux';
// import './style.css';

import { addEffect } from "../../../actions/index";

class AddEffectButton extends React.Component {
  constructor(props) {
    super(props);
    this.current_bp = null;
    this.bp_dict = {};
  }

  handleClick(e) {
    console.log(this.current_bp);
    this.props.addEffect(this.current_bp);
  }
  select(e) {
    this.current_bp = this.bp_dict[e.target.value];
  }

  render() {
    // 
    const options = [];
    console.log(this.props.blueprints);
    this.props.blueprints.forEach(bp => {
      this.bp_dict[bp.name] = bp;
      let option = <option value={bp.name}>{bp.name}</option>;
      options.push(option);
    });
    this.current_bp = this.bp_dict[Object.keys(this.bp_dict)[0]];
    return (
      <div class="field has-addons">
        <div class="control is-expanded">
          <div class="select is-fullwidth">
            <select name="effect" onChange={(e) => this.select(e)}>
              {options};
            </select>
          </div>
        </div>
        <div class="control">
          <button type='submit' className="button is-dark" onClick={(e) => this.handleClick(e)}>
            <span class="icon is-small">
              <i class={"fas fa-plus"} ></i>
            </span>

          </button>
        </div>
      </div>


    );
  }
}

const mapStateToProps = state => ({ blueprints: state.effect_blueprints });
export default connect(mapStateToProps, { addEffect })(AddEffectButton);  