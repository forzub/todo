import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Style from './TTSectionMin.css';
import {serchSetFTitle, serchSetFDedline, serchSetFDone} from '../../store/searches'

const TTTaskFilter = () => {
  const dispatch = useDispatch();

  const filters = useSelector(state => state.searches.filters);
  const titleClassName = ['tl_title'];
  const dedlineClassName = ['tl_dedline'];
  const doneClassName = ['tl_done'];


  !filters.tf_title ? titleClassName.push('tf_after_def') : titleClassName.push('tf_after_down');
  !filters.tf_dedline ? dedlineClassName.push('tf_after_def') : dedlineClassName.push('tf_after_down');
  !filters.tf_done ? doneClassName.push('tf_after_def') : doneClassName.push('tf_after_down');

  const filterOnClickTitle = () => { dispatch( serchSetFTitle() ); }
  const filterOnClickDedline = () => { dispatch( serchSetFDedline() ); }
  const filterOnClickDone = () => { dispatch( serchSetFDone() ); }

  return (
    <>
      <div className="task_filter">
        <div onClick={filterOnClickTitle} className={ titleClassName.join(' ') }>Что надо сделать</div>
        <div onClick={filterOnClickDedline} className={ dedlineClassName.join(' ') }>Когда</div>
        <div onClick={filterOnClickDone} className={ doneClassName.join(' ') }>Сделано</div>
      </div>
    </>
  );
}

export default TTTaskFilter;