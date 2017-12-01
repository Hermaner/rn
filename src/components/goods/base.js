import React from 'react';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.name = 'zhongxia';
    this.state = {
      type: '1',
    };
  }
  common() {
    this.name = 'herman';
  }
}

export default Base;
