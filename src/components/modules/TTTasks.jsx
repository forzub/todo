import React from 'react';
import Style from './TTSection.module.css';
import './TTSectionMin.css';
import clone from 'ramda/src/clone';
import isEmpty from 'ramda/src/isEmpty';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { newTasktoggle } from '../../store/newTask';
import { hidden } from '../../store/newList';
import { searchTaskChangeValue, searchTaskCheckChange } from '../../store/searches';
import TTTaskFormik from './TTTaskFormik';
import TTTaskList from './TTTaskList';
import MyButton from '../base/MyButton';
import MyInput from '../base/MyInput';
import { searchedList, sortByIncludeFields } from './TTUtils';
import TTTaskFilter from './TTTaskFilter';
import { serchResetFilter } from '../../store/searches';
import { Switch } from 'antd';


const TTTasks = () => {
  const dispatch = useDispatch();

  const isVisibleNewTask = useSelector(state => state.newTask.visible);
  const isTaskButDisabled = useSelector(state => state.newTask.butDisabled);
  const searchValue = useSelector(state => state.searches.searchTasksValue);
  const filterOnDone = useSelector(state => state.searches.onDone);
  const clickKey = useSelector(state => state.todo.clickedKey);
  const taskList = clone(useSelector(state => state.todo.lists[clickKey]));
  const filters = useSelector(state => state.searches.filters);

  const onChangeSearch = (e) => { dispatch(searchTaskChangeValue(e.target.value)); }
  const onClickSearch = () => { dispatch(searchTaskChangeValue('')); }
  const checkboxOnChange = () => { dispatch(searchTaskCheckChange()); }
  const onNewTaskShow = () => { dispatch(newTasktoggle()); dispatch(hidden()); }

  const onSwitchChange = (checked)=>{console.log(`switch to ${checked}`);}

  let render = {};

  if ((!!taskList) && ("tasks" in taskList)) {
    render = searchedList(searchValue, taskList.tasks, filterOnDone); // добавить переменные полей фильтрации (search, lists, checkbox = true)
    render = sortByIncludeFields(render, (filters.tf_title || filters.tf_dedline || filters.tf_done));
  }



  return (
    <>
      <div className={Style.tt_right}>
        <div className={Style.tt_r_filter}>
          <div className={`${Style.tt_r_group} ${Style.tt_filter_input}`}>
            <MyInput
              className={`${Style.tt_r_input}`}
              type='text'
              placeholder='фильтровать'
              onChange={onChangeSearch}
              value={searchValue}
            />
            <MyButton
              type='button'
              className={`${Style.tt_x_btn}`}
              onClick={onClickSearch}
            >x</MyButton>
          </div>
          <div className={`${Style.tt_r_group} ${Style.tt_filter_ck}`}>
            <MyInput
              id='input_chkbx'
              type='checkbox'
              checked={filterOnDone}
              onChange={checkboxOnChange}
            />
            <label htmlFor='input_chkbx'>Показывать выполненные</label>
          </div>
        </div>

        <TTTaskFilter />

        <div className={Style.tt_r_monitor}>
          <Routes>
            <Route path='/' element={<> <div className={Style.tt_r_mess}>Нет элементов для отображения</div> </>}  ></Route>
            <Route path='/:path'
              element={
                <>
                  {(isEmpty(render)) ?
                    <div className={Style.tt_r_mess}>Нет элементов для отображения</div> : (
                      <ul className='task_list'>
                        {Object.keys(render).map(listId => (
                          <TTTaskList
                            key={listId}
                            {...render[listId]}
                            idkey={listId}
                            clickkey={clickKey}>
                          </TTTaskList>
                        ))}
                      </ul>
                    )
                  }
                </>
              }

            ></Route>
          </Routes>
        </div>
        <div className={Style.tt_l_control}>
          {isVisibleNewTask && <TTTaskFormik />}
          <div className="button_box">
            <MyButton
              type='button'
              className={`${Style.tt_newtask_btn} ${Style.tt_btn}`}
              disabled={isTaskButDisabled && true}
              onClick={onNewTaskShow}
            >
              {!isVisibleNewTask ? 'Добавить новую задачу' : 'Закрыть'}
            </MyButton>
            <MyButton
              type='button'
              className={`${Style.tt_l_btn} ${Style.tt_btn}`}
              onClick={() => dispatch(serchResetFilter())}
            >Сброс сорт.</MyButton>
            <div className="switch_box">
              <Switch defaultChecked onChange={onSwitchChange} />
              <div className="switch-tx">Ночная тема</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TTTasks;