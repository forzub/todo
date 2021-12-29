import { store } from '../../store';
import Style from './TTSection.module.css';
import MyButton from '../base/MyButton';
import MyInput from '../base/MyInput';
import TTInputForm from './TTInputForm';
import TTListItem from './TTListItem';
import { useSelector, useDispatch } from 'react-redux';
import { setNewList, hidden, toggle, createNewList } from '../../store/newList';
import { searchListChangeValue } from '../../store/searches';
import { searchedList } from './TTUtils';
import { newTaskHidden } from '../../store/newTask';


const TTLists = () => {
  const dispatch = useDispatch();

  const lists = useSelector(state => state.todo.lists);
  const isVisibleNewList = useSelector(state => state.newlist.visible);
  const newListVal = useSelector(state => state.newlist.value);
  const searchValue = useSelector(state => state.searches.searchListValue);

  const onShow = () => { dispatch(toggle()); dispatch( newTaskHidden() ) }
  const onChangeNewList = (e) => { dispatch(setNewList(e.target.value)); }
  const onCancelNewList = () => { dispatch(hidden()); } 
  const renderList = searchedList(searchValue, lists);

  const onDoneNewList = () => {
    const newValue = store.getState().newlist.value.trim();
    if (newValue !== '') {
      dispatch(createNewList());
    }
    else {
      dispatch(setNewList(''));
      dispatch(hidden());
    }
  }

  const onChangeSearch = (e) => { dispatch(searchListChangeValue(e.target.value)); }
  const onClickSearch = () => { dispatch(searchListChangeValue('')); }

 

  return (
    <>
      <div className={Style.tt_left}>
        <div className={Style.tt_l_filter}>
          <MyInput
            className={Style.tt_l_input}
            type='text'
            placeholder='фильтровать'
            onChange={onChangeSearch}
            value={searchValue} />

          <MyButton
            type='button'
            className={`${Style.tt_xl_btn} + ${Style.tt_x_btn}`}
            onClick={onClickSearch}
          >
            x
          </MyButton>
        </div>
        <div className={Style.tt_l_monitor}>
          <ul className={Style.lists}>
            {Object.keys( renderList ).map(listId => (<TTListItem key={listId} {...renderList[listId]} listID={listId}></TTListItem>))}
          </ul>
        </div>
        <div className={Style.tt_l_control}>
          {isVisibleNewList &&
            <TTInputForm
              onChange={onChangeNewList}
              onDone={onDoneNewList}
              onCancel={onCancelNewList}
              placeholder='создать'
              value={newListVal}
            />}
          <MyButton
            type='button'
            className={`${Style.tt_l_btn} + ${Style.tt_btn}`}
            onClick={() => onShow()}
          >
            {!isVisibleNewList ? 'Добавить новый список' : 'Закрыть'}
          </MyButton>
        </div>
      </div>
    </>
  )
}

export default TTLists;