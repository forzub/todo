//newList

import { BASE_URL } from "../../utils/constants";
import { CompStrAndStore, transliterate } from '../../utils';
import { setListsItem } from '../todo';


const actions = Object.freeze(
  {
    SET_NEW_LIST: 'newList/set',
    VISIBLE: 'newList/visible',
    HIDDEN: 'newList/hidden',
    TOGGLE: 'newList/toggle',
  }
);

const setNewList = (payload) => ({ type: actions.SET_NEW_LIST, payload });
const visible = () => ({ type: actions.VISIBLE });
const hidden = () => ({ type: actions.HIDDEN});
const toggle = () => ({ type: actions.TOGGLE });


const createNewList = () => (dispatch, getState) => {
  let newValue = getState().newlist.value.trim();
  let newPath = '/' + transliterate(newValue.toLowerCase().split(' ').join('-'));

  if( CompStrAndStore(newPath) ){ 
    const newDate = Date.now();
    newPath += '-' + newDate;
   } 

  const newItem =   { title: newValue, path: newPath, }

  dispatch( setNewList('') );
  dispatch( hidden() );

  fetch(`${BASE_URL}list.json`, { method: 'POST',  body: JSON.stringify(newItem), })
    .then(res => res.json())
    .then(data => {
      newItem.id = data.name;
      dispatch(setListsItem(newItem));
      const request = {method: 'PATCH',  body: JSON.stringify( {id : data.name} )};
      fetch(`${BASE_URL}list/${data.name}.json`, request).then().catch( e => console.error(e) );
    })
    .catch(e => console.error(e));
}



export { actions, setNewList, visible, hidden, toggle, createNewList };