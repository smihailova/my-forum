import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import './Login.scss';


@inject('authStore')
@withRouter
@observer
class Login extends React.Component {
  componentWillUnmount() {
    this.props.authStore.reset();
  }

  handleEmailChange = (event) => this.props.authStore.setEmail(event.target.value);
  handlePasswordChange = (event) => this.props.authStore.setPassword(event.target.value);
  handleSubmitForm = (event) => {
    event.preventDefault();
    this.props.authStore.login().then(() => this.props.history.replace('/'));
  };

  render() {
    const { values, errors, inProgress } = this.props.authStore;

    return (
      <form className='login-form' onSubmit={this.handleSubmitForm}>
        <input
          className='form-control login-form__email'
          type='text'
          value={values.email}
          placeholder='email'
          onChange={this.handleEmailChange}
        />
        <input
          className='form-control login-form__password'
          type='text'
          value={values.password}
          placeholder='password'
          onChange={this.handlePasswordChange}
        />
        <button
          className='btn btn-success login-form__sign-in-button'
          type='submit'
          disabled={inProgress}
        >
          Sign in
        </button>
      </form>
    );
  }
}

const propTypes = {
  store: PropTypes.object
};
Login.propTypes = propTypes;

export default Login;
