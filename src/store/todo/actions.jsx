// todo
import clone from 'ramda/src/clone';
import { BASE_URL, transliterate, CompStrAndStore } from "../../utils";
import { closeModalList, changeModalListInput } from '../modalList';


const actions = Object.freeze(
    {
        SET_LISTS_ITEM: 'todo/setListsItem',
        LOAD_TOTAL_LIST: 'todo/loadTotalList',
        EDIT_LIST_TITUL: 'todo/editListElement',
        REMOVE_LIST_ELEMENT: 'todo/removeListElement',
        ADD_ID_KEY: 'todo/addKey',
        ADD_ID_CLICKED_KEY: 'todo/addClickedKey',
        SET_TASK_ITEM: 'todo/setTaskItem',
        SET_SERVICE_DATA: 'todo/setService',
        TASK_DONE_CHANGE: 'todo/taskDone_Change',
        TASK_REMOVE: 'todo/taskRemove',
        TASK_EDIT: 'todo/taskEdit',
    }
);

const setListsItem = (payload) => ({ type: actions.SET_LISTS_ITEM, payload });
const loadTotalList = (payload) => ({ type: actions.LOAD_TOTAL_LIST, payload });
const addIdKey = (payload) => ({ type: actions.ADD_ID_KEY, payload });
const addClickedKey = (payload) => ({ type: actions.ADD_ID_CLICKED_KEY, payload });
const editListsItem = (payload) => ({ type: actions.EDIT_LIST_TITUL, payload });
const includeTaskItem = (payload) => ({ type: actions.SET_TASK_ITEM, payload });
const todoSetService = (payload) => ({ type: actions.SET_SERVICE_DATA, payload });

const todoTaskDoneGhange = (payload) => ({ type: actions.TASK_DONE_CHANGE, payload });
const todoTaskRemove = (payload) => ({ type: actions.TASK_REMOVE, payload });
const todoTaskEdit = (payload) => ({ type: actions.TASK_EDIT, payload });


const loadListFromBase = () => (dispatch) => {
    fetch(`${BASE_URL}list.json`
    )
        .then(res => res.json())
        .then(data => {
            if (data !== null) { dispatch(loadTotalList(data)); }
        })
        .catch(e => console.error(e));
}


const removeListFromBase = () => (dispatch, getStore) => {
    const idKey = getStore().todo.idkey;
    const cloneList = clone(getStore().todo.lists);
    delete cloneList[idKey];

    fetch(`${BASE_URL}list/${idKey}.json`, { method: 'DELETE' })
        .then(dispatch(loadTotalList(cloneList)))
        .catch(e => console.error(e));
}

//------------------------------------------------------------

const setTaskItemToBase = () => (dispatch, getState) => {
    const newState = clone(getState().todo);
    const newTask = getState().newTask.task;
    const key = newState.clickedKey;
    const newkey = '' + Date.now();

    newState.lists[key].tasks = { ...newState.lists[key].tasks, [newkey]: newTask }
    const editable = { [newkey]: { ...newTask } };

    fetch(`${BASE_URL}list/${key}/tasks.json`, { method: 'PATCH', body: JSON.stringify(editable), })
        .then(() => dispatch(includeTaskItem(newState)))
        .catch(e => console.error(e));

}


const chengeListDataInBase = () => (dispatch, getStore) => {
    const idKey = getStore().todo.idkey;
    const newValue = getStore().modalList.mdListValue.trim();
    let newPath = '/' + transliterate(newValue.toLowerCase().split(' ').join('-'));

    if (CompStrAndStore(newPath)) {
        const newDate = Date.now();
        newPath += '-' + newDate;
    }

    const editable = { id: idKey, path: newPath, title: newValue }

    fetch(`${BASE_URL}list/${idKey}.json`, { method: 'PATCH', body: JSON.stringify(editable), })
        .then(() => {
            dispatch(changeModalListInput(''));
            dispatch(closeModalList());
            dispatch(editListsItem(editable));
        })
        .catch(e => console.error(e));

    // console.log(workStore);
    // console.log(editable);

}
//************* */






export {
    actions,
    setListsItem,
    addIdKey,
    loadListFromBase,
    removeListFromBase,
    chengeListDataInBase,
    setTaskItemToBase,
    addClickedKey,
    includeTaskItem,

    todoSetService,
    todoTaskDoneGhange,
    todoTaskRemove,
    todoTaskEdit
};