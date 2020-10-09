import React from 'react'
import './index.sass'

import cancel from '../../../resources/icons/cancel-not-using-in-final-version.svg'

const IconButton = pr => (
  <div
    className = {`icon-button${ pr.className ? ` ${ pr.className }` : '' }`}>
    <img
      className = 'icon'
      src = { pr.icon ? pr.icon : cancel }
      alt = { pr.alt ? pr.alt : 'cancel' }/>
    <button
      title = { pr.title ? pr.title : 'Boton de Icono' }
      className = 'button'
      id = { pr.id ? pr.id : null }
      name = { pr.name ? pr.name : null }
      tabIndex = { pr.tab ? pr.tab : -1 }
      onClick = { e => {  
        pr.action ? pr.action( ) : console.log( 'image-button' )
        console.log( e )
        console.log( e.target )
        console.log( Object.create( e.target ) )
        e.target.blur( )
      }}/>
  </div>
)

export default IconButton