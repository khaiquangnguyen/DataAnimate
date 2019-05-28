import { ADD_OBJECT, DELETE_OBJECT } from '../actions/types';

export const objectReducer = (state = {}, action) => {
  console.log(state);
  switch(action.type) {
    case ADD_OBJECT:
      state.scene.add_object(action.payload);
      return state.scene.export_state();
    default:
      console.log(state);
      return state;
  }
};

export const objectReducer2 = (state = {}, action) => {
  console.log(state);
  switch(action.type) {
    case ADD_OBJECT:
      state.scene.add_object(action.payload);
      return state.scene.export_state();
    default:
      console.log(state);
      return state;
  }
};

