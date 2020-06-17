import React from "react"

import Button from 'react-bootstrap/Button'
import BounceLoader from 'react-spinners/BounceLoader'

function Loader() {
  return(
    <div className="load-main">
    <center>
      <BounceLoader className="loadSpinner"
        color="#0c46ab"
        size="40"
      />
      <p>Loading</p>
    </center>
    </div>
  )
}

export default Loader
