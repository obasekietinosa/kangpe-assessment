import React from 'react';
import LoadingScreen from '../components/common/LoadingScreen';
import ApiService from '../utils/apiService';

class ViewProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provider: {},
      isLoading: false
    };
  }

  componentDidMount() {
    this.setLoading(true);
    ApiService.get(`${ApiService.ENDPOINTS.providers}${this.props.match.params.id}`)
      .then((data) => {
        let provider = data
        this.setState({
          isLoading: false,
          provider
        });
      });
  }

  setLoading = (isLoading) => {
    this.setState({
      isLoading
    });
  }


  // TASK 6:
  // Render Single Provider View Here
  // Feel free to using existing styles,
  // or add new ones if you want to :)
  //
  // For Bonus points, you can also add functionality to edit the provider
  // Reusing the NewProviderForm component for this will make it a whole lot easier :D
  render() {
    const { isLoading, provider } = this.state;
    return (
        <>
        <h1 className="text-header">View Provider <span><i className="fa fa-edit"></i></span></h1>
        <div className="flex-row box-shadow" style={{padding:"1rem"}}>
        {(isLoading || !provider) ? (
          <LoadingScreen />
        ) : (
              <>
              <img src={provider?.images?.[0]?.url} alt="Provider" />
              <div className="card-details">
                <h3 className="card__title">{provider.name}</h3>
                <p className="card__sub-title">{provider.address}</p>
                <p className="card__sub-title">{provider.description}</p>
                <div className={`provider-card__lower`}>
                  <p className="card__body-text provider-rating">
                    {provider.rating}
                    /5
                  </p>
                </div>
              </div>
              </>
            )
        }
        </div>
        </>
    )
  }
}

export default ViewProvider;