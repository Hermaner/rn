import React from 'react';
import { TouchableOpacity, View, TextInput } from 'react-native';
import { Container, Content, Right, Switch, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header } from '../../components';
import reportDetailPagebase from './base';
import styles from './styles';

class ReportDetailPage extends reportDetailPagebase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
  }
  _renderBody() {
    return (
      <View style={styles.pagebody}>
        <Text style={styles.whyReport}>详细描述</Text>
        <View style={styles.infoBox}>
          <TextInput
            style={styles.inputs}
            multiline
            returnKeyType="search"
            placeholder="详细描述被举报人的恶意行为(必填,最少输入20个字)"
          />
          <Text style={{ textAlign: 'right', color: '#666' }}>0/200</Text>
        </View>
        <Text style={styles.addPz}>上传举报凭证</Text>
        <View style={styles.infoBox2}>
          <View style={{ width: 80, height: 80 }} />
          <Text style={{ flex: 1, color: '#666', fontSize: 14 }}>点击上传举报凭证,增加可信度,最多可上传9张图片</Text>
        </View>
        <View style={styles.shieldThePeople}>
          <Text style={{ color: '#666', fontSize: 14 }}>屏蔽此人</Text>
          <Right>
            <Switch value={false} />
          </Right>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="举报-详细" />
        <Content>
          {this._renderBody()}
          <View style={styles.btnBox}>
            <TouchableOpacity style={styles.submitBtn} onPress={pop}>
              <Text style={styles.submitBtnText}>提交</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

ReportDetailPage.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ReportDetailPage);
