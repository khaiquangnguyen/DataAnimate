import {
  ADD_OBJECT,
  DELETE_OBJECT,
  ADD_EFFECT,
  DELETE_EFFECT,
  ADD_EFFECT_STACK,
  SET_EFFECT_STACK,
  DELETE_EFFECT_STACK,
  SET_OBJECT,
  EDIT_ATTRIBUTE,
  IMPORT_BLUEPRINT,
  IMPORT_EFFECT,
  SET_CURRENT_TIME,
} from './types';

export const addObject = graphicalObject => ({
  type: ADD_OBJECT,
  payload: graphicalObject,
});

export const deleteObject = graphicalObject => ({
  type: DELETE_OBJECT,
  payload: graphicalObject,
});

export const setObject = graphicalObject => ({
  type: SET_OBJECT,
  payload: graphicalObject,
});

export const addEffect = animationEffect => ({
  type: ADD_EFFECT,
  payload: animationEffect,
});

export const deleteEffect = animationEffect => ({
  type: DELETE_EFFECT,
  payload: animationEffect,
});

export const addEffectStack = effectStack => ({
  type: ADD_EFFECT_STACK,
  payload: effectStack,
});

export const deleteEffectStack = effectStack => ({
  type: DELETE_EFFECT_STACK,
  payload: effectStack,
});


export const setEffectStack = effectStack => ({
  type: SET_EFFECT_STACK,
  payload: effectStack,
});

// export const selectObject = graphicalObject => ({
//   type: SELECT_OBJECT,
//   payload: graphicalObject,
// });

export const editAttribute = (attribute, value) => ({
  type: EDIT_ATTRIBUTE,
  payload: {
    attribute,
    value,
  }
});

export const importBlueprint = jsFile => ({
  type: IMPORT_BLUEPRINT,
  payload: jsFile,
});

export const importEffect = jsFile => ({
  type: IMPORT_EFFECT,
  payload: jsFile,
});

export const setCurrentTime = time => ({
  type: SET_CURRENT_TIME,
  payload: time,
});