import { todoTaskDoneGhange, todoTaskRemove, todoTaskEdit } from "./actions";
import { BASE_URL } from "../../utils";
import clone from 'ramda/src/clone';




export const todoTaskRemoveFromBase = () => (dispatch, getState) => {
  const token = getState().auth.token.idToken;
  const service = getState().todo.service;
  const tasks = clone( getState().todo.lists );

  delete tasks[service.listKey].tasks[service.taskKey];

  fetch(`${BASE_URL}list/${service.listKey}/tasks/${service.taskKey}.json?auth=${token}`, { method: 'DELETE' })
      .then( dispatch( todoTaskRemove(tasks) ) )
      .catch(e => console.error(e));
}


export const todoTaskEditToBase = () => (dispatch, getState) => {
  const token = getState().auth.token.idToken;
  const service = getState().todo.service;

  fetch(
      `${BASE_URL}list/${service.listKey}/tasks/${service.taskKey}.json?auth=${token}`,
      { method: 'PATCH', body: JSON.stringify({ title: service.title, dedline: service.dedline }) })
      .then(dispatch(todoTaskEdit(service)))
  .catch(e => console.error(e));
}


export const todoTaskChanheChacket = () => (dispatch, getState) => {
  const token = getState().auth.token.idToken;
  const service = getState().todo.service;

  fetch(`${BASE_URL}list/${service.listKey}/tasks/${service.taskKey}.json?auth=${token}`,
      { method: 'PATCH', body: JSON.stringify({ done: service.doneValue }) })
      .then(dispatch(todoTaskDoneGhange(service)))
      .catch(e => console.error(e));

}