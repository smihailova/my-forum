import React from 'react';
import { inject, observer } from 'mobx-react/index';


function AuthenticatedComponentHOC(DecoratedComponent) {
  @inject('userStore', 'commonStore', 'routingStore')
  @observer
  class AuthenticatedComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isAuthenticated: false,
      };

      this.checkAuth = this.checkAuth.bind(this);
    }

    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps);
    }

    checkAuth(props = this.props) {
      const {token} = props.commonStore;
      if (props.userStore.currentUser) {
        this.setState({isAuthenticated: true});
        this.props.userStore.pullUser();
        this.props.commonStore.setAppLoaded();
      } else if (token) {
        this.props.commonStore.isTokenValid()
            .then((isTokenValid) => {
              if (isTokenValid) {
                this.setState({isAuthenticated: true});
                this.props.userStore.pullUser();
                this.props.commonStore.setAppLoaded();
              } else {
                this.props.routingStore.push('/login');
              }
            });
      } else {
        this.props.routingStore.push('/login');
      }
    }

    render() {
      return (
        <DecoratedComponent {...this.props} />
      );
    }
  }
  return AuthenticatedComponent;
}

export default AuthenticatedComponentHOC;

