import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { reducer as listReducer } from './newList';
import { reducer as taskReducer } from './newTask';
import { reducer as todoReducer } from './todo';
import { reducer as searchReducer } from './searches';
import { reducer as mdListReducer } from './modalList';


const rootReducer = combineReducers(
  {
    newlist: listReducer,
    todo : todoReducer,
    searches : searchReducer,
    modalList : mdListReducer,
    newTask : taskReducer,
  }
); 
const myMiddleware = applyMiddleware(thunk);

const devtool = composeWithDevTools(myMiddleware);

const store = createStore( rootReducer, devtool /*myMiddleware */ );

export { store };


