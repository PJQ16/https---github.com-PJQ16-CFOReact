import React from 'react'
import NewNavbar from '../components/NewNavbar'
import Aside from '../components/Aside'
import NewContent from '../components/NewContent'
import NewFooter from '../components/NewFooter'

export default function NewTemplate() {
  return (
    <div className='app'>
<div id="app">
    <div className="main-wrapper" >
   <NewNavbar/>
   <Aside/>
   <div className="app-content">
    <NewContent/>
   </div>

   <NewFooter/>
   </div>
   </div>

    </div>
   
  )
}
