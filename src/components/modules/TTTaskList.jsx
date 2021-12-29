import React from "react";
import Style from '../modules/TTSection.module.css';
import MyButton from '../base/MyButton';
import { useDispatch } from 'react-redux';
import { todoSetService, todoTaskChanheChacket, todoTaskRemoveFromBase } from "../../store/todo";


const TTTaskList = ({ begin, title, dedline, done, children, idkey, clickkey }) => {

  const dispatch = useDispatch();

  
  // console.log(begin, title, dedline, done, children, idkey, clickkey)

  const onClickEdit = (e) => { 
    const service = {
      taskKey: e.target.getAttribute('listid'),
      listKey: e.target.getAttribute('clickkey'),
      doneValue: null
    };
    dispatch( todoSetService(service));

  }

  const onClickRemove = (e) => { 
    const service = {
      taskKey: e.target.getAttribute('listid'),
      listKey: e.target.getAttribute('clickkey'),
      doneValue: null
    };
    dispatch( todoSetService(service));
    dispatch ( todoTaskRemoveFromBase() ); 
   }

  const onChangeDone = (e) => {
    const service = {
      taskKey: e.target.getAttribute('listid'),
      listKey: e.target.getAttribute('clickkey'),
      doneValue: e.target.checked
    };
    dispatch( todoSetService(service));
    dispatch( todoTaskChanheChacket() ); 
  }

  return (
    <>
      <li className='tl_item' key={idkey}>{
        children ? children : (<>
          <div className="tl_begin">{begin}</div>
          <div className="tl_title">
            {/* <span className="tl_title_tx">{title}</span> */}
            {title}
          </div>
          <div className="tl_dedline">{dedline}</div>
          <div className="tl_done">
            <input
              type="checkbox"
              checked={done}
              listid={idkey}
              clickkey={clickkey}
              onChange={onChangeDone}
            />
            <span>
              {/* <MyButton listid={idkey} clickkey={clickkey} className={Style.lst_btn} onClick={onClickEdit}>E</MyButton> */}
              <MyButton listid={idkey} clickkey={clickkey} className={Style.lst_btn} onClick={onClickRemove}>X</MyButton>
            </span>
          </div>
        </>)
      }</li>
    </>
  )
}

export default TTTaskList;