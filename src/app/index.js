import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/app.scss';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';

import TopNavBar from './modules/TopNavBar/components/TopNavBar';
import { LoginStore } from "./modules/Login/LoginStore";

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const loginStore = new LoginStore();
const stores = {
  routing: routingStore,
  login: loginStore
};

const history = syncHistoryWithStore(browserHistory, routingStore);

const App = () => {
  return (
    <Provider {...stores}>
      <Router history={history}>
        <div>
          <TopNavBar/>
        </div>
      </Router>
    </Provider>
  );
};

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
