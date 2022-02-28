import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom';

import Header from './Header';
import StreamCreate from './streams/StreamCreate';
import StreamList from './streams/StreamList';
import StreamUpdate from './streams/StreamUpdate';
import StreamDelete from './streams/StreamDelete';
import StreamShow from './streams/StreamShow';
import browserHistory from '../browserHistory';

const App = () => {
  return (
    <div className='ui container'>
      {/* We will use Router component instead of BrowserRouter if we want to use own history object instead,
      This will ease the process of doing programmatic navigation (check actions/index.js) */}
      {/* <BrowserRouter> */}
      <Router history={browserHistory}>
        <div>
          <Header />
          <Switch>
            <Route path='/' exact component={StreamList} />
            <Route path='/streams/new' exact component={StreamCreate} />
            <Route path="/streams/update/:id" exact component={StreamUpdate} />
            <Route path='/streams/delete/:id' exact component={StreamDelete} />
            <Route path='/streams/:id' exact component={StreamShow} />
          </Switch>
        </div>
      </Router>
      {/* </BrowserRouter> */}
    </div>
  );
}
export default App;