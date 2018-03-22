import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container, Content, Input, Text } from 'native-base';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import { TFeedback, Loading, Header, UploadFile, Iconfont, TOpacity } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import { Mred } from '../../utils';
import styles from './styles';
import myBase from './base';

class OrderPay extends myBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getInit();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderHeader() {
    return (
      <View>
        <View style={styles.firstBox}>
          <Input
            style={styles.inputText}
            multiline
            value={this.state.content}
            onChangeText={text => this.saveThinkText(text)}
            placeholder="快来点评一下吧！"
          />
        </View>
      </View>
    );
  }
  renderImg() {
    return (
      <View>
        <Text style={{ fontSize: 14, color: '#333', paddingTop: 10, paddingBottom: 10, paddingLeft: 10 }}>上传照片：</Text>
        <View style={styles.imgBox}>
          <UploadFile
            getImages={this.getImages}
            label="(选填)最多上传4张照片"
            imageCount={4}
          />
        </View>
      </View>
    );
  }
  renderGoods() {
    const { array } = this.state;
    return (
      <View>
        <Text style={{ fontSize: 14, color: '#333', paddingTop: 10, paddingBottom: 10, paddingLeft: 10 }}>对商品评分：</Text>
        <View style={styles.thinkBtn}>
          {
            array.map((item, index) => (
              <TFeedback
                key={index}
                content={
                  <View style={[styles.thinkBox, item.isClick === 1 ? styles.backGroundChoose : '']}>
                    <Iconfont style={[{ fontSize: 20, color: '#666', marginRight: 6 }, item.isClick === 1 ? styles.textChoose : '']} name={item.icn} />
                    <Text style={[styles.text, item.isClick === 1 ? styles.textChoose : '']}>{item.title}</Text>
                  </View>}
                onPress={() => { this.chooseGoodsThink(index); }}
              />
            ))
          }
        </View>
      </View>
    );
  }
  renderBusiness() {
    const { starCount } = this.state;
    return (
      <View style={styles.businessBox}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: '#333', marginRight: 10 }}>对卖家评价：</Text>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <StarRating
              starSize={26}
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half'}
              iconSet={'Ionicons'}
              starColor={Mred}
              maxStars={5}
              rating={starCount}
              selectedStar={rating => this.onStarRatingPress(rating)}
            />
          </View>
        </View>
      </View>
    );
  }
  renderType() {
    const { typeInfo } = this.state;
    return (
      <View style={styles.typeBox}>
        <View style={styles.flexRow}>
          {
            typeInfo &&
            typeInfo.length > 0 &&
            typeInfo.map((item, index) => (
              <TOpacity
                key={index}
                style={{ marginRight: 10 }}
                content={
                  <View style={[styles.oneBox, item.cur ? styles.oneBoxChoose : '']}>
                    <Text style={[styles.oneText, item.cur ? styles.oneTextChoose : '']}>{item.name}</Text>
                  </View>
                }
                onPress={() => this.chooseOne(item.evaluatFiledId)}
              />
            ))
          }
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header
          back={pop}
          title="订单评价"
        />
        <Content>
          {this._renderHeader()}
          {this.renderImg()}
          {this.renderGoods()}
          {this.renderBusiness()}
          {this.renderType()}
        </Content>
        <TFeedback
          content={
            <View style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
              <View style={styles.BtnBox}>
                <Text style={{ fontSize: 14, color: '#fff', textAlign: 'center' }}>提交评价</Text>
              </View>
            </View>}
          onPress={() => { this.CreateSupplyEvaluatService(); }}
        />
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

OrderPay.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(OrderPay);
