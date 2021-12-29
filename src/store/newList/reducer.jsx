//newList

import { actions } from "./actions";


const initState = {
  value: '',
  visible: false
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.SET_NEW_LIST: return { ...state, value: action.payload };
    case actions.VISIBLE: return { ...state, visible: true };
    case actions.HIDDEN: return { ...state, visible: false, value: '' };
    case actions.TOGGLE: return { ...state, visible: !state.visible };
    default: return state;
  }

};

export { reducer };
