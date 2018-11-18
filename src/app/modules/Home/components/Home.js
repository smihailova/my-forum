import React from 'react';
import PropTypes from 'prop-types';
import './Home.scss';

import AuthenticatedComponentHOC from '../../../shared/HOCs/AuthenticatedComponentHOC';
import Header from '../../Header/components/Header'


@AuthenticatedComponentHOC
class Home extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        Welcome Home! You are Logged in
      </div>
    );
  }
}

const propTypes = {
  store: PropTypes.object
};

Home.propTypes = propTypes;

export default Home;
