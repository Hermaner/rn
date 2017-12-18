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
          imgUrl: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG',
        }, {
          imgUrl: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG',
        }, {
          imgUrl: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG',
        }, {
          imgUrl: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG',
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
          imgUrl: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG',
        }, {
          imgUrl: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG',
        }, {
          imgUrl: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG',
        }, {
          imgUrl: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG',
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
