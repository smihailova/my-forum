import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import './Register.scss';


@inject('authStore')
@withRouter
@observer
class Register extends React.Component {
  componentWillUnmount() {
    this.props.authStore.reset();
  }

  handleEmailChange = (event) => this.props.authStore.setEmail(event.target.value);

  handleNameChange = (event) => this.props.authStore.setName(event.target.value);

  handlePasswordChange = (event) => this.props.authStore.setPassword(event.target.value);

  handleSubmitForm = (event) => {
    event.preventDefault();
    this.props.authStore.register().then(() => this.props.history.replace('/'));
  };

  render() {
    const { values, errors, inProgress } = this.props.authStore;

    return (
      <div className='register'>
        <div className='register__inner'>
          <div className='register__container'>
            <div className='register__form'>
              <form onSubmit={this.handleSubmitForm}>
                <input
                  className='form-control register__control register__email'
                  type='text'
                  value={values.email}
                  placeholder='Email'
                  onChange={this.handleEmailChange}
                />
                <input
                  className='form-control register__control register__name'
                  type='text'
                  value={values.name}
                  placeholder='Name'
                  onChange={this.handleNameChange}
                />
                <input
                  className='form-control register__control register__password'
                  type='password'
                  value={values.password}
                  placeholder='Password'
                  onChange={this.handlePasswordChange}
                />
                <button
                  className='btn btn-success register__control register__signup-button'
                  type='submit'
                  disabled={inProgress}
                >
                  Sign up
                </button>
              </form>
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

Register.propTypes = propTypes;

export default Register;
