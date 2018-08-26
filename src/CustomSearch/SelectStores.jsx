import React from 'react';
import PropTypes from 'prop-types';

const SelectStores = ({
  stores,
  selectedStores,
  handleStoreSelection,
  handleStoreSelectionSave,
}) => (
  <fieldset style={{ textAlign: 'left' }}>
    <legend>Choose the stores you love</legend>
    {stores.map(store => (
      <div>
        <input
          type="checkbox"
          id={store.name}
          name="store"
          value={store.name}
          data-site={store.site}
          checked={selectedStores[store.name]}
          onClick={handleStoreSelection}
        />
        <label htmlFor={store.name} >
          {store.name}
        </label>
      </div>
    ))}
    <button onClick={handleStoreSelectionSave}>
      Save
    </button>
  </fieldset>
);

SelectStores.propTypes = {
  stores: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    site: PropTypes.string,
  })).isRequired,
  selectedStores: PropTypes.shape({
    name: PropTypes.string,
    site: PropTypes.string,
  }).isRequired,
  handleStoreSelection: PropTypes.func.isRequired,
  handleStoreSelectionSave: PropTypes.func.isRequired,
};

export default SelectStores;
