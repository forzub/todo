import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Login from './components/forms/Login';
import SignUp from './components/forms/SignUp';
import TTSection from './components/modules/TTSection';
import { loadListFromBase } from './store/todo';


function App() {
  const dispatch = useDispatch();

  const isSignIn = useSelector(store => store.auth.isSignIn);
  const isSignUp = useSelector(store => store.auth.isSignUp);
  console.log('isSignin', isSignIn);
  console.log('isSignUp', isSignUp);

  useEffect(
    () => { dispatch(loadListFromBase()); }, []
  );

  return (
    <div className="wrapper">
      <main className="main">
          {isSignIn ? <TTSection /> : 
          isSignUp ? <SignUp /> : <Login />}        
      </main>
    </div>
  );
}

export default App;
