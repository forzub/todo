import { todoTaskDoneGhange, todoTaskRemove, todoTaskEdit } from "./actions";
import { BASE_URL } from "../../utils";
import clone from 'ramda/src/clone';




export const todoTaskRemoveFromBase = () => (dispatch, getStore) => {
  const service = getStore().todo.service;
  const tasks = clone( getStore().todo.lists );

  delete tasks[service.listKey].tasks[service.taskKey];
  //
  // console.log(tasks)
  fetch(`${BASE_URL}list/${service.listKey}/tasks/${service.taskKey}.json`, { method: 'DELETE' })
      .then( dispatch( todoTaskRemove(tasks) ) )
      .catch(e => console.error(e));
}


export const todoTaskEditToBase = () => (dispatch, getStore) => {
  const service = getStore().todo.service;

  fetch(
      `${BASE_URL}list/${service.listKey}/tasks/${service.taskKey}.json`,
      { method: 'PATCH', body: JSON.stringify({ title: service.title, dedline: service.dedline }) })
      .then(dispatch(todoTaskEdit(service)))
  .catch(e => console.error(e));
}


export const todoTaskChanheChacket = () => (dispatch, getStore) => {
  const service = getStore().todo.service;

  fetch(`${BASE_URL}list/${service.listKey}/tasks/${service.taskKey}.json`,
      { method: 'PATCH', body: JSON.stringify({ done: service.doneValue }) })
      .then(dispatch(todoTaskDoneGhange(service)))
      .catch(e => console.error(e));

}