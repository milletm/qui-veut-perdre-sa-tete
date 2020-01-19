import React from 'react';
import './buzzer.scss';
import buzzerInactive from '../../resssources/buzzerInactive.svg';
import buzzerActive from '../../resssources/buzzerActive.svg';

const Buzzer = ({ isActive }) => {
  return (
    <img src={isActive ? buzzerActive :  buzzerInactive} className="buzzer" alt="buzzer" />
  )
}


export default Buzzer