import React, { useState } from 'react'
import PlayerContext from './Context'
import MusicDataConsumer from '../music-data-context/Consumer'

const PlayerDataProviderPreview = ({ children, music_data }) => {

  const [ is_playing, setIsPlaying ] = useState( false )
  const [ repeat, setRepeat ] = useState( 0 )
  const [ listening, setListening ] = useState( null )
  const [ player_visibility, setPlayerVisibility ] = useState( false )
  const [ listening_lyrics, setListeningLyrics ] = useState([ ])
  const [ listening_artists, setListeningArtists ] = useState([ ])
  const [ playlist, setPlaylist ] = useState([ ])
  const [ gradient_value, setGradientValue ] = useState( 0 )
  const [ time, setTime ] = useState( 0 )
  const [ playlist_visibility, setPlaylistVisibility ] = useState( false )
  const [ all_artists_visibility, setAllArtistsVisibility ] = useState( false )
  const [ mute, setMute ] = useState( false )
  const [ volume_value, setVolumeValue ] = useState( localStorage.getItem( 'volume' ) === null ? 100 : localStorage.getItem( 'volume' ) )

  const assigners = ( song, new_song ) => {
    let new_listening_artists = [ ]
    song.meta.artists.forEach( song_artist => {
      new_listening_artists.push( music_data.artists[ music_data.artists.findIndex( art => art.title === song_artist ) ] )
    })
    setListeningArtists( new_listening_artists )

    if ( new_song )
      setPlaylist([ song ])
    setIsPlaying( true )
    setListening( song )
  }

  const beforePlaying = ( song, new_song ) => {
    let lyrics_file_selected
    let parts_name = [ ]
    parts_name.push( song.name.split( '.mp3' )[ 0 ] )
    parts_name.push( 'lrc' )
    let lyric_name = parts_name.join( '.' )

    let lyrics_file = new FileReader( )
    
    lyrics_file.onload = e => {
      let content = e.target.result
      let new_lyrics = [ ]
      let jumps = 0, object_searched = '[00:00.00]'
      content = content.split( '\n' )
      for( let i = 0; i < content.length; i++ ){
        //let test = content[ i ].includes( object_searched )
        //console.log(test, object_searched, content[ i ])
        if( content[ i ].includes( object_searched ))
          break
        else
          jumps++
      }
      //console.log( jumps )
      content.splice( 0, jumps )
      //console.log( content )
      jumps = 0
      for( let i = content.length - 1; i >= 0; i-- ){
        if( !content[ i ].includes( '[' ) )
          jumps++
        else {
          content.splice( i + 1, jumps )
          break
        }
      }
      //console.log( 'aqui' )
      //console.log( content )
      for ( let i = 0; i < content.length; i++ ) {
        if ( content[ i ] !== undefined ) {
          if ( content[ i ].charAt( 0 ) === '[' ) {
            if ( content[ i ].length > 11 )
              new_lyrics.push({
                time: content[ i ].substring( 1, 9 ),
                text: content[ i ].substring( 11, content[ i ].length )
              })
            else
              new_lyrics.push({
                time: content[ i ].substring( 1, 9 ),
                text: ' '
              })
          } else {
            new_lyrics[ new_lyrics.length - 1 ].text += `\n${ content[ i ] }`
            content.splice( i, 1 )
            i--
          }
        }
      }
      new_lyrics.forEach( nl => {
        nl.time = Math.round(( Number( nl.time.substring( 3, 8 )) + Number( nl.time.substring( 0, 2 )) * 60 ) * 100 ) / 100
      })

      assigners( song, new_song )
      console.log( new_lyrics )
      setListeningLyrics( new_lyrics )
    }
    lyrics_file_selected = music_data.lyrics[ music_data.lyrics.findIndex( lyric => lyric.name === lyric_name )]
    if( lyrics_file_selected === undefined ){
      assigners( song, new_song )
      setListeningLyrics([
        {
          time: 0,
          text: "♫"
        }
      ])
    }else
      lyrics_file.readAsText( lyrics_file_selected )

  }

  const removeSong = song => {
    let i = playlist.findIndex( song_pls => song_pls.meta.title === song.meta.title )
    if ( i > -1 && listening.meta.title !== playlist[ i ].meta.title ) {
      playlist.splice( i, 1 )
      setPlaylist( playlist )
    }
  }

  const changeSong = next => {
    if ( playlist.length > 0 ) {
      let index = playlist.findIndex( song => song.meta.title === listening.meta.title )
      if ( index > -1 ) {
        if ( next ) {
          if ( index === playlist.length - 1 )
            beforePlaying( playlist[ 0 ], false )
          else
            beforePlaying( playlist[ index + 1 ], false )
        } else {
          console.log( index )
          if ( index === 0 )
            beforePlaying( playlist[ playlist.length - 1 ], false )
          else
            beforePlaying( playlist[ index - 1 ], false )
        }
      }
    }
  }

  const toTimeFormat = time => {
    let hours, minutes, seconds, result = ''
    if ( time > 3600 ){
      hours = Math.floor( time / 3600 )
      time = time % 3600
      result = `${ hours }:`
    } if ( time > 60 ){
      minutes = Math.floor( time / 60 )
      time = time % 60
      result = `${ result }${ minutes < 10 ? `0${ minutes }` : minutes }:`
    }
    seconds = Math.round( time )
    result = `${ result }${ minutes === undefined ? '00:' : '' }${ seconds < 10 ? `0${ seconds }` : seconds }`
    return result
  }

  const updateRangeValue = ( ct, duration ) => {
    document.getElementById( 'song-time-slider' ).value = ct * 100 / duration
    let position
    if ( listening_lyrics.length > 0 ) {
      for ( let i = 0; i < listening_lyrics.length; i++ ) {
        if (  ct >= listening_lyrics[ i ].time )
          position = i
        else
          break
      }
      document.getElementById( 'listening-lyrics' ).innerText = listening_lyrics[ position ].text
      document.getElementById( 'listening-lyrics-01' ).innerText = listening_lyrics[ position + 1 ] !== undefined ? listening_lyrics[ position + 1 ].text : ''
      document.getElementById( 'listening-lyrics-02' ).innerText = listening_lyrics[ position + 2 ] !== undefined ? listening_lyrics[ position + 2 ].text : ''
    }
    setGradientValue( Math.round(( ct * 100 / duration ) * 100 ) / 100 )
    setTime( toTimeFormat( ct ))
  }

  const updateAudioTime = ( target, duration, click ) => {
    document.getElementById( 'mp3-player' ).currentTime = target.value * duration / 100
    setGradientValue( target.value )
    setTime( toTimeFormat( target.value * duration / 100 ))
    if ( click )
      target.blur( )
  }

  const updateVolumeSong = ( target, click, change ) => {
    document.getElementById( 'mp3-player' ).volume = target.value / 100
    if( change )
      setVolumeValue( target.value )
    localStorage.setItem( 'volume', target.value )
    if( click )
      target.blur( )
  }

  const toEnd = ( ) => {
    setIsPlaying( false )
    if ( playlist.length > 0 ){
      let index = playlist.findIndex( song => song.name === listening.name )
      if ( repeat === 0 )
        if ( index < playlist.length - 1 )
          beforePlaying( playlist[ index + 1 ], false )
      if ( repeat === 1 ){
        if ( playlist.length === 1 ) {
          document.getElementById( 'mp3-player' ).play( )
          setIsPlaying( true )
        } else {
          if ( index < playlist.length - 1 )
            beforePlaying( playlist[ index + 1 ], false )
          else
            beforePlaying( playlist[ 0 ], false )
        }
      }
      if ( repeat === 2 ) {
        document.getElementById( 'mp3-player' ).play( )
        setIsPlaying( true )
      }
    }
  }

  const puaseMusic = ( ) => {
    document.getElementById( 'mp3-player' ).pause( )
    setIsPlaying( false )
  }

  const playMusic = ( ) => {
    document.getElementById( 'mp3-player' ).play( )
    setIsPlaying( true )
  }

  const getArtist = ( ) => listening_artists[ 0 ].URI

  const css = `
    #song-time-slider::-webkit-slider-runnable-track {
      background: linear-gradient( to right, #3739ed ${ gradient_value }%, #fff ${ gradient_value }% );
    }
    #volume-slider::-webkit-slider-runnable-track {
      background: linear-gradient( to right, #3739ed ${ volume_value }%, #fff ${ volume_value }% );
    }
  `

  const value = {
    listening: listening,
    player_visibility: player_visibility,
    listening_lyrics: listening_lyrics,
    listening_artists: listening_artists,
    playlist: playlist,
    is_playing: is_playing,
    repeat: repeat,
    gradient_value: gradient_value,
    time: time,
    playlist_visibility: playlist_visibility,
    all_artists_visibility: all_artists_visibility,
    mute: mute,
    volume_value: volume_value,
    css: css,
    setListening: setListening,
    setPlayerVisibility: setPlayerVisibility,
    setListeningLyrics: setListeningLyrics,
    setListeningArtists: setListeningArtists,
    setPlaylist: setPlaylist,
    setIsPlaying: setIsPlaying,
    setRepeat: setRepeat,
    setGradientValue: setGradientValue,
    setTime: setTime,
    setPlaylistVisibility: setPlaylistVisibility,
    setAllArtistsVisibility: setAllArtistsVisibility,
    setMute: setMute,
    setVolumeValue: setVolumeValue,
    updateVolumeSong: updateVolumeSong,
    beforePlaying: beforePlaying,
    removeSong: removeSong,
    toTimeFormat: toTimeFormat,
    changeSong: changeSong,
    updateRangeValue: updateRangeValue,
    updateAudioTime: updateAudioTime,
    toEnd: toEnd,
    puaseMusic: puaseMusic,
    playMusic: playMusic,
    getArtist: getArtist
  }

  return (
    <PlayerContext.Provider
      value = { value }>
        { children }
    </PlayerContext.Provider>
  )
}

const PlayerDataProvider = MusicDataConsumer( PlayerDataProviderPreview )

export default PlayerDataProvider