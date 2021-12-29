//newTask

import { actions } from "./actions";


const initState = {
  task: {},
  visible: false,
  butDisabled: true,
  
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.SET_TASK_ITEM: return { ...state, task: {...action.payload}  };
    case actions.SET_DISABLED: return {...state, butDisabled: true}
    case actions.SET_UNDISABLED: return {...state, butDisabled: false}
    case actions.VISIBLE: return { ...state, visible: true, task:{} };
    case actions.HIDDEN: return { ...state, visible: false };
    case actions.TOGGLE: return { ...state, visible: !state.visible , task:{}};
    default: return state;
  }

};

export { reducer };
