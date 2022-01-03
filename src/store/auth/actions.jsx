// auth

const actions = Object.freeze(
    {
        AUTH_SET_AUTH_IN_TRUE: 'auth/set_auth_in_true',
        AUTH_OPEN_REGISTRATION: 'auth/open_registration',
        AUTH_OPEN_LOGIN: 'auth/open_login',
        AUTH_PUSH_USER_DATA: 'auth/push_user_data',
        AUTH_OPEN_ERROR_PAGE: 'auth/open_error_page'
    }
);

const authSetInTrue = (payload={ idToken: '', refreshToken: '' }) => ({ type: actions.AUTH_SET_AUTH_IN_TRUE, payload });
const authOpenRegistration = () => ({ type: actions.AUTH_OPEN_REGISTRATION });
const authOpenLogin = () => ({ type: actions.AUTH_OPEN_LOGIN });
const authPushUserData = (payload) => ({ type: actions.AUTH_PUSH_USER_DATA, payload }); // payload = user
const authOpenErrorPage = (payload) => ({ type: actions.AUTH_OPEN_ERROR_PAGE, payload });


export {
    actions,
    authSetInTrue,
    authOpenLogin,
    authOpenRegistration,
    authPushUserData,
    authOpenErrorPage
};