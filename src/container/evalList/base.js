import React from 'react';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabList: [{
        title: '全部',
      }, {
        title: '好评',
      }, {
        title: '差评',
      }, {
        title: '有图',
      }],
      items: [],
      imageDateIndex: 0,
      isImageDateShow: false,
      imageViewData: [],
      chooseIndex: 0,
      thinkInfo: [],
      good: [],
      bad: [],
      haveImg: [],
    };
  }
  getInit = () => {
    const { thinkInfo } = this.props.navigation.state.params;
    console.log('000000000000000000000000000', thinkInfo);
    const all = [];
    const good = [];
    const bad = [];
    const haveImg = [];
    for (let i = 0; i < thinkInfo.length; i += 1) {
      if (thinkInfo[i].imgUrls) {
        all.push({
          star: thinkInfo[i].starLevel,
          label: thinkInfo[i].content,
          date: thinkInfo[i].postDate,
          count: thinkInfo[i].buyCount,
          name: thinkInfo[i].memberName,
          imageData: thinkInfo[i].imgUrls.split(','),
        });
      } else {
        all.push({
          star: thinkInfo[i].starLevel,
          label: thinkInfo[i].content,
          date: thinkInfo[i].postDate,
          count: thinkInfo[i].buyCount,
          name: thinkInfo[i].memberName,
          imageData: [],
        });
      }
      if (thinkInfo[i].type === '1') {
        if (thinkInfo[i].imgUrls) {
          good.push({
            star: thinkInfo[i].starLevel,
            label: thinkInfo[i].content,
            date: thinkInfo[i].postDate,
            count: thinkInfo[i].buyCount,
            name: thinkInfo[i].memberName,
            imageData: thinkInfo[i].imgUrls.split(','),
          });
        } else {
          good.push({
            star: thinkInfo[i].starLevel,
            label: thinkInfo[i].content,
            date: thinkInfo[i].postDate,
            count: thinkInfo[i].buyCount,
            name: thinkInfo[i].memberName,
            imageData: [],
          });
        }
      }
      if (thinkInfo[i].type === '3') {
        if (thinkInfo[i].imgUrls) {
          bad.push({
            star: thinkInfo[i].starLevel,
            label: thinkInfo[i].content,
            date: thinkInfo[i].postDate,
            count: thinkInfo[i].buyCount,
            name: thinkInfo[i].memberName,
            imageData: thinkInfo[i].imgUrls.split(','),
          });
        } else {
          bad.push({
            star: thinkInfo[i].starLevel,
            label: thinkInfo[i].content,
            date: thinkInfo[i].postDate,
            count: thinkInfo[i].buyCount,
            name: thinkInfo[i].memberName,
            imageData: [],
          });
        }
      }
      if (thinkInfo[i].imgUrls) {
        haveImg.push({
          star: thinkInfo[i].starLevel,
          label: thinkInfo[i].content,
          date: thinkInfo[i].postDate,
          count: thinkInfo[i].buyCount,
          name: thinkInfo[i].memberName,
          imageData: thinkInfo[i].imgUrls.split(','),
        });
      }
    }
    this.setState({
      items: all,
      thinkInfo,
      all,
      good,
      bad,
      haveImg,
    });
  }
  tabChange = (index) => {
    const { all, good, bad, haveImg } = this.state;
    switch (index) {
      case 0:
        this.setState({
          chooseIndex: 0,
          items: all,
        });
        break;
      case 1:
        this.setState({
          chooseIndex: 1,
          items: good,
        });
        break;
      case 2:
        this.setState({
          chooseIndex: 2,
          items: bad,
        });
        break;
      case 3:
        this.setState({
          chooseIndex: 3,
          items: haveImg,
        });
        break;
      default:
    }
  }
  showImageDate = (imageDateIndex, imageData) => {
    const imageViewData = [];
    imageData.forEach(item => imageViewData.push({ url: item }));
    this.setState({
      imageDateIndex,
      isImageDateShow: true,
      imageViewData,
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
