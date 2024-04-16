// import logo from './logo.ico';
import './App.css';
import Chat from './components/chat';
import SignInPage from './components/sign-in';
import SignUpPage from './components/sign-up';
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reduce from './components/reducers/reducer';
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import { Link,useNavigate } from 'react-router-dom';
import AssignUserData from './components/local_storage_function';




function App() {

  const user=useSelector(state=>state);

  return (
      <>
      <Router>
      
        <Routes> 
          <Route exact path='/' element={Object.keys(user).length!=0?<Chat />:<Navigate to="/sign-in" />} />
          <Route exact path='/sign-in' element={<SignInPage />} />
          <Route exact path='/sign-up' element={<SignUpPage />} />
          <Route path='*' element={<SignInPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
