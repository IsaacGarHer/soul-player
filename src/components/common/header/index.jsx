import React, { Fragment, useState, useEffect } from 'react'
import { ROUTES } from '../../../global/jsx/'
import './index.sass'

import search from '../../../resources/icons/search.svg'

import IconButton from '../icon-button'

const Header = ( ) => {
  //space indicator
  const [ space, setSpace ] = useState( 'Player' )

  const sections = [
    {
      name: 'Player',
      route: ROUTES.HOME
    },
    {
      name: 'Canciones',
      route: ROUTES.SONGS
    },
    {
      name: 'Artistas',
      route: ROUTES.ARTISTS
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

  useEffect(( ) => {
    sections.forEach( sec => {
      if( sec.route === window.location.pathname )
        setSpace( sec.name )
    })
  })

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
              <li key = { i } className = 'section-options'>{ option.name }</li>
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