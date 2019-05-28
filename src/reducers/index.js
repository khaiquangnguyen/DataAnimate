import * as types from '../actions/types';


export const rootReducer = (state = {}, action) => {
  console.log(state);
  switch (action.type) {
    case types.ADD_OBJECT:
      state.scene.add_graphical_object(action.payload);
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
    
    case types.ACTION_PAUSE:
      state.scene.pause();
      return state.scene.export_state();

    case types.ACTION_PLAY:
      state.scene.play(action.payload);
      return state.scene.export_state();

    case types.ACTION_RESUME:
      state.scene.resume();
      return state.scene.export_state();

    case types.ACTION_REACH_TIME:
      state.scene.reachTo(action.payload);
      return state.scene.export_state();

    case types.ACTION_STOP:
      state.scene.stop();
      return state.scene.export_state();

    default:
      console.log(state);
      return state;
  }
};

