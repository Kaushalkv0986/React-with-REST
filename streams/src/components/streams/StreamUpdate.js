import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamUpdate extends Component {

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <StreamForm
          /* initialValues is redux-form property which sets initial value of field based on name of the field*/
          /* _.pick is picking only title and description of the stream and passing it to initialValues */
          initialValues={_.pick(this.props.stream, 'title', 'description')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamUpdate);