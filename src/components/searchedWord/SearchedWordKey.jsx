import React from 'react'
import PropTypes from 'prop-types'

const SearchedWordKey = ({ letter }) => {
  return (
    <div className={`search-word-key ${letter.letter === " " ? 'space-key' : ''}`}>
    {letter.isActive && (
      <span className="search-word-letter">{letter.letter}</span>
    )}
  </div>
  )
}

SearchedWordKey.propTypes = {
  letter: PropTypes.shape({
    letter: PropTypes.string,
    isActive: PropTypes.bool
  }).isRequired
}

export default SearchedWordKey