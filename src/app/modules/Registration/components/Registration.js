import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './Registration.scss';


@inject('routing')
@observer
class Registration extends React.Component {
  render() {
    return (
      <div className='registration'>
        <form className='registration__form' action=''>
          <span className='registration__form-title'>
              Registration
          </span>

          <FormGroup>
            <FormControl
              type='text'
              value=''
              placeholder='name'
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              type='text'
              value=''
              placeholder='email'
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              type='text'
              value=''
              placeholder='password'
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              type='text'
              value=''
              placeholder='confirm password'
            />
          </FormGroup>

          <Button bsStyle='success' type='submit'>
              Sign up
          </Button>
        </form>
      </div>
    );
  }
}

export default Registration;