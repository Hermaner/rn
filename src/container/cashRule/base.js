import React from 'react';

class CashRuleBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
export default CashRuleBase;
