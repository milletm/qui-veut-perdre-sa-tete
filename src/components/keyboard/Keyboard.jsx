import React, { Component } from 'react';
import './keyboard.scss';
import KeyboardKey from "./KeyboardKey";
import PropTypes from 'prop-types'

class Keyboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.generateKey = this.generateKey.bind(this);
  }

  generateKey(start, end) {
    const { keyboard, handleKeyboardTrigger } = this.props;
    const keyboardRow = []
    for (let i = start; i < end; i++) {
      keyboardRow.push(<KeyboardKey key={`keyboard-key-${keyboard[i].letter}`} keyboardKey={keyboard[i]} handleKeyboardTrigger={handleKeyboardTrigger} />);
    }
    return keyboardRow;
  }

  render() {
    return (
      <div className="keyboard">
        <div className="keybord-row">
          {
            this.generateKey(0,10)
          }
        </div>
        <div className="keybord-row">
          {
            this.generateKey(10,20)
          }
        </div>
        <div className="keybord-row">
          {
            this.generateKey(20,26)
          }
        </div>
    </div>
    );
  }
}

Keyboard.propTypes = {
  keyboard: PropTypes.arrayOf(PropTypes.shape({
    letter: PropTypes.string,
    isActive: PropTypes.bool
  })).isRequired,
  handleKeyboardTrigger: PropTypes.func.isRequired
}

export default Keyboard