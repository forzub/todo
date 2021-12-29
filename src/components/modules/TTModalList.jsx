import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MyButton from "../base/MyButton";
import MyInput from "../base/MyInput";
import './TTSectionMin.css';
import { closeModalList, changeModalListInput } from '../../store/modalList';
import { chengeListDataInBase } from "../../store/todo";


const TTModalList = ({...props}) => {

  const modalList = useSelector(state => state.modalList.mdListValue );
  const dispatch = useDispatch();

  const closeModal = () => { 
    dispatch( closeModalList() );
    dispatch( changeModalListInput('') );
  }
  const changeInput = (e) => { dispatch( changeModalListInput(e.target.value) );}
  // const clickCancel = () => { dispatch( changeModalListInput('') );}

  const onDone = (e) => {
    e.preventDefault();
    dispatch( chengeListDataInBase() );
  }


  return (
    <>
      <div className="modalBk">
        <form  className="form_modal md_list" onSubmit={onDone} >
          <h4 className="titul">Изменить значение</h4>
          <MyButton type='button' className='btn md_btn md_bt_close' onClick={closeModal}>X</MyButton>
          <MyInput type='text' className='md_input' value={modalList} onChange={changeInput} {...props} />
        {/* <MyButton type='reset' className='btn md_btn' onClick={clickCancel} >Стереть все</MyButton> */}
          <MyButton type='submit' className='btn md_btn'>Засабмитеть</MyButton>
        </form>
      </div>
    </>
  );
}

export default TTModalList;