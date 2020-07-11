import React from 'react';
import USER_STUB from '../../assets/user_stub.svg';
import DropDown, { DropDownMenu } from './DropDown';
import AutoCompleteDropDown from './AutoCompleteDropDown';
import List from '../ProviderList';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <header className="navbar box-shadow fixed">
    <div className="navbar-left">
      <span className="navbar__logo">
        <i className="fa fa-hospital" />
      </span>
      <h1 className="navbar__title"><Link to="/">Pro.Zone</Link></h1>
    </div>
    <div className="navbar-right">
      <AutoCompleteDropDown
        customListComponent={List}
        onResultSelected={id => alert(`Selected id= ${id}`)} // TODO: this should navigate to a new route
      />
      <div className="navbar__avatar">
        <DropDown>
          <img src={USER_STUB} alt="User Avatar" />
          <DropDownMenu>
            <ul>
              <li>Logout</li>
            </ul>
          </DropDownMenu>
        </DropDown>
      </div>
    </div>
  </header>
);
export default NavBar;
