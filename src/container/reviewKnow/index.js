import React from 'react';
import { BackHandler, View } from 'react-native';
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
        <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>1.您提供的信息仅供慧包网实名认证，不挪作他用</Text>
        <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>2.三证合一的企业请上传有效的统一社会信用代码证件照</Text>
        <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>3.非三证合一企业请上传有效营业执照和组织机构代码证件，两证需齐全</Text>
        <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>4.企业名称，法人代表请于证件上名称保持一致</Text>
        <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>5.证件要求完整清晰无遮挡</Text>
        <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>6.证件上文字清晰可辩</Text>
        <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>7.证件未备案，过期将无法通过审核</Text>
        <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>8.审核通过后，不支持修改，请核实后确认提交</Text>
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
