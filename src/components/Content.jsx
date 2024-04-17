import React from 'react'

function Content(props) {
  return (
    <div className="col-lg-9 col-md-9  my-4 ">
        {props.children}
    </div>
  )
}

export default Content