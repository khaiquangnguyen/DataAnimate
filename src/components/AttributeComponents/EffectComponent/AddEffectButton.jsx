
import React from 'react';
import { connect } from 'react-redux';
// import './style.css';

import { addEffect } from "../../../actions/index";

class AddEffectButton extends React.Component {
  constructor(props) {
    super(props);
    this.bp_dict = {};
  }
  handleClick() {
  }
  render() {
    // 
    const options = [];
    console.log(this.props.blueprints);
    this.props.blueprints.forEach(bp => {
      this.bp_dict[bp.name] = bp;
      let option = <option value={bp.name}>{bp.name}</option>;

    });
    return (
      <div class="field has-addons">
        <div class="control is-expanded">
          <div class="select is-fullwidth">
            <select name="country">
              <option value="Argentina">Argentina</option>
              <option value="Bolivia">Bolivia</option>
              <option value="Brazil">Brazil</option>
              <option value="Chile">Chile</option>
              <option value="Colombia">Colombia</option>
              <option value="Ecuador">Ecuador</option>
              <option value="Guyana">Guyana</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Peru">Peru</option>
              <option value="Suriname">Suriname</option>
              <option value="Uruguay">Uruguay</option>
              <option value="Venezuela">Venezuela</option>
            </select>
          </div>
        </div>
        <div class="control">
          <button className="button is-dark" onClick={(e) => this.handleClick(e)}>
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