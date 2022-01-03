import { useSelector } from 'react-redux';
import './App.css';
import ErrorPage from './components/forms/ErrorPage';
import Login from './components/forms/Login';
import SignUp from './components/forms/SignUp';
import TTSection from './components/modules/TTSection';



function App() {

  const isSignIn = useSelector(store => store.auth.isSignIn);
  const isSignUp = useSelector(store => store.auth.isSignUp);
  const isError = useSelector(store => store.auth.isError);
  // console.log('isSignin', isSignIn);
  // console.log('isSignUp', isSignUp);

  

  return (
    <div className="wrapper">
      <main className="main">
          {isSignIn ? <TTSection /> : 
          isError ? <ErrorPage /> :
          isSignUp ? <SignUp /> : <Login />}        
      </main>
    </div>
  );
}

export default App;
