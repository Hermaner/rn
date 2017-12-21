import React from 'react';
import Toast from 'react-native-simple-toast';

class CgSkusBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [{
        id: '1',
        title: '单果重',
        items: [{
          id: '1',
          label: '水果',
        }, {
          id: '1',
          label: '水果',
        }],
        cur: true,
      }, {
        id: '1',
        title: '单果重',
        items: [{
          id: '1',
          label: '水果',
        }, {
          id: '1',
          label: '水果',
        }],
        cur: true,
      }, {
        id: '1',
        title: '单果重',
        items: [{
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
        }, {
          id: '1',
          label: '水果',
        }],
        cur: true,
      }],
    };
  }
  tabView = (index, i) => {
    const { lists } = this.state;
    const itemIndex = lists[index].itemIndex;
    lists[index].items[i].cur = true;
    if (itemIndex === i) {
      return;
    }
    if (itemIndex !== undefined) {
      lists[index].items[itemIndex].cur = false;
    }
    lists[index].items[i].cur = true;
    lists[index].itemIndex = i;
    this.setState({
      lists,
    });
  }
}

export default CgSkusBase;
