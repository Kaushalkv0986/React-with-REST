import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchStream, deleteStream } from '../../actions';
import Modal from '../Modal';
import browserHistory from '../../browserHistory';

class StreamDelete extends Component {

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  handleDelete = () => {
    const { id } = this.props.match.params;
    this.props.deleteStream(id);
  }

  actions = (
    <React.Fragment>
      <button onClick={this.handleDelete} className='ui primary button negative'>Delete</button>
      <button onClick={() => browserHistory.push('/')} className='ui button'>Cancel</button>
    </React.Fragment>
  );

  renderModalContent() {
    if (!this.props.stream) {
      return "Are you sure You want to delete the stream?";
    }
    return `Are you sure You want to delete the stream: ${this.props.stream.title} ?`;
  };

  render() {
    return (
      <Modal
        header="Delete Stream"
        content={this.renderModalContent()}
        actions={this.actions}
        onDismiss={() => browserHistory.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);