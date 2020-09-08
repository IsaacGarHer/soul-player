import React, { Fragment, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../../global/jsx/'
import './index.sass'

import IconButton from '../icon-button'

const Header = ( ) => {
  //space indicator
  const [ space, setSpace ] = useState( 'Canciones' )

  const sections = [
    {
      name: 'Canciones',
      route: ROUTES.SONGS
    },
    {
      name: 'Artistas',
      route: ROUTES.ARTIST
    },
    {
      name: 'Albums',
      route: ROUTES.ALBUMS
    },
    {
      name: 'Generos',
      route: ROUTES.GENERS
    }
  ]

  //commented option to fix error when updating the URL
  /*useLayoutEffect(( ) => {
    setSpace( window.location.pathname )
  })*/

  /*{ sections.map(( sec, i ) => (
    <Fragment key = { i }>{ sec.route === space ? sec.name : null }</Fragment>
  ))}*/

  return (
    <div className = 'header'>
      <div className = 'section-select'>
        <span className = 'space'>{ space }</span>
        { sections ?
          <ul className = 'sections'>
            { sections.map(( option, i ) => (
              option.name === space ?
              <Fragment key = { i }/>
              :
              <li key = { i } className = 'section-options'>
                <NavLink to = { option.route } onClick = { ( ) => setSpace( option.name ) }>{ option.name }</NavLink>
              </li>
            )) }
          </ul>
          :
          null }
      </div>
      <div className = 'section-search'>
        <div className = 'search-bar'>
          <input type = 'text' name = 'input-search' className = 'input-search'/>
          <IconButton/>
        </div>
      </div>
    </div>
  )
}

export default Header