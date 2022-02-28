import React, { Component } from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';

import { fetchStream } from '../../actions';

class StreamShow extends Component {

  videoRef = React.createRef();
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);

    this.buildPlayer();
  };

  componentDidUpdate() {
    this.buildPlayer();
  };

  componentWillUnmount() {
    this.player.destroy();
  };

  buildPlayer = () => {
    if (this.player || !this.props.stream) {
      return;
    }
    const { id } = this.props.match.params;
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();

  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }
    const { title, description } = this.props.stream;
    return (
      <div>
        <video ref={this.videoRef} controls style={{ width: '100%' }} />
        <h2>{title}</h2>
        {description}
      </div>
    );
  };
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);