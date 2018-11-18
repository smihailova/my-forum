import React from 'react';
import { inject, observer } from 'mobx-react';
import './Header.scss';
import Login from '../../Auth/Login/components/Login';


@inject('userStore', 'commonStore', 'authStore', 'routingStore')
@observer
class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    this.props.authStore.logout().then(() => this.props.routingStore.push('/login'));
  };

  render() {
    const currentUserData = this.props.userStore.currentUser
      ? this.props.userStore.currentUser.email
      : 'Loading...';
    return (
      <div className='header'>
        <div className='header__title'>
          Forum
        </div>
        <div className='header__right-section'>
          { currentUserData } >
        </div>
        <button onClick={this.handleLogout}>
          Logout
        </button>
      </div>
    );
  }
}

export default Header;
