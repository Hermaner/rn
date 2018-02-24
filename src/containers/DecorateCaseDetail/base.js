import React from 'react';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.navigation.state.params.item,
    };
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
