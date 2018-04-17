import React from 'react';
import Communications from 'react-native-communications';

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
  tellPhone = () => {
    Communications.phonecall(global.phone, false);
  }
}
export default CashRuleBase;
