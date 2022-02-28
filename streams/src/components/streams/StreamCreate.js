import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamCreate = (props) => {

  const onSubmit = (formValues) => {
    props.createStream(formValues);
  }
  
  return (
    <div>
      <StreamForm onSubmit={onSubmit} />
    </div>
  );
}

export default connect(null, { createStream: createStream })(StreamCreate);