import React from 'react';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldStatus: '0',
    };
  }
  changeTap = (index) => {
    this.setState({
      oldStatus: index.i,
    });
  }
}
Base.propTypes = {
  type: PropTypes.string,
  status: PropTypes.string,
};
export default Base;
