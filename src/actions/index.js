import {
  SELECT_OBJECT,
  DELETE_OBJECT,
  CREATE_OBJECT,
  ADD_EFFECT,
  DELETE_EFFECT,
  ADD_EFFECT_STACK,
  SET_EFFECT_STACK,
  DELETE_EFFECT_STACK,
  SET_OBJECT,
  EDIT_ATTRIBUTE,
  IMPORT_BLUEPRINT,
  IMPORT_EFFECT,
  EDIT_DURATION,
  SHOW_MORE_OBJECTS,
  SHOW_EFFECTS,
  EMPTY_SELECTION,
  ACTION_PAUSE,
  ACTION_PLAYPAUSERESUME,
  ACTION_REACH_TIME,
  ACTION_RESUME,
  ACTION_STOP,
  TOGGLE_EFFECT_BPS,
  TOGGLE_OBJ_BPS,
  PLAYING,
  EDIT_EFFECT_STACK,
  ADD_OBJECT
} from './types';

export const emptySelection = () => ({
  type: EMPTY_SELECTION,
  payload: null,
});

export const showMoreObjects = () => ({
  type: SHOW_MORE_OBJECTS,
  payload: null,
});
export const showEffects = () => ({
  type: SHOW_EFFECTS,
  payload: null,
});
export const editDuration = newDuration => ({
  type: EDIT_DURATION,
  payload: newDuration,
});

export const selectObject = graphicalObject => ({
  type: SELECT_OBJECT,
  payload: graphicalObject,
});

export const deleteObject = graphicalObject => ({
  type: DELETE_OBJECT,
  payload: graphicalObject,
});

export const createObject = blueprint => ({
  type: CREATE_OBJECT,
  payload: blueprint,
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


export const playpauseresume = () => ({
  type: ACTION_PLAYPAUSERESUME
});


export const stop = () => ({
  type: ACTION_STOP
})


export const reachTo = time => ({
  type: ACTION_REACH_TIME,
  payload: time
});

export const toggle_effect_bps = () => ({
  type: TOGGLE_EFFECT_BPS
});

export const toggle_ob_bps = () => ({
  type: TOGGLE_OBJ_BPS
});

export const playing = () => ({
  type: PLAYING
})

export const edit_effect_stack = (start_time, duration) => ({
  type: EDIT_EFFECT_STACK,
  payload: { start_time, duration }
})

export const addObject = (obj) => ({
  type: ADD_OBJECT,
  payload: obj
})