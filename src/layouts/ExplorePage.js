import React from 'react';
import Gallery from '../components/ProviderGallery'
import NewProviderForm from '../components/forms/NewProviderForm';
import ApiService from '../utils/apiService';
import LoadingScreen from '../components/common/LoadingScreen';
import { pathGet } from '../utils/utils';
import Grid from '../components/ProviderGrid';
import List from '../components/ProviderList';

class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      providers: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.setLoading(true);
    ApiService.get(ApiService.ENDPOINTS.providers)
      .then((data) => {
        this.setState({
          isLoading: false,
          data: data,
          providers: data,
          currentView: "gallery"
        });
      });
  }

  setLoading = (isLoading) => {
    this.setState({
      isLoading
    });
  }

  filterProviders = (event) => {
    // TASK 2:
    // On input, filter Available Providers based on Name, Address and Type
    //
    // ============== CODE GOES BELOW THIS LINE :) ==============
    let providers = this.state.data.filter((provider => (
      Boolean(pathGet(provider, event.target.value))
    )))
    this.setState({providers})
  }

  isCurrentView =  (key) => {
    return key === this.state.currentView
  }

  switchView = (currentView) => {
    // TASK 4:
    // onClick on a view preference, switch across the different view options (Gallery, List, Grid)
    // based on whatever the user selects.
    //
    // ============== CODE GOES BELOW THIS LINE :) ==============
    this.setState({currentView})
  }

  render() {
    const { isLoading, providers, currentView } = this.state;
    let ProviderView
    switch (currentView) {
      case "grid":
        ProviderView = Grid
        break;
      case "list":
        ProviderView = List
        break;
      case "gallery":
      default:
        ProviderView = Gallery
        break;
    }
    return (
      <>
      <section className="main__top-providers">
        <h2 className="text-header">Our Providers</h2>
        <div className="flex-row box-shadow" style={{padding:"1rem"}}>
          <div>
            <input
              type="text"
              className="input__style_1 input__search"
              placeholder="&#xf002; Search with Provider Name, Address, or Type"
              onChange={this.filterProviders}
              onInput={this.filterProviders}
            />
          </div>
          <div className="layout-switcher">
              <i className={`fa fa-images ${this.isCurrentView("gallery") ? "active" : ""}`} onClick={() => this.switchView("gallery")}></i>
              <i className={`fa fa-th-large ${this.isCurrentView("grid") ? "active" : ""}`} onClick={() => this.switchView("grid")}></i>
              <i className={`fa fa-th-list ${this.isCurrentView("list") ? "active" : ""}`} onClick={() => this.switchView("list")}></i>
            </div>
        </div>
        {(isLoading || !providers) ? (
          <LoadingScreen />
        ) : (
          <React.Fragment>                
            <ProviderView
              items={providers.map((item) => ({
                id: item.id, 
                address: item.address,
                rating: item.rating,
                type: item.provider_type?.name, 
                imageUrl: item?.images?.[0]?.url, 
                name: item.name, 
                description: item.description
              }))}
            />
          </React.Fragment>
        )}
      </section>
      <section className="main__new-provider fixed">
          <div className="new-provider">
            <h2 className="text-header">Can't find a Provider?</h2>
            <p className="text-body">Feel free to recommend a new one.</p>
            <hr/>
            <NewProviderForm />
          </div>
      </section>
      </>
    );
  }
}

export default ExplorePage;
