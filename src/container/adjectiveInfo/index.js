import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Container, Content, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, TFeedback, Loading } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import Base from './base';
import styles from './styles';

class AdjectiveInfo extends Base {
  constructor(props) {
    super(props);
    const { type } = this.props.navigation.state.params;
    console.log(type);
    this.state = {
      ...this.state,
      type,
    };
  }
  componentDidMount() {
    this.getInit();
  }
  goRoute = (key) => {
    this.props.push(key);
  }
  _renderBody() {
    const { items, type } = this.state;
    return (
      <View style={styles.pagebody}>
        <View style={styles.pageTitle}>
          <Text style={{ marginRight: 10, color: '#628524', fontSize: 18 }}>您来惠农的目的是</Text>
        </View>
        <View style={styles.identity}>
          <TouchableOpacity onPress={() => { this.identityChange('1'); }}>
            <View style={[styles.identityOne, type === '1' && styles.isChooseBackground]}>
              <Image
                style={styles.headerImg}
                source={{ uri: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG' }}
              />
              <Text
                style={[styles.identityText, type === '1' && styles.isChooseText]}
              >
                我来找货
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { this.identityChange('2'); }}>
            <View style={[styles.identityOne, type === '2' && styles.isChooseBackground]}>
              <Image
                style={styles.headerImg}
                source={{ uri: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG' }}
              />
              <Text
                style={[styles.identityText, type === '2' && styles.isChooseText]}
              >
                我来卖货
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.typeChooseTitleBox}>
          <Text style={styles.typeChooseTitle}>请从下方选择身份，方便为您提供精准服务</Text>
        </View>
        <View style={styles.typeBox}>
          {
            items.map((item, index) => (
              <TouchableOpacity
                style={[styles.typeTitleBox, item.cur && styles.typeChoose]}
                key={index}
                onPress={() => this.userIdentity(index)}
              >
                <Text style={[styles.typeTitle, { color: item.cur ? '#fff' : '#666' }]}>{item.identityName}</Text>
              </TouchableOpacity>
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
        <Header back={pop} title="完善信息" />
        <Content>
          {this._renderBody()}
          <TFeedback
            content={
              <View style={styles.button}>
                <Text style={styles.buttonText}>提交</Text>
              </View>}
            onPress={this.submitData}
          />
          <View style={styles.prompt}>
            <Text style={styles.promptInfo}>
              确定后,您可以在“我的＆gt个人设置”页面重新选择您的身份
            </Text>
          </View>
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

AdjectiveInfo.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
  navigation: PropTypes.object,
};
export default connect(null, { pop: popRoute, push: pushRoute })(AdjectiveInfo);
