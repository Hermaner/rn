import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Content, Input } from 'native-base';
import { connect } from 'react-redux';
import StarRating from 'react-native-star-rating';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TOpacity, Header, UploadFile, CheckBox } from '../../components';
import base from './base';
import styles from './styles';
import { Mcolor } from '../../utils';

class OrderEval extends base {
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
  _renderTop() {
    const { types, typeId, content } = this.state;
    return (
      <View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>整体评价</Text>
          <View style={styles.listRight}>
            <View style={styles.typeView}>
              {
                types.map((item, index) => (
                  <CheckBox
                    key={index}
                    content={
                      <View style={styles.typeList}>
                        <Text style={styles.typeText}>{item.label}</Text>
                      </View>
                    }
                    style={{ flex: 1 }}
                    value={item.value}
                    isRadio
                    isAn
                    color="#ff0000"
                    onPress={this.backCheck}
                    modal={typeId}
                  />
                ))
              }
            </View>
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>服务描述</Text>
          <View style={styles.listRight}>
            <Input
              multiline
              style={styles.listMemo}
              placeholderTextColor="#999"
              placeholder="输入服务描述"
              clearButtonMode="while-editing"
              value={content}
              onChangeText={value => this.setState({ content: value })}
            />
          </View>
        </View>
        <View style={styles.UpView}>
          <UploadFile
            getImages={this.getImages}
            label="(选填)最多上传10张照片(可不传)"
            imageCount={10}
          />
        </View>
      </View>
    );
  }
  _renderStar() {
    const { attitudeScore, qualityScore } = this.state;
    return (
      <View>
        <View style={styles.starView}>
          <Text style={styles.listLabel}>服务态度</Text>
          <View style={styles.starRight}>
            <StarRating
              starSize={26}
              emptyStarColor={Mcolor}
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half'}
              iconSet={'Ionicons'}
              starColor={Mcolor}
              maxStars={5}
              selectedStar={val => this.setState({
                attitudeScore: val,
              })}
              rating={attitudeScore}
            />
          </View>
          <Text style={styles.starLab}>
            {attitudeScore === 1 ? '非常差' : attitudeScore === 1 ? '非常差' : attitudeScore === 2 ? '差' : attitudeScore === 3 ? '一般' : attitudeScore === 4 ? '好' : attitudeScore === 5 ? '非常好' : ''}
          </Text>
        </View>
        <View style={styles.starView}>
          <Text style={styles.listLabel}>服务质量</Text>
          <View style={styles.starRight}>
            <StarRating
              starSize={26}
              emptyStarColor={Mcolor}
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half'}
              iconSet={'Ionicons'}
              starColor={Mcolor}
              maxStars={5}
              selectedStar={val => this.setState({
                qualityScore: val,
              })}
              rating={qualityScore}
            />
          </View>
          <Text style={styles.starLab}>
            {qualityScore === 1 ? '非常差' : qualityScore === 1 ? '非常差' : qualityScore === 2 ? '差' : qualityScore === 3 ? '一般' : qualityScore === 4 ? '好' : qualityScore === 5 ? '非常好' : ''}
          </Text>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="订单评价" />
        <Content style={styles.content}>
          {this._renderTop()}
          {this._renderStar()}
          <TOpacity
            style={styles.btnView}
            content={
              <Text style={styles.btnText}>发表评价</Text>
            }
            onPress={this.CreateOrderEvaluateService}
          />
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

OrderEval.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(OrderEval);
