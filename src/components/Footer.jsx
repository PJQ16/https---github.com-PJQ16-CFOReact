import React from 'react'
import './css/style.css'
let currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <div>
      
          <footer className="bg-body-tertiary text-center" style={{ background: 'linear-gradient(90deg, rgba(31,31,37,1) 0%, rgba(61,62,80,1) 50%, rgba(103,117,134,1) 100%)',marginTop:'auto' }}>
  <div className="container "></div>
  <div className="text-center p-4">
    <p className="text-body-white" style={{color:'#ffffff'}}>Copyright &copy; CMU {currentYear}</p>
  </div>
</footer>
    </div>
    
  )
}
