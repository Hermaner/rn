import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container, Content, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { popRoute } from '../../actions';
import { Header } from '../../components';

class ReviewKnow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
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
  _renderBody() {
    return (
      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>1.我们保证您提供的信息将予以保护，不挪作他用</Text>
        <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>2.个人实名请上传手持身份证正面半身照，身份证正面照，身份证反面照三张图片</Text>
        <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>3.身份证正面照片和反面照片必须为同一证件</Text>
        <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>4.手持证件人物图像与证件人物保持一致，人物要求露脸并保持五官清晰</Text>
        <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>5.证件内容要求文字完整清晰可辩无遮挡</Text>
        <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>6.请上传真实有效的证件照片，有效期至少保持一个月</Text>
        <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>7.审核通过后不支持修改证件，请确定无误后提交审核</Text>
        <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>8.临时身份证，第一代身份证，过期身份证将无法通过审核</Text>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="审核须知" />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._renderBody()}
        </Content>
      </Container>
    );
  }
}

ReviewKnow.propTypes = {
  pop: PropTypes.func,
};
export default connect(null, { pop: popRoute })(ReviewKnow);
