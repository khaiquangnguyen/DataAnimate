import { combineReducers } from 'redux';
import { objectReducer } from "./objectReducer";

export default combineReducers({
  scene: (state={},action) => state,
  currentSomething: objectReducer,
  // currentObject,
  // currentEffectStack,
  // currentEffect,
  // sidebarSelection,
  // topBarSelection,
  // currentTime,
});