import React, { useState } from 'react'
import './index.sass'

import ContextMenu from '../context-menu'

import test_gray from '../../../resources/icons/test-gray.svg'

const Card = ({ cpn_class, cpn_id, cpn_name, image, alt, info, tab, action, topics }) => {
  
  const [ visible_cxm, setVisibleCXM ] = useState( false )

  return (
    <div
      className = { `card${ cpn_class ? ` ${cpn_class}` : '' }` }
      id = { cpn_id ? cpn_id : null }
      name = { cpn_name ? cpn_name : null }>
        { image && alt ?
          <img 
            className = 'cover-crd'
            loading = 'lazy'
            src = { image }
            alt = { alt }/>
          :
          null }
        { info && info.length > 0 ?
          <div className = 'info-crd'>
            { info.map(( text, i ) => (
              <span
                className = 'text-crd'
                key = { i }>{ text }</span>
            ))}
          </div>
          :
          null }
        <button
          className = 'selection-btn-crd'
          tabIndex = { tab ? tab : '-1' }
          onClick = { e => {
            action ? action( ) : console.log( 'card' )
            e.target.blur( )
          }}/>
        <button
          className = 'context-menu-btn-crd'
          tabIndex = { tab ? tab : '-1' }
          title = 'opciones'
          onClick = { e => {
            e.target.blur( )
            setVisibleCXM( !visible_cxm )
          }}>
            <img
              className = 'context-menu-icon-crd'
              src = { test_gray }
              alt = 'abrir menu contextual'/>
        </button>
        <ContextMenu
          cpn_class = { `${ visible_cxm ? 'visible' : 'hidden' }` }
          topics = { topics }
          setVisibleCXM = { setVisibleCXM }/>
    </div>
  )
}

export default Card