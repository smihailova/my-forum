import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import {Button, FormControl, FormGroup} from "react-bootstrap";
import './Register.scss';


@inject('authStore')
@withRouter
@observer
class Register extends React.Component {
  componentWillUnmount() {
    this.props.auth.reset();
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
      <form className='login-form' onSubmit={this.handleSubmitForm}>
        <FormGroup>
          <FormControl
            className='login-form__email-input'
            type='text'
            value={values.email}
            placeholder='email'
            onChange={this.handleEmailChange}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            className='login-form__name-input'
            type='text'
            value={values.name}
            placeholder='name'
            onChange={this.handleNameChange}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            className='login-form__password-input'
            type='text'
            value={values.password}
            placeholder='password'
            onChange={this.handlePasswordChange}
          />
        </FormGroup>
        <Button
            className='login-form__sign-in-button'
            bsStyle='success'
            type='submit'
            disabled={inProgress}
        >
            Sign up
        </Button>
      </form>
    );
  }
}

const propTypes = {
  store: PropTypes.object
};

Register.propTypes = propTypes;

export default Register;
