import React, { Component } from 'react';
import { firebase } from './fire';

import Authentication from './components/authentication';
import TodoList from './components/todolist';
import SignOut from './components/authentication/SignOut';
import Profile from './components/profile';

import { PageContainer, GithubBadge } from './styles';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: '',
      checkedAuth: false,
      loading: true,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      user
        ? this.setState({ userid: user.uid, loading: false, checkedAuth: true })
        : this.setState({ checkedAuth: true, loading: false });
    });
  }

  render() {
    const { userid, checkedAuth } = this.state;
    if (checkedAuth) {
      return (
        <PageContainer>
          {userid ? (
            <React.Fragment>
              <Profile uid={userid} />
              <TodoList uid={userid}> logged in </TodoList>
            </React.Fragment>
          ) : (
            <Authentication />
          )}
          <a href="https://github.com/petermiles/DevICT-Firebase">
            <GithubBadge>View Code on Github</GithubBadge>
          </a>
          {userid && <SignOut />}
        </PageContainer>
      );
    }
    return null;
  }
}

export default App;
