//modalList

import { actions } from "./actions";


const initState = { modalList: { mdListValue: '', isShowForm: false} };


const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.CLOSE_MODAL_LIST : return {...state, isShowForm : false };
    case actions.OPEN_MODAL_LIST : return {...state, isShowForm : true };
    case actions.CHANGE_MODAL_INPUT : return {...state, mdListValue : action.payload };
    default: return state;
  }

};

export { reducer };
