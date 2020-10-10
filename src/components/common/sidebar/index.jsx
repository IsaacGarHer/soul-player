import React from 'react'
import { ROUTES } from '../../../global/jsx/'
import './index.sass'

import IconButton from '../icon-button'

import test_gray from '../../../resources/icons/test-gray.svg'
import test_white from '../../../resources/icons/test-white.svg'

const Sidebar = ({ windowChanger, window, setWindow }) => (
  <div className = 'sidebar'>
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
)

export default Sidebar