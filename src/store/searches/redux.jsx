//searches

import { actions } from "./actions";

const initState = { 
  searchListValue: '', 
  searchTasksValue : '', 
  onDone: false,
  filters : {tf_title : false, tf_dedline : false, tf_done : false}
 };

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.SEARCH_LIST_CHANGE_VALUE : return {...state, searchListValue: action.payload };
    case actions.SEARCH_TASK_CHANGE_VALUE : return {...state, searchTasksValue: action.payload };
    case actions.SEARCH_TASK_CHECK_CHANGE : return {...state,  onDone: !state.onDone };
    case actions.SET_FILTER_TITLE : return {...state, filters : { tf_title : actions.TF_TITLE, tf_dedline : false, tf_done : false } };
    case actions.SET_FILTER_DEDLINE : return {...state, filters : { tf_title: false, tf_dedline : actions.TF_DEDLINE, tf_done : false } };
    case actions.SET_FILTER_DONE : return {...state, filters : { tf_title: false, tf_dedline : false, tf_done : actions.TF_DONE } };
    case actions.RESET_FILTER : return {...state, filters : { tf_title: false, tf_dedline : false, tf_done : false } };
    default: return state;
  }

};

export { reducer };