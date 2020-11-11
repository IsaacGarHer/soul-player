import React from 'react'
import MusicDataContext from './Context'

const MusicDataConsumer = Component => pr => (
  <MusicDataContext.Consumer>
    { data => <Component { ...pr } data = { data }/> }
  </MusicDataContext.Consumer>
) 

export default MusicDataConsumer