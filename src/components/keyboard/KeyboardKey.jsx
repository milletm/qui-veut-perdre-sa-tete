import React from 'react'
import PropTypes from 'prop-types'

const KeyboardKey = ({ keyboardKey, handleKeyboardTrigger }) => {
  return (
    <button type="button" className={`keyboard-key ${keyboardKey.class}`} onClick={() => handleKeyboardTrigger(keyboardKey)}>
      <span className="letter">{keyboardKey.letter}</span>
    </button>
  )
}


KeyboardKey.propTypes = {
  keyboardKey: PropTypes.shape({
    class: PropTypes.string,
    letter: PropTypes.string,
    activated: PropTypes.bool
  }).isRequired,
  handleKeyboardTrigger: PropTypes.func.isRequired
}


export default KeyboardKey