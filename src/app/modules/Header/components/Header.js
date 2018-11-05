import React from 'react';
import { inject, observer } from 'mobx-react';
import './Header.scss';
import Login from '../../Auth/Login/components/Login';


@inject('userStore')
@observer
class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  getRightSection() {
    const { currentUser } = this.props.userStore;
    if (currentUser) {
      return `${currentUser.name} >`;
    }
    return <Login/>;
  }

  render() {
    return (
      <div className='header'>
        <div className='header__title'>
          Forum
        </div>
        <div className='header__right-section'>
          { this.getRightSection() }
        </div>
      </div>
    );
  }
}

export default Header;
