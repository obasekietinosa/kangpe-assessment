import React from 'react';
import ApiService from '../../utils/apiService';

class NewProviderForm extends React.Component {

  // TASK 5: Add New Provider
  // Add Functionality to the form below
  // On submission it should make a POST request to 
  // the server to create a new provider.
  // Refer to the API documentation for details.
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      description: "",
      active_status: "Pending",
      state: "",
      rating: 1,
      provider_type: "hospital",
      isLoading: false,
      errors: []
    };
  }

  validateProvider = () => {
    let errors = []
    if (this.state.name.length === 0){
      errors.push("Name cannot be blank")
    }
    if (this.state.address.length === 0){
      errors.push("Address cannot be blank")
    }
    if (this.state.state.length === 0){
      errors.push("State cannot be blank")
    }
    if (this.state.rating < 1 || this.state.rating > 5){
      errors.push("Rating must be between 1 and 5")
    }
    this.setState({errors})
    return errors.length === 0
  }
  
  handleChange = (event) => {
    this.setState({[event.target.getAttribute('name')]: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault()

    if(!this.validateProvider()) return

    this.setState({isLoading: true})
    let newProvider = {
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
      active_status: this.state.active_status,
      state: this.state.state,
      rating: this.state.rating,
      provider_type: this.state.provider_type
    }
    ApiService.post(ApiService.ENDPOINTS.providers, newProvider)
      .then((data) => {
        this.setState({
          isLoading: false
        });
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Provider Name:</label>
          <input className="input__style_1" value={this.state.name} onChange={this.handleChange} type="text" name="name" />
        </div>
        <div className="form-group">
          <label htmlFor="address">Provider Address:</label>
          <input className="input__style_1" value={this.state.address} onChange={this.handleChange} type="text" name="address" />
        </div>
        <div className="form-group">
          <label htmlFor="address">Provider State:</label>
          <input className="input__style_1" value={this.state.state} onChange={this.handleChange} type="text" name="state" />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Provider Rating:</label>
          <select className="select input__style_1" value={this.state.rating} onChange={this.handleChange} name="rating">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="type">Provider type:</label>
          <select className="select input__style_1" value={this.state.type} onChange={this.handleChange} name="provider_type">
            <option value="hospital">Hospital</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="clinic">Clinic</option>
          </select>
        </div>        
        <div className="form-group">
          <label htmlFor="image">Provider Image</label>
          <img className="img-responsive" src="https://via.placeholder.com/1500x840" alt="new provider"/>
          <input type="file" name="file" />
        </div>
        <div className="form-group button-row">
          <button
            type="submit"
            className="btn btn-primary no-margin"
          >
            Submit
          </button>
          {
            this.state.isLoading   ?
              <p>Loading. Please Wait...</p>
              :
              null
          }
        </div>
      </form>
    );
  }
}

export default NewProviderForm;
