import React, { Component } from 'react';
import SelectStores from './SelectStores';
import SearchInput from './SearchInput';

const stores = [
  {
    name: 'Hollister Co.',
    site: 'https://www.hollisterco.com/shop/us',
  },
  {
    name: 'Express',
    site: 'https://www.express.com/',
  },
  {
    name: 'Abercrombie & Fitch',
    site: 'https://www.abercrombie.com/shop/us',
  },
  {
    name: 'American Eagle Outfitters',
    site: 'https://www.ae.com/',
  },
  {
    name: 'H&M',
    site: 'http://www2.hm.com/en_us/index.html',
  },
  {
    name: 'The Gap',
    site: 'https://www.gap.com/products/index.jsp',
  },
];

class CustomSearch extends Component {
  constructor(props) {
    super(props);
    const previouslySelectedStores = localStorage.getItem('selectedStores');
    this.state = {
      selectedStores: previouslySelectedStores || {},
      viewStoreSelection: !previouslySelectedStores,
    };
  }

  handleStoreSelection = (e) => {
    const updatedSelectedStores = { ...this.state.selectedStores };
    if (updatedSelectedStores[e.target.value]) {
      delete updatedSelectedStores[e.target.value];
    } else {
      updatedSelectedStores[e.target.value] = {
        name: e.target.value,
        site: e.target.getAttribute('data-site'),
      };
    }
    this.setState({
      selectedStores: updatedSelectedStores,
    });
  }

  handleStoreSelectionSave = () => {
    localStorage.setItem('selectedStores', JSON.stringify(this.state.selectedStores));
    this.setState({ viewStoreSelection: false });
  }

  handleSearchSubmit = (e) => {
    console.log('e', e);
    console.log('e.target.value', e.target.value);
  }

  render() {
    return (
      <div className="flex flex-column flex-align-items-center pad-30 montserrat">
        <h1> Custom Search </h1>
        {
          !this.state.viewStoreSelection ? (
            <SearchInput handleSearchSubmit={this.handleSearchSubmit} />
          ) : (
            <SelectStores
              stores={stores}
              selectedStores={this.state.selectedStores}
              handleStoreSelection={this.handleStoreSelection}
              handleStoreSelectionSave={this.handleStoreSelectionSave}
            />
          )
        }
      </div>
    );
  }
}

export default CustomSearch;
