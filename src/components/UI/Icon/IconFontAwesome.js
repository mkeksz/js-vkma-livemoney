import React from 'react'
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export const IconFontAwesome = ({name}) => {
  let [_prefix, _name] = name.split(' ')

  if (!_name) {
    _name = _prefix
    _prefix = 'fas'
  }

  return <FontAwesomeIcon className="fa-fw" icon={[_prefix, _name]}/>
}

IconFontAwesome.propTypes = {
  name: PropTypes.string.isRequired
}
