import { store } from '../store';

export const CompStrAndStore = (text) => {
  const myStore = store.getState().todo.lists;
  const keysArr =  Object.keys(myStore);

  for(let i = 0; i< keysArr.length; i++ ){
    if(myStore[keysArr[i]].path === text) { return true;}
  }
  return false;
}