// todo
import { actions } from "./actions";


const initState = { isSignIn : false, isSignUp: false, idkey: '', servicekey: '' };

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.AUTH_SET_AUTH_IN_TRUE : return {...state, isSignIn: true};
    case actions.AUTH_OPEN_REGISTRATION : return {...state, isSignUp :true};
    case actions.AUTH_OPEN_LOGIN : return {...state, isSignUp :false};
    default: return state;
  }

};

export { reducer };
