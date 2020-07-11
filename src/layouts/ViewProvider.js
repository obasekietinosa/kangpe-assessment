import React from 'react';
import LoadingScreen from '../components/common/LoadingScreen';
import ApiService from '../utils/apiService';

class ViewProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: false
    };
  }

  componentDidMount() {
    this.setLoading(true);
    ApiService.get(ApiService.ENDPOINTS.providers)
      .then((data) => {
        console.log(data, this.props.match.params.id)
        let provider = data.filter((provider) => (
          provider.id === parseInt(this.props.match.params.id)
        ))[0]
        this.setState({
          isLoading: false,
          data: provider
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
    const { isLoading, data } = this.state;
    return (
      <div className="container">
        <div className="content__main">
            <h1>View Provider <span><i className="fa fa-edit"></i></span></h1>
        </div>
        {(isLoading || !data) ? (
          <LoadingScreen />
        ) : (
              <>
              {/* <img src={data?.images[0]?.url} alt="Provider" /> */}
              <div className="card-details">
                <h3 className="card__title">{data.name}</h3>
                <p className="card__sub-title">{data.address}</p>
                <p className="card__sub-title">{data.description}</p>
                <div className={`provider-card__lower`}>
                  <p className="card__body-text provider-rating">
                    {data.rating}
                    /5
                  </p>
                </div>
              </div>
              </>
            )
        }
      </div>
    )
  }
}

export default ViewProvider;