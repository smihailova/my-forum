import React from 'react';
import PropTypes from 'prop-types';
import './Home.scss';


class Home extends React.Component {
  render() {
    return (
      <div>
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
