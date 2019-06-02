import * as types from '../actions/types';

export const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case types.EMPTY_SELECTION:
      // state.scene.add_graphical_object(action.payload);
      state.scene.set_curr_graphical_object();
      return state.scene.export_state();
    case types.PLAYING:
      return state.scene.export_state();
    case types.CREATE_OBJECT:
      // state.scene.add_graphical_object(action.payload);
      console.log(action.payload);
      state.scene.create_graphical_object(action.payload);
      return state.scene.export_state();
    case types.SELECT_OBJECT:
      return state.scene.export_state();
    case types.DELETE_OBJECT:
      state.scene.remove_graphical_object(action.payload);
      return state.scene.export_state();
    case types.SET_OBJECT:
      state.scene.set_curr_graphical_object(action.payload);
      return state.scene.export_state();
    case types.ADD_EFFECT:
      state.scene.add_effect(action.payload);
      return state.scene.export_state();
    case types.DELETE_EFFECT:
      state.scene.remove_effect(action.payload);
      return state.scene.export_state();
    case types.TOGGLE_EFFECT_BPS:
      state.scene.toggle_effect_bps();
      return state.scene.export_state();
    case types.TOGGLE_OBJ_BPS:
      state.scene.toggle_obj_bps();
      return state.scene.export_state();
    case types.ADD_EFFECT_STACK:
      state.scene.add_effectstack(action.payload);
      return state.scene.export_state();

    case types.DELETE_EFFECT_STACK:
      state.scene.remove_effectstack();
      return state.scene.export_state();

    case types.SET_EFFECT_STACK:
      state.scene.set_curr_effectstack(action.payload);
      return state.scene.export_state();

    case types.IMPORT_OBJECT_BP:
      state.scene.import_graphical_object_blueprint();
      return state.scene.export_state();

    case types.IMPORT_EFFECT_BP:
      state.scene.import_effect_blueprint();
      return state.scene.export_state();

    case types.ACTION_PLAYPAUSERESUME:
      state.scene.playpauseresume();
      return state.scene.export_state();

    case types.ACTION_REACH_TIME:
      state.scene.reachTo(action.payload);
      return state.scene.export_state();

    case types.ACTION_STOP:
      state.scene.stop();
      return state.scene.export_state();

    case types.EDIT_ATTRIBUTE:
      state.scene.edit_attr(action.payload);
      return state.scene.export_state();
      
    case types.EDIT_DURATION:
      state.scene.edit_duration(action.payload);
      return state.scene.export_state();

    default:
      console.log(state);
      return state;
  }
};
