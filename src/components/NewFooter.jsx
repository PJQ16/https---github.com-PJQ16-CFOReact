import React from 'react'

export default function NewFooter() {
    let currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
    <div className="text-center">
        Copyright &copy; CMU {currentYear}<a href="#"></a>
    </div>
</footer>
  )
}
