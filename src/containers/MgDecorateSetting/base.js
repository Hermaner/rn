import React from 'react';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    const { info } = this.props.navigation.state.params;
    this.state = {
      info,
    };
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
