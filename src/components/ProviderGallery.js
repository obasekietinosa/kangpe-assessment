import React from 'react';
import PropTypes from 'prop-types';
import LoadingScreen from './common/LoadingScreen';
import { Link } from 'react-router-dom';

class Gallery extends React.Component {

  // TASK 3a:
  // Complete the Gallery component to include functionality  
  // On click on left or right arrows, the gallery should change its image
  // On click of the thumbnails, the image selected should be updated as well
  // On click of the "Read more" button in the selected Image, it should redirect to the Selected Provider View.
  //
  //
  // Task 3b:
  // Write tests for the Gallery component. Tests should be written in the Gallery.spec.js file in the __tests__ folder.
  //
  //
  // ============== CODE GOES BELOW THIS LINE :) ==============


  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      activeItem: 0,
      isLoading: false
    };
  }

  isActiveItemIndex = (key) => {
    return key === this.state.activeItem
  }

  getNextItemIndex = () => {
    let currentIndex = this.state.activeItem
    let maxIndex = this.state.items.length - 1

    return currentIndex === maxIndex ? 0 : currentIndex + 1
  }

  getPrevItemIndex = () => {
    let currentIndex = this.state.activeItem
    let maxIndex = this.state.items.length - 1

    return currentIndex === 0 ? maxIndex : currentIndex - 1
  }

  setActiveItemIndex = (activeItem) => {
    if (activeItem === this.state.activeItem) return
    this.setState({activeItem})
  }

  setNextItemIndex = () => {
    let activeItem = this.getNextItemIndex()
    this.setActiveItemIndex(activeItem)
  }

  setPrevItemIndex = () => {
    let activeItem = this.getPrevItemIndex()
    this.setActiveItemIndex(activeItem)
  }

  render() {
    const { items } = this.props;    
    if(!items || items.length === 0) {
      return (
        <LoadingScreen />
      )
    }
    return (
      <div data-testid="gallery" className="box-shadow gallery">
        <div className="gallery__slider">
          <div className="gallery__slider-item-wrapper">
            <div className="gallery__slider-item prev"
              style={{backgroundImage:`url("${this.state.items[this.getPrevItemIndex()].imageUrl ?? "https://via.placeholder.com/150x100"}")`}}> 
            </div>            
            <div className="gallery__slider-item active">
              <img src={this.state.items[this.state.activeItem].imageUrl ?? "https://via.placeholder.com/150x100"} className="gallery__slider-item active" alt={`${this.state.items[this.state.activeItem].name}`} />
              <div className="gallery__slider-item__info">
                <div className="gallery__slider-item__info-name">{this.state.items[this.state.activeItem].name}</div>
                <div className="gallery__slider-item__info-description">
                  {this.state.items[this.state.activeItem].description}
                  <p className="read-more">
                    <Link to={`/provider/${this.state.items[this.state.activeItem].id}`} >
                      Click to View
                    </Link>
                  </p>
                </div>
              </div>
            </div>          
            <div className="gallery__slider-item next"
              style={{backgroundImage:`url("${this.state.items[this.getNextItemIndex()].imageUrl ?? "https://via.placeholder.com/150x100"}")`}}>              
            </div>            
          </div>    
          <div className="gallery__slider-controls">
            <button onClick={this.setPrevItemIndex} className="gallery__slider-controls__button left">
              <i className="fa fa-chevron-left"></i>
            </button>
            <button onClick={this.setNextItemIndex} className="gallery__slider-controls__button right">
              <i className="fa fa-chevron-right"></i>
            </button>
          </div>      
        </div>     
        <div className="gallery__thumbnails">
          {
            this.state.items.map((item, key) => (
              <div
                key={key} 
                onClick={() => this.setActiveItemIndex(key)} 
                className={`gallery__thumbnails__item ${this.isActiveItemIndex(key) ? "active" : ""}`}
                style={{backgroundImage:`url("${item.imageUrl ?? "https://via.placeholder.com/150x100"}")`}}>            
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

Gallery.propTypes = {
  startFrom: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string,
    description: PropTypes.string
  })).isRequired,
  onClick: PropTypes.instanceOf(Function)
}

export default Gallery
