import React from 'react';
import { TouchableOpacity, View, BackHandler } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { CachedImage } from 'react-native-img-cache';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, TFeedback, Loading } from '../../components';
import { pushRoute, popRoute, resetHome } from '../../actions';
import Base from './base';
import styles from './styles';

class AdjectiveInfo extends Base {
  constructor(props) {
    super(props);
    const { userType } = this.props.navigation.state.params;
    console.log(userType);
    this.state = {
      ...this.state,
      userType,
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
  _renderBody() {
    const { items, userType } = this.state;
    return (
      <View style={styles.pagebody}>
        <View style={styles.pageTitle}>
          <Text style={{ marginRight: 10, color: '#628524', fontSize: 18 }}>您来慧包的目的是</Text>
        </View>
        <View style={styles.identity}>
          <TouchableOpacity onPress={() => { this.identityChange('1'); }}>
            <View style={[styles.identityOne, userType === '1' && styles.isChooseBackground]}>
              <CachedImage
                style={styles.headerImg}
                source={require('../app/resource/imgs/2.png')}
              />
              <Text
                style={[styles.identityText, userType === '1' && styles.isChooseText]}
              >
                我来找货
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { this.identityChange('2'); }}>
            <View style={[styles.identityOne, userType === '2' && styles.isChooseBackground]}>
              <CachedImage
                style={styles.headerImg}
                source={require('../app/resource/imgs/01.png')}
              />
              <Text
                style={[styles.identityText, userType === '2' && styles.isChooseText]}
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
                style={[
                  styles.typeTitleBox,
                  item.cur && styles.typeChoose]}
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
              确定后,您可以在“我的 - 个人设置”页面重新选择您的身份
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
export default connect(null, { pop: popRoute, push: pushRoute, resetHome })(AdjectiveInfo);
