import React from 'react';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
    };
  }
}
Base.propTypes = {
  item: PropTypes.object,
};
export default Base;
