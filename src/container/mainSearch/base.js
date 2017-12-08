import React from 'react';
import Toast from 'react-native-simple-toast';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: '',
    };
  }
  onSearchChange = (searchVal) => {
    this.setState({
      searchVal,
    });
  }
  login = () => {
    console.log('denglu');
  }
}

export default Base;
