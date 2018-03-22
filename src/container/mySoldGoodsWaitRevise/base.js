import React from 'react';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.isSend = false;
    this.state = {
      memberId: '',
      tu: require('../../assets/img/no.png'),
    };
  }
}
Base.propTypes = {
  status: PropTypes.string,
};
export default Base;
