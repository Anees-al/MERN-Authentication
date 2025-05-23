import React from 'react'
import {Route,Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
 import { ToastContainer} from 'react-toastify';


const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route  path='/'  element={<Home/>} />
        <Route path='/login'  element={<Login/>}/>
        <Route path='/emailverify'  element={<EmailVerify/>}/>
        <Route path ='/resetpassword'  element={<ResetPassword/>}/>
      </Routes>
    
    </div>
  )
}

export default App
