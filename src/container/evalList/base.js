import React from 'react';
import Toast from 'react-native-simple-toast';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        star: 4,
        label: '没有评价就是好评价',
        date: '2017-07-07',
        imageData: [{
          imgUrl: 'http://p11md08oo.bkt.clouddn.com/201812115032101.jpg?imageView2/2/w/600',
        }, {
          imgUrl: 'http://p11md08oo.bkt.clouddn.com/201812115032101.jpg?imageView2/2/w/600',
        }, {
          imgUrl: 'http://p11md08oo.bkt.clouddn.com/201812115032101.jpg?imageView2/2/w/600',
        }, {
          imgUrl: 'http://p11md08oo.bkt.clouddn.com/201812115032101.jpg?imageView2/2/w/600',
        }],
      }, {
        star: 4,
        label: '没有评价就是好评价',
        date: '2017-07-07',
        imageData: [],
      }, {
        star: 4,
        label: '没有评价就是好评价',
        date: '2017-07-07',
        imageData: [{
          imgUrl: 'http://p11md08oo.bkt.clouddn.com/201812115032101.jpg?imageView2/2/w/600',
        }, {
          imgUrl: 'http://p11md08oo.bkt.clouddn.com/201812115032101.jpg?imageView2/2/w/600',
        }, {
          imgUrl: 'http://p11md08oo.bkt.clouddn.com/201812115032101.jpg?imageView2/2/w/600',
        }, {
          imgUrl: 'http://p11md08oo.bkt.clouddn.com/201812115032101.jpg?imageView2/2/w/600',
        }],
      }],
      imageDateIndex: 0,
      isImageDateShow: false,
      imageViewData: [],
    };
  }
  changeBtn = () => {
    console.log('1')
  }
  showImageDate = (imageDateIndex, imageData) => {
    const imageViewData = [];
    imageData.forEach(item => imageViewData.push({ url: item.imgUrl }));
    this.setState({
      imageDateIndex,
      isImageDateShow: true,
      imageViewData,
    });
  }
}

export default Base;
