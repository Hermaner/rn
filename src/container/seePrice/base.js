import React from 'react';
import PropTypes from 'prop-types';

class SeePriceBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected1: '',
      selected2: '',
      info: [],
    };
  }
  getInit = () => {
    const { info } = this.props.navigation.state.params;
    this.setState({
      info,
    });
  }
  chooseBank = (value) => {
    this.setState({
      selected1: value,
    });
  }
  choosePlace = (value) => {
    this.setState({
      selected2: value,
    });
  }
}
SeePriceBase.propTypes = {
  navigation: PropTypes.object,
};
export default SeePriceBase;
