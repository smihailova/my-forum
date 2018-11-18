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
      <div className='login'>
        <div className='login__inner'>
          <div className='login__container'>
            <div className='login__form'>
              <form onSubmit={this.handleSubmitForm}>
                <input
                  className='form-control login__control login__email'
                  type='text'
                  value={values.email}
                  placeholder='Email'
                  onChange={this.handleEmailChange}
                />
                <input
                  className='form-control login__control login__password'
                  type='password'
                  value={values.password}
                  placeholder='Password'
                  onChange={this.handlePasswordChange}
                />
                <button
                  className='btn btn-success login__control login__login-button'
                  type='submit'
                  disabled={inProgress}
                >
                  Log in
                </button>
              </form>
            </div>
            <div className='login__sign-up'>
              <div className='login__sign-up-text'>Do not have an account?</div>
              <div className='login__sign-up-link-block'>
                <a className='login__sign-up-link' href='/registration'>Sign Up</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const propTypes = {
  store: PropTypes.object
};
Login.propTypes = propTypes;

export default Login;
