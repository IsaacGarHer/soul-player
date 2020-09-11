import React from 'react'
import './index.sass'

const MainButton = pr => {
  return(
    <button
      className = { `main-button${ pr.class ? ` ${ pr.class }` : '' }` }
      id = { pr.id ? pr.id : null }
      name = { pr.name ? pr.name : null }
      onClick = { ( ) => pr.action ? pr.action( ) : console.log( 'main-button' ) }>{ pr.text ? pr.text : 'main-button' }</button>
  )
}

export default MainButton