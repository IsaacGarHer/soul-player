import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../../global/jsx/'
import './index.sass'

const Header = ( ) => {

  const [ secOptions, setSecOptions  ] = useState([
    'Canciones',
    'Artistas',
    'Albums',
    'Generos'
  ])

  return (
    <div className = 'header'>
      <NavLink to = { ROUTES.SONGS }>Canciones</NavLink>
      <NavLink to = { ROUTES.ARTIST }>Artistas</NavLink>
      <NavLink to = { ROUTES.ALBUMS }>Albums</NavLink>
      <NavLink to = { ROUTES.GENERS }>Generos</NavLink>
    </div>
  )
}

export default Header