import React from 'react';
import PropTypes from 'prop-types'
import './buzzer.scss';
import buzzerInactive from '../../resssources/buzzerInactive.svg';
import buzzerActive from '../../resssources/buzzerActive.svg';

const Buzzer = ({ isActive }) => {
  return (
    <img src={isActive ? buzzerActive :  buzzerInactive} className="buzzer" alt="buzzer" />
  )
}

Buzzer.propTypes = {
  isActive: PropTypes.bool.isRequired,
}

export default Buzzer