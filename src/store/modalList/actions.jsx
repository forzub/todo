//modalList
const actions = Object.freeze(
    {
        CLOSE_MODAL_LIST : 'modallist/close',
        OPEN_MODAL_LIST : 'modallist/open',
        CHANGE_MODAL_INPUT : 'modallist/changeInput'
    }
);

const closeModalList = () => ({ type: actions.CLOSE_MODAL_LIST});
const openModalList = () => ({ type: actions.OPEN_MODAL_LIST});
const changeModalListInput = (payload) => ({type: actions.CHANGE_MODAL_INPUT, payload});



export {actions, closeModalList, openModalList, changeModalListInput};