import React from 'react';
import Toast from 'react-native-simple-toast';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: '',
      leftLists: [{
        id: '1',
        label: '水果',
        cur: true,
      }, {
        id: '1',
        label: '水果',
      }, {
        id: '1',
        label: '水果',
      }, {
        id: '1',
        label: '水果',
      }, {
        id: '1',
        label: '水果',
      }, {
        id: '1',
        label: '水果',
      }],
      leftIndex: 0,
    };
  }
  onSearchChange = (searchVal) => {
    this.setState({
      searchVal,
    });
  }
  changeLeftTab = (index) => {
    const { leftLists, leftIndex } = this.state;
    if (leftIndex === index) {
      return;
    }
    leftLists[index].cur = true;
    leftLists[leftIndex].cur = false;
    this.setState({
      leftLists,
      leftIndex: index,
    });
  }
}

export default Base;
