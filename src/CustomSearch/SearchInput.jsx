import React from 'react';
import PropTypes from 'prop-types';

const SearchInput = ({ handleSearchSubmit }) => (
  <fieldset style={{ textAlign: 'left' }}>
    <legend>Search my stores</legend>
    <input type="text" placeholder="Pink sweater" />
    <button onClick={handleSearchSubmit}>
      Search
    </button>
  </fieldset>
);

SearchInput.propTypes = {
  handleSearchSubmit: PropTypes.func.isRequired,
};

export default SearchInput;
