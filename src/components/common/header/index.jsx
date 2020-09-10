import React, { Fragment, useState, useEffect } from 'react'
import { ROUTES } from '../../../global/jsx/'
import './index.sass'

import search from '../../../resources/icons/search.svg'

import IconButton from '../icon-button'

const Header = ({ window, setWindow }) => {
  //space indicator
  const [ section, setSection ] = useState( window ? window : ROUTES[ 0 ] )

  const chgRoutes = route => {
    if( setWindow )
      setWindow( route )
    setSection( route )
  }

  return (
    <div className = 'header'>
      <div className = 'section-select'>
        <span className = 'space'>{ section }</span>
        { ROUTES ?
          <ul className = 'sections'>
            { ROUTES.map(( route, i ) => (
              route != section ?
              <li
                key = { i }
                className = 'section-options'
                onClick = { ( ) => chgRoutes( route ) } >{ route }</li>
              :
              <Fragment key = { i }/>
            )) }
          </ul>
          :
          null }
      </div>
      <div className = 'section-search'>
        <div className = 'search-bar'>
          <input type = 'text' name = 'input-search' className = 'input-search'/>
          <IconButton icon = { search } />
          {/*<div className = 'answers-container'>
            //div for future update
          </div>*/}
        </div>
      </div>
    </div>
  )
}

export default Header