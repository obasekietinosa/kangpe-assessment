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
          <section>
            <h1 className="text-header">View Provider <span><i className="fa fa-edit"></i></span></h1>
            <div className="box-shadow" style={{padding:"1rem"}}>
            {(isLoading || !provider) ? (
              <LoadingScreen />
            ) : (
                  <>
                    <h2>{provider.name}</h2>
                    <img src={provider?.images?.[0]?.url} alt={provider.name} />
                    <div>
                      <h4><i className="fas fa-map-marker"></i> {provider.address}</h4>
                      <p>{provider.description}</p>
                      <p className="card__body-text provider-rating">
                        {provider.rating}
                        /5
                      </p>
                    </div>
                  </>
                )
            }
            </div>
          </section>
        </>
    )
  }
}

export default ViewProvider;