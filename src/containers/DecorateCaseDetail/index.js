import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text } from 'native-base';
import AutoHeightImage from 'react-native-auto-height-image';
import { connect } from 'react-redux';
import { popRoute } from '../../actions';
import { Header } from '../../components';
import base from './base';
import styles from './styles';
import { deviceW } from '../../utils';

class DecorateCaseDetail extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderContent() {
    const { item } = this.state;
    return (
      <View style={styles.listContent}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.list}>
          <Text style={styles.text}>设计师：{item.designer || '无'}</Text>
          <Text style={styles.text}>风格：{item.style || '无'}</Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.text}>面积：{item.acreage || '无'}</Text>
          <Text style={styles.text}>价格：{item.price || '无'}</Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.text}>作品类型：{item.worksType || '无'}</Text>
          <Text style={styles.text}>房型：{item.houseType || '无'}</Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.text}>楼盘名称：{item.buildingName || '无'}</Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.text}>楼盘地址：{item.buildingAddress || '无'}</Text>
        </View>
        {
          item.detailImgUrls.split(',').map((list, index) => (
            <AutoHeightImage
              width={deviceW - 20}
              key={index}
              imageURL={list}
            />
          ))
        }
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="案例详情" />
        {this._renderContent()}
      </Container>
    );
  }
}

DecorateCaseDetail.propTypes = {
  pop: PropTypes.func,
};
export default connect(null, { pop: popRoute })(DecorateCaseDetail);
