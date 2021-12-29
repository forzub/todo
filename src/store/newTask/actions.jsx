//newTask

const actions = Object.freeze(
  {
    SET_TASK_ITEM: 'newTask/set',
    SET_DISABLED : 'newTask/disabled',
    SET_UNDISABLED : 'newTask/undisabled',
    VISIBLE: 'newTask/visible',
    HIDDEN: 'newTask/hidden',
    TOGGLE: 'newTask/toggle',
  }
);

const setTaskItem = (payload) => ({ type: actions.SET_TASK_ITEM, payload });
const newTaskButtonDisabled = () => ({type: actions.SET_DISABLED});
const newTaskButtonUnDisabled = () => ({type: actions.SET_UNDISABLED});
const newTaskVisible = () => ({ type: actions.VISIBLE });
const newTaskHidden = () => ({ type: actions.HIDDEN });
const newTasktoggle = () => ({ type: actions.TOGGLE });


export { actions, setTaskItem, newTaskVisible, newTaskHidden, newTasktoggle, newTaskButtonDisabled, newTaskButtonUnDisabled };