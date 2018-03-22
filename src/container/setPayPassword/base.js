import React from 'react';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beMemberId: '',
      supplyId: '',
    };
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
