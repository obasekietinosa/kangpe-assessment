import React from 'react';
import './App.scss';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import ExplorePage from './layouts/ExplorePage';
import PageNotFound from './layouts/PageNotFound';
import ViewProvider from './layouts/ViewProvider';
import NavBar from './components/common/NavBar';

function App() {
  return (
        <BrowserRouter history="">
          <div className="container">
            <NavBar />
            <div className="content__main">
            <Switch>
              <Route path="/" exact component={ExplorePage}/>
              {/* TODO (6a): Add New Route for Viewing a single Provider */}
              <Route path="/provider/:id" exact component={ViewProvider} />
              <Route component={PageNotFound} />
            </Switch>
            </div>
          </div>
        </BrowserRouter>
  );
}

export default App;
