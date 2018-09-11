import React from 'react';
import { inject, observer } from 'mobx-react';
import { Navbar, Nav } from 'react-bootstrap';
import './TopNavBar.scss';
import Login from "../../Login/components/Login";


@inject('routing')
@observer
class TopNavBar extends React.Component {
  render() {
    return (
      <Navbar className='top-nav-bar'>
        <Navbar.Header>
          <Navbar.Brand>
            <a>Forum</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <Login/>
        </Nav>
       </Navbar>
    );
  }
}

export default TopNavBar;