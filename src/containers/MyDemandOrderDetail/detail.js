import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Icon, Content } from 'native-base';
import { connect } from 'react-redux';
import { CachedImage } from 'react-native-img-cache';
import { popRoute, pushRoute } from '../../actions';
import { ImageLook, SpotLine, TitleItem } from '../../components';
import base from './detailBase';
import styles from './styles';

class DemandOrderDetail extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  _renderAddress() {
    const { item } = this.state;
    return (
      <View>
        <View style={styles.address}>
          <CachedImage source={{ uri: item.memberInfo.imgUrl }} style={styles.userImg} />
          <View style={styles.addressRight}>
            <Text style={styles.userName}>{decodeURI(item.memberInfo.nickName)}</Text>
            <Text style={styles.userAddress}>
              {item.provinceName}{item.cityName}{item.districtName}{item.address}
            </Text>
          </View>
        </View>
        <SpotLine />
      </View>
    );
  }
  _renderList() {
    const { item } = this.state;
    return (
      <View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>服务详情</Text>
          <View style={styles.listRight}>
            <View style={styles.listType}>
              <View style={styles.listTypeBg}>
                <Text style={styles.listTypeName}>
                  {item.demandCategoryName}
                </Text>
              </View>
              <View style={styles.price}>
                <View style={styles.priceIcon}>
                  <Icon name="logo-usd" style={styles.priceText} />
                </View>
                <Text style={styles.priceValue}>{item.servicesPrice ? `${item.servicesPrice}元` : '再议'}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>服务详情</Text>
          <View style={styles.listRight}>
            <Text style={styles.listText}>{item.detail}</Text>
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>截止时间</Text>
          <View style={styles.listRight}>
            <Text style={styles.listText}>{item.closingDate.substr(0, 10)}</Text>
          </View>
        </View>
        <TitleItem
          text="相关图片"
        />
        <View style={styles.imagesView}>
          {
            item.demandOrderImages && item.demandOrderImages.length > 0 ?
              <ImageLook
                images={item.demandOrderImages.map(list => list.imgUrl)}
              />
              :
              <Text style={styles.imagesText}>发起人没有上传相关图片</Text>
          }
        </View>
      </View>
    );
  }
  render() {
    return (
      <Container>
        <Content>
          {this._renderAddress()}
          {this._renderList()}
        </Content>
      </Container>
    );
  }
}

DemandOrderDetail.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(DemandOrderDetail);
