import React from 'react';
import Toast from 'react-native-simple-toast';

class CgCategoryBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      }],
      skuLists: [{
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
      leftIndex: 0,
    };
  }
}

export default CgCategoryBase;
