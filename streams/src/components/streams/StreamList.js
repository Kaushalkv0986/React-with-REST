import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStreams } from '../../actions';

class StreamList extends Component {

  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdminOperations(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className='right floated content'>
          <Link to={`/streams/update/${stream.id}`} className='ui button primary'>Edit</Link>
          <Link to={`/streams/delete/${stream.id}`} className='ui button negative'>Delete</Link>
        </div>
      );
    }
  }

  renderList = () => {
    return (
      this.props.streams.map((stream) => {
        return (
          <div className='item' key={stream.id} >
            {this.renderAdminOperations(stream)}
            <i className='large middle aligned camera icon' />
            <div className='content'>
              {stream.title}
              <div className='description'>
                {stream.description}
              </div>
            </div>
          </div>
        );
      })
    );
  }
  render() {
    return (
      <div className='ui segment'>
        <h2>Streams</h2>
        <div className='ui celled list'>{this.renderList()}</div>
        <div style={{ textAlign: 'right' }}>
          <Link to="streams/new" className='ui primary button'>
            Create Stream
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  /*passing as array */
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };

}

export default connect(mapStateToProps, { fetchStreams })(StreamList);