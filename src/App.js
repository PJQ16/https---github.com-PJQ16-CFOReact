import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ActivityData from './pages/ActivityData'
import ActivityDetail from './pages/ActivityDetail'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { UserDataProvider } from './components/MyContext'
import NotFound from './pages/NotFound'
import './index.css'
import ForgotPassword from './pages/ForgotPassword'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <UserDataProvider>
   <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/' element={<Home/>}/>
    <Route path='/activitydata' element={<ActivityData/>}/>
    <Route path='/activityDetail/:campus_id/:fac_id/:years/:id' element={<ActivityDetail />} />
    <Route path='/forgot-password' element={<ForgotPassword />} />
    <Route path='*' element={<NotFound/>} />
   </Routes>
   </UserDataProvider>
  )
}

export default App