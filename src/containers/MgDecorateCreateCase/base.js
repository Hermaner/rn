import React from 'react';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '0.00',
    };
  }
}
Base.propTypes = {
  pop: PropTypes.func,
};
export default Base;
