import { authSetInTrue, authOpenErrorPage } from "./actions";


const API_KEY = 'AIzaSyBL4TrtzllJVoXPrkr9jsQ-2Dd9iIl4vVk';
const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:`;
const REFRESH_URL = `https://securetoken.googleapis.com/v1/token?key=`;
const SING_UP = 'signUp?key=';
const SING_IN = 'signInWithPassword?key=';


const authRefreshToken = () => (dispatch, getState) => {
  const refreshToken = getState().auth.token.refreshToken;
  const dataRequest = {
    method: 'POST',
    body: JSON.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    })
  };

  fetch(`${REFRESH_URL}${API_KEY}`, dataRequest)
    .then((res) => {

      if (!res.ok) {
        return res.json()
          .then((data) => {
            // console.log('[ERROR]', data);
            const errors = { code: data.error.code, message: data.error.message };
            dispatch(authOpenErrorPage(errors));
          });
      }
      return res.json();
    })
    .then(data => {
      const token = {
        idToken: data.id_token,
        refreshToken: data.refresh_token
      }

      dispatch(authSetInTrue(token));
      setTimeout(() => dispatch( authRefreshToken()), (+data.expires_in)*1000);
    })
    .catch(e => console.log(e));
}
//-------------------------------------------------------

const authRequestToBase = () => (dispatch, getState) => {
  const name = getState().auth.user.name;
  const password = getState().auth.user.password;

  const dataRequest = {
    method: 'POST',
    body: JSON.stringify({ email: name, password: password, returnSecureToken: true }),
    headers: { 'Content-Type': 'application/json', }
  };

  fetch(`${SIGNUP_URL}${SING_IN}${API_KEY}`, dataRequest)
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          //console.log('[ERROR]', data);
          const errors = { code: data.error.code, message: data.error.message };
          dispatch(authOpenErrorPage(errors));
        });
      }
      return res.json();
    })
    .then(data => {
      const token = {
        idToken: data.idToken,
        refreshToken: data.refreshToken
      }
      dispatch(authSetInTrue(token));
      setTimeout(() => dispatch( authRefreshToken()), (+data.expiresIn)*1000 );
    })
    .catch(e => console.log(e));

}


const authCreateAccountOnBase = () => (dispatch, getState) => {
  const name = getState().auth.user.name;
  const password = getState().auth.user.password;

  const dataRequest = {
    method: 'POST',
    body: JSON.stringify({ email: name, password: password, returnSecureToken: true }),
    headers: { 'Content-Type': 'application/json', }
  };

  fetch(`${SIGNUP_URL}${SING_UP}${API_KEY}`, dataRequest)
    .then((res) => {
      if (!res.ok) {
        return res.json()
          .then((data) => {
            const errors = { code: data.error.code, message: data.error.message };
            dispatch(authOpenErrorPage(errors));
          })
      }
      return res.json()
    })
    .then((data) => {
      const token = {
        idToken: data.idToken,
        refreshToken: data.refreshToken
      }
      dispatch(authSetInTrue(token));
      setTimeout(() => dispatch( authRefreshToken()), (+data.expiresIn)*1000 );
    });
}



export {
  authRequestToBase,
  authCreateAccountOnBase,
};