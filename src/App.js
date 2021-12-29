import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import TTSection from './components/modules/TTSection';
import { loadListFromBase } from './store/todo';


function App() {
  const dispatch = useDispatch();

  useEffect(
    () => { dispatch(loadListFromBase()); }, []
  );

  return (
    <div className="wrapper">
      <main className="main">
        <Routes>
          {/* <Route path='/' element={<Navigate to='/home' />} ></Route>
          <Route path='/home' element={<TTSection />}  ></Route> */}

        </Routes>
        <TTSection />
      </main>
    </div>
  );
}

export default App;
