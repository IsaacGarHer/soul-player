import React, { useState, useEffect, Fragment } from 'react'

const filterFiles = files => {
  for(let i = 0; i < files.length; i++ ){
    if( files[ i ].type.indexOf('audio') === -1 ){
      files.splice(i, 1)
      i-=1
    }
  }
  return files
}

const Testing = ( ) => {

  const [ music, setMusicList ] = useState([ ])
  const [ song, setSong ] = useState({
    URI: '',
    type: ''
  })

  const playSong = g => {
    setSong({
      URI: g.URI,
      type: g.type
    })

    setTimeout(( ) => {
      document.getElementById('long').play( )

      /*if( player !== undefined ){
        player.then(( ) => {
          player.play( )
        }).catch( err => {
          console.log(err)
        })
      }*/
    }, 300)
  }

  useEffect(( ) => {
    if (window.File && window.FileReader && window.FileList && window.Blob){
      //console.log('good')
      document.getElementById('filepicker').addEventListener('change', event => {
        //let target = event.target.files[ 0 ].path
        //let target = event.target.files[ 0 ].type
        //let output = document.getElementById('listing')
        let files = event.target.files

        files = Array.from( files )

        console.log( music )

        //console.log(target)

        files = filterFiles( files )

        for(let i = 0; i < files.length; i++){
          files[ i ].URI = URL.createObjectURL(files[ i ])
        }

        console.log(files)

        setMusicList( files )

        console.log( music )
      
        /*for (let i = 0; i < files.length; i++) {
          let item = document.createElement('li')
          item.innerHTML = files[ i ].webkitRelativePath
          output.appendChild(item)
        }*/
      }, false)
    }
    else
      alert('not func')
  })

  return(
    <div className = 'App'>
      <input
        type = 'file'
        id = 'files'
        name = 'files[ ]'
        accept = 'audio/*'
        webkitdirectory = ''
        multiple/>
        <br/>
        <br/>
      <input type="file" id="filepicker" name="fileList" webkitdirectory = 'C:/users/narut/Desktop/play/Music/' multiple />
      <ul id="listing"></ul>

      {/*<button onClick = { ( ) => setMusicList([...music, 3]) }></button>*/}
      { music.length > 0 ?
        music.map((m, i) => (
          <Fragment key = { i }>
            {/*<audio src = { m.URI } key = {i} controls></audio>*/}
            <button onClick = { ( ) => playSong( m ) }>{ m.name }</button>
            <br/>
          </Fragment>
        ))
        :
        null }
        <audio controls id = 'long' src = { song.URI }>
        </audio>
    </div>
  )
}

export default Testing