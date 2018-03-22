import React from 'react';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postid: '',
      type: '',
    };
  }
  getInit = () => {
    const { postid, type } = this.props.navigation.state.params;
    this.setState({
      postid,
      type,
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
