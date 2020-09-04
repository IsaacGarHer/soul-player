import React from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../../global/jsx/'
import './index.sass'

const Header = ( ) => {

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

  return (
    <div className = 'header'>
      { sections ?
        <ul className = 'sections'>
          { sections.map(( option, i ) => (
            <li key = { i } className = 'section.options'>
              <NavLink to = { option.route }>{ option.name }</NavLink>
            </li>
          )) }
        </ul>
        :
        null }
    </div>
  )
}

export default Header