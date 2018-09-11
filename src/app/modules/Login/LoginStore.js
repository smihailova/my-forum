import { observable, action, /*computed,*/ configure, useStrict } from 'mobx';
import axios from 'axios';

useStrict(true);

class LoginStore {
  @observable user = null;
  // @observable selectedUser = {};

  // @computed get selectedId() { return this.selectedUser.id; }
  //
  // @action setUsers = (users) => { this.users = [...users]; }
  // @action selectUser = (user) => { this.selectedUser = user; }
  // // Managing how we clear our observable state
  // @action clearSelectedUser = () => { this.selectedUser = {}; }
  // // An example that's a little more complex
  // @action getUsers() {
  // //Managing Async tasks like ajax calls with Mobx actions
  //     axios.get('http://jsonplaceholder.typicode.com/users').then(response => {
  //         this.setUsers(response.data);
  //     });
  // }

  @action login(username, password) {
    axios.post('/Login', { username, password })
      .then((response) => {
        console.log(response, ' hello, mobX!');
        this.user = response;
      });
  }
}

const store = new LoginStore();

export default store;
export { LoginStore };
