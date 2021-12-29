// todo
import { actions } from "./actions";
import clone from 'ramda/src/clone';

const initState = { lists: {}, service: { taskKey: null, listKey: null, doneValue: null } };

const includeListItem = (state, payload) => {
  const newState = clone(state);
  newState.lists[payload.id] = payload;
  return newState;
}

const taskDoneChange = (state, payload) => {
  const newState = clone(state);
 // console.log(payload)
  newState.lists[payload.listKey]['tasks'][payload.taskKey]['done'] = payload.doneValue;
  //console.log(newState.lists[payload.listKey]['tasks'][payload.taskKey]);
  return newState;
}



const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.SET_LISTS_ITEM       : return includeListItem(state, action.payload);
    case actions.LOAD_TOTAL_LIST      : return { ...state, lists: action.payload };
    case actions.ADD_ID_KEY           : return { ...state, idkey: action.payload };
    case actions.EDIT_LIST_TITUL      : return includeListItem(state, action.payload);
    case actions.REMOVE_LIST_ELEMENT  : return state;
    case actions.ADD_ID_CLICKED_KEY   : return { ...state, clickedKey: action.payload };
    case actions.SET_TASK_ITEM        : return action.payload;
    case actions.SET_SERVICE_DATA     : return { ...state, service: action.payload };
    case actions.TASK_DONE_CHANGE     : return taskDoneChange(state, action.payload);
    case actions.TASK_REMOVE          : return {...state, lists: action.payload}
    default: return state;
  }

};

export { reducer };
