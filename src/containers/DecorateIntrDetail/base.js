import React from 'react';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      introInfo: props.navigation.state.params.introInfo,
    };
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
