import React from 'react'
import './index.sass'

const Card = pr => (
  <div
    className = { `card${ pr.class ? ` ${pr.class}` : '' }` }
    id = { pr.id ? pr.id : null }
    name = { pr.name ? pr.name : null }>
    { pr.img && pr.alt ?
      <img 
        className = 'cover-card'
        loading = 'lazy'
        src = { pr.img }
        alt = { pr.alt }/>
      :
      null }
    { pr.texts && pr.texts.length > 0 ?
      <div className = 'info-card'>
        { pr.texts.map(( text, i ) => (
          <span className = 'text-card' key = { i }>{ text }</span>
        ))}
      </div>
      :
      null }
    <button
      className = 'button-card'
      tabIndex = { pr.tab ? pr.tab : '-1' }
      onClick = { e => {
        pr.action ? pr.action( ) : console.log( 'card' )
        e.target.blur( )
      }}/>
  </div>
)

export default Card