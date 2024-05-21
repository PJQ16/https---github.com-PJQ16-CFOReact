import React from 'react'

function Layout(props) {
  return (
    <div className="d-flex flex-wrap" style={{ backgroundImage: 'url("img/cover.jpeg")',backgroundSize: 'cover' }}
    >
        {props.children}
    </div>
  )
}

export default Layout