import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';

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
  login = () => {
    const { searchVal } = this.state;
    const data = {
      name: searchVal,
    };
    const { type } = this.props.navigation.state.params;
    let emit;
    switch (type) {
      case 'getMainListName':
        emit = 'getMainListName';
        break;
      default:
    }
    DeviceEventEmitter.emit(emit, data);
    this.props.pop();
  }
}
Base.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
