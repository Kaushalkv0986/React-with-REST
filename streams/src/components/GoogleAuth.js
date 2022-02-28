import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {

  componentDidMount() {
    /*gapi can be accessed inside window object*/
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '376257193757-bk4f7ecmierus3bs6938sob70fs7j4jo.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthStatusChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthStatusChange)
      });
    });
  }

  /* isSignedIn argument is coming from line 16 */
  onAuthStatusChange = isSignedIn => {
    isSignedIn ? this.props.signIn(this.auth.currentUser.get().getId()) : this.props.signOut();
  }
  onSignInClick = () => this.auth.signIn();
  onSignOutClick = () => this.auth.signOut();

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    }
    else if (this.props.isSignedIn) {
      return (
        <button
          className='ui red google button'
          onClick={this.onSignOutClick}
        >
          <i className='ui icon google ' />
          Sign Out
        </button>
      );
    }
    else {
      return (
        <button
          className='ui red google button'
          onClick={this.onSignInClick}
        >
          <i className='ui icon google ' />
          Sign In
        </button>
      );
    }
  }
  render() {
    return (
      <div>
        {this.renderAuthButton()}
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);