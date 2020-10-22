import React from 'react'
import { ROUTES } from '../../../global/jsx/'
import './index.sass'

import IconButton from '../icon-button'

import test_gray from '../../../resources/icons/test-gray.svg'
import test_white from '../../../resources/icons/test-white.svg'

const Sidebar = ({ windowChanger, window, setWindow, player_visibility, setPlayerVisibility }) => (
  <div className = 'sidebar'>
    <div className = 'nav'>
      { ROUTES ?
        ROUTES.map(( route, i ) => (
          <IconButton
            title = { route }
            action = {( ) => {
              setWindow( route )
              windowChanger( i )
            }}
            tab = '0'
            key = { i }
            icon = { window === route ? test_white : test_gray }
            alt = { route }/>
        ))
        :
        null }
    </div>
    <IconButton
      title = 'reproductor'
      action = {( ) => setPlayerVisibility( !player_visibility )}
      tab = '0'
      icon = { player_visibility ? test_white : test_gray }
      alt = 'player'/>
  </div>
)

export default Sidebar