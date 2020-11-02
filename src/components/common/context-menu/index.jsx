import React, { Fragment } from 'react'
import './index.sass'

const ContextMenu = ({ cpn_class, cpn_id, cpn_name, topics, setVisibleCXM }) => (
  topics && topics.length > 0 ?
    <div
      className = { `context-menu${ cpn_class ? ` ${ cpn_class }` : '' }` }
      id = { cpn_id ? cpn_id : undefined }
      name = { cpn_name ? cpn_name : undefined }>
        { topics.map(( topic, index ) => (
          <div
            className = 'topic-cxm'
            key = { index }>
              { topic.map(( option, i ) => (
                <button
                  tabIndex = { cpn_class === 'visible' ? '0.5' : '-1' }
                  className = 'option-cxm'
                  onClick = {( ) => {
                    setVisibleCXM ? setVisibleCXM( false ) : console.log( 'visible: false' )
                    option.action( )
                  }}
                  key = { `option-${ i }` }>{ option.text }</button>
              ))}
          </div>
        ))}
    </div>
    :
    <Fragment />
)

export default ContextMenu