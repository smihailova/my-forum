import React from 'react';
import ReactDOM from 'react-dom';
import promiseFinally from 'promise.prototype.finally';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';

import '../styles/app.scss';

import App from './modules/App/components/App';
import authStore from './modules/Auth/AuthStore';
import userStore from './shared/stores/userStore';
import commonStore from './shared/stores/commonStore';

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
useStrict(true);

ReactDOM.render((
    <Provider {...stores}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  ), document.getElementById('root')
);
