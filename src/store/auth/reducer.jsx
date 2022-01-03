// todo
import { actions } from "./actions";


const initState = {
  isSignIn: false,
  isSignUp: false,
  isError: false,
  errors: {},
  user: { name: '', password: '' },
  token: { idToken: '', refreshToken: ''}
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.AUTH_SET_AUTH_IN_TRUE: return { ...state, isSignUp: false,  isError: false, isSignIn: true, user: { name: '', password: '' }, token: action.payload };
    case actions.AUTH_OPEN_REGISTRATION: return { ...state, isSignUp: true, isError: false };
    case actions.AUTH_OPEN_LOGIN: return { ...state, isSignUp: false, isError: false };
    case actions.AUTH_PUSH_USER_DATA: return { ...state, user: action.payload };
    case actions.AUTH_OPEN_ERROR_PAGE: return { ...state, isError: true, isSignIn: false, errors: action.payload };
    default: return state;
  }

};

export { reducer };
