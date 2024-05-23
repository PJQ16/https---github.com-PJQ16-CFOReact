import React from 'react'
import './css/style.css'
let currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <div>
      
          <footer className="bg-body-white text-center" style={{ background: '#FFFFFF',marginTop:'auto' }}>
  <div className="container "></div>
  <div className="text-center p-4">
    <p className="text-body-white" >Copyright &copy; CMU {currentYear}</p>
  </div>
</footer>
    </div>
    
  )
}
