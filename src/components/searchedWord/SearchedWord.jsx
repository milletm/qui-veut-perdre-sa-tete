import React from 'react';
import './searchedWord.scss';
import _ from 'lodash';
import PropTypes, { arrayOf } from 'prop-types'
import SearchedWordKey from './SearchedWordKey';

const SearchedWord = ({ letters }) => {
  return (
    <div className="search-word-container">
      {_.map(letters, (letter, index) => <SearchedWordKey key={`searchedWord-key-${index}`} letter={letter} />)}
    </div>
  )
}

SearchedWord.propTypes = {
  letters: arrayOf(PropTypes.shape({
      letter: PropTypes.string,
      isActive: PropTypes.bool
    })
  ).isRequired
}

export default SearchedWord