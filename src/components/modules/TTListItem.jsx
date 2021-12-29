import React, { } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Style from '../modules/TTSection.module.css';
import MyButton from '../base/MyButton';
import { useDispatch } from 'react-redux';
import { addClickedKey, addIdKey, removeListFromBase } from '../../store/todo';
import { store } from '../../store';
import { openModalList, changeModalListInput } from '../../store/modalList';
import { newTaskButtonUnDisabled } from '../../store/newTask';



function TTListItem({ title, path, children, listID }) {

  
  const dispatch = useDispatch();
  const className = [Style.ttl_list_item];
  const { pathname } = useLocation();

  

  const isActive = pathname === path;
  if (isActive) { 
    if(store.getState().newTask.butDisabled){ 
      dispatch( newTaskButtonUnDisabled() );
    }
    className.push('ll_active'); 
    dispatch( addClickedKey(listID) );
   
  }


  const onClickEdit = (e) => {
    const idkey = e.target.getAttribute('listid');
    dispatch(addIdKey(idkey));
    dispatch(openModalList());
    const editable = store.getState().todo.lists[idkey]['title'];
    dispatch(changeModalListInput(editable));
  }
  
  const onClickRemove = (e) => {
    dispatch(addIdKey(e.target.getAttribute('listid')));
    dispatch(removeListFromBase());
  }

  return (
    
      <li className={className.join(' ')}>{

        children ? children : (<>
          <NavLink  to={`${path}`} className={Style.lst_link}>{title}</NavLink>
          <MyButton listid={listID} className={Style.lst_btn} onClick={onClickEdit}>E</MyButton>
          <MyButton listid={listID} className={Style.lst_btn} onClick={onClickRemove}>X</MyButton>
          </>
        )
      }</li>

    
  );
}

export default TTListItem;