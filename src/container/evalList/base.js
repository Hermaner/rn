import React from 'react';
import Toast from 'react-native-simple-toast';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }
  changeBtn = () => {
    console.log('1')
  }
}

export default Base;
