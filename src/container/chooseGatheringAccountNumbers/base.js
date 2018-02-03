import React from 'react';

class ChooseGatheringAccountNumbersBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected1: '',
      selected2: '',
    };
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
export default ChooseGatheringAccountNumbersBase;
