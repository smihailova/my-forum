import React from 'react';
import ReactDOM from 'react-dom';
import promiseFinally from 'promise.prototype.finally';
import { Provider } from 'mobx-react';
import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';
import { Switch, Route } from 'react-router-dom';

import './styles/app.scss';

import Home from './app/modules/Home/components/Home';
import Register from './app/modules/Auth/Register/components/Register';
import Login from './app/modules/Auth/Login/components/Login';

import authStore from './app/modules/Auth/AuthStore';
import userStore from './app/shared/stores/userStore.react';
import commonStore from './app/shared/stores/commonStore.react';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const stores = {
  routingStore,
  commonStore,
  authStore,
  userStore
};

const history = syncHistoryWithStore(browserHistory, routingStore);

promiseFinally.shim();

ReactDOM.render((
    <Provider {...stores}>
      <Router history={history}>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/registration' component={Register}/>
          <Route path='/' component={Home}/>
        </Switch>
      </Router>
    </Provider>
  ), document.getElementById('page-content')
);
