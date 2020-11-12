import React from 'react'
import MusicDataContext from './Context'

import MainButton from '../../components/common/main-button'
import IconButton from '../../components/common/icon-button'

import './index.sass'

const MusicDataConsumer = Component => pr => (
  <MusicDataContext.Consumer>
    { music_data => <Component { ...pr } music_data = { music_data }/> }
  </MusicDataContext.Consumer>
)

const MusicDataUploader = ( ) => (
  <MusicDataContext.Consumer>
    { music_data =>
      <div
        className = { `uploader ${ music_data.visibility ? 'visible' : 'hidden' }` }>
        <div className = 'menu' >
          <div className = 'menu-head'>
            <span className = 'panel-title'>Carpetas</span>
            <IconButton
              action = {( ) => music_data.setVisibility( false )}/>
          </div>
          <div className = 'menu-main'>
            <div className = 'path-changer'>
              <span className = 'path-viewer'>{ music_data.songs_path === '' ? 'Carpeta de canciones' : music_data.songs_path }</span>
              <div className = 'input-path' tabIndex = '1' onKeyDown = { e => music_data.activeElement( e, 'songs-uploader' ) }>
                <MainButton
                  text = 'Elegir'/>
                <div className = 'focus-indicator'/>
                <input
                  id = 'songs-uploader'
                  type = 'file'
                  className = 'file-uploader'
                  webkitdirectory = 'true'
                  tabIndex = '-1'
                  onChange = { e => {
                    music_data.musicFilesUploader( e.target.files )
                    e.target.blur( )
                  }}/>
              </div>
            </div>
            <div className = 'path-changer'>
              <span className = 'path-viewer'>{ music_data.artists_path === '' ? 'Carpeta de artistas' : music_data.artists_path }</span>
              <div className = 'input-path' tabIndex = '2' onKeyDown = { e => music_data.activeElement( e, 'artists-uploader' ) }>
                <MainButton
                  text = 'Elegir'/>
                <div className = 'focus-indicator'/>
                <input
                  id = 'artists-uploader'
                  type = 'file'
                  className = 'file-uploader'
                  webkitdirectory = 'true'
                  tabIndex = '-1'
                  onChange = { e => {
                    music_data.artistsImagesUploader( e.target.files )
                    e.target.blur( )
                  }}/>
              </div>
            </div>
            <MainButton
              id = 'save-button'
              text = 'Guardar'
              action = { music_data.closePanel }
              tab = '3'/>
          </div>
        </div>
      </div>
    }
  </MusicDataContext.Consumer>
)

export { MusicDataUploader }
export default MusicDataConsumer