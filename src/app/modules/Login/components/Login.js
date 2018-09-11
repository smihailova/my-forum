import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import {Button, FormControl, FormGroup} from "react-bootstrap";


@inject('routing', 'login')
@observer
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.store = props.login;
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  };

  onUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  render() {
    const { username, password } = this.state;

    return (
      <form className='login-form' action=''>
        <FormGroup>
          <FormControl
            className='login-form__username-input'
            type='text'
            value=''
            placeholder='username'
            onChange={this.onUsernameChange}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            className='login-form__password-input'
            type='text'
            value=''
            placeholder='password'
            onChange={this.onPasswordChange}
          />
        </FormGroup>
        <Button
            className='login-form__sign-in-button'
            bsStyle='success'
            type='submit'
            onClick={() => {this.store.login(username, password)}}
        >
            Sign in
        </Button>
      </form>
    );
  }
}

const propTypes = {
  store: PropTypes.object
};
Login.propTypes = propTypes;

export default Login;