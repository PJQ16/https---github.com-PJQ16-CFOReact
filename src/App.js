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


function App() {
  return (
    <UserDataProvider>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/activitydata' element={<ActivityData/>}/>
    <Route path='/activityDetail/:fac_id/:years/:id' element={<ActivityDetail />} />
    <Route path='*' element={<NotFound/>} />
   </Routes>
   </UserDataProvider>
  )
}

export default App