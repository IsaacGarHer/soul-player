import React from 'react'
import MusicDataContext from './Context'

const MusicDataConsumer = Component => pr => (
  <MusicDataContext.Consumer>
    { music_data => <Component { ...pr } music_data = { music_data }/> }
  </MusicDataContext.Consumer>
) 

export default MusicDataConsumer