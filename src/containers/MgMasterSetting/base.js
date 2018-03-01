import React from 'react';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      info: params.info,
    };
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
