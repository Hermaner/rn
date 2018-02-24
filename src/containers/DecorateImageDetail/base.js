import React from 'react';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.navigation.state.params.items,
    };
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
