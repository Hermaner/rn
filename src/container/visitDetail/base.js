import React from 'react';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
    };
  }
  getInit = () => {
    const { data } = this.props.navigation.state.params;
    this.setState({
      userInfo: data,
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
