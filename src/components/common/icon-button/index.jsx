import React from 'react'
import './index.sass'

import cancel from '../../../resources/icons/cancel-not-using-in-final-version.svg'

const IconButton = pr => (
  <button
    className = {`icon-button${ pr.className ? ` ${pr.className}` : '' }`}
    onClick = { ( ) => pr.action ? pr.action : console.log( 'image-button' ) }
    id = { pr.id ? pr.id : null }
    name = { pr.name ? pr.name : null }>
    <img
      className = 'icon'
      src = { pr.icon ? pr.icon : cancel }
      alt = { pr.alt ? pr.alt : 'cancel' }/>
  </button>
)

export default IconButton