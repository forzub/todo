// auth
//import { BASE_URL} from "../../utils";


const actions = Object.freeze(
    {   
        AUTH_SET_AUTH_IN_TRUE : 'auth/set_auth_in_true',
        AUTH_OPEN_REGISTRATION: 'auth/open_registration',
        AUTH_OPEN_LOGIN: 'auth/open_login',
    }
);

const authSetInTrue = () => ( {type: actions.AUTH_SET_AUTH_IN_TRUE} );
const authOpenRegistration = () => ( {type: actions.AUTH_OPEN_REGISTRATION} );
const authOpenLogin = () => ( {type: actions.AUTH_OPEN_LOGIN} );


const authRequestToBase = () => (dispatch) => {
    dispatch( authSetInTrue() );
}

export {
    actions,
    authSetInTrue,
    authRequestToBase,
    authOpenLogin,
    authOpenRegistration,

};