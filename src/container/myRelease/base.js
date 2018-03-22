import React from 'react';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
}
Base.propTypes = {
  type: PropTypes.string,
  push: PropTypes.func,
};

export default Base;
