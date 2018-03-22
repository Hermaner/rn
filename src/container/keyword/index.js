import React from 'react';
import { TouchableOpacity, View, BackHandler } from 'react-native';
import { Container, Content, Text, Switch } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header } from '../../components';
import keywordBase from './base';
import styles from './styles';

class Keyword extends keywordBase {
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
    const { push } = this.props;
    return (
      <View style={styles.pagebody}>
        <View style={styles.topBox}>
          <Text style={styles.topText}>提示：推送关键词来源于您发布的供应信息，系统将向您推送以下几类商机</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.goodsName}>八月瓜</Text>
          <View style={styles.flexOne}>
            <Text style={styles.goodsText}>品种：哈哈</Text>
            <Text style={styles.goodsText}>产地：河北省</Text>
          </View>
          <Text style={styles.goodsText}>供货范围：全国</Text>
        </View>
        <View style={[styles.box, styles.flex, styles.minHeight]}>
          <Text style={{ color: '#666', fontSize: 14 }}>推送要求：</Text>
          <Text style={{ flex: 1, color: '#666', fontSize: 14 }}>城市地产弄虚作假年级课</Text>
        </View>
        <View style={[styles.btnList, styles.flexOne]}>
          <Switch style={{ flex: 1 }} value={false} />
          <TouchableOpacity onPress={() => { push({ key: 'KeywordReturn' }); }}>
            <View style={styles.btnBox}>
              <Text style={styles.btnText}>修改</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="关键词" />
        <Content contentContainerStyle={{ flex: 1 }}>
          {this._renderBody()}
          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonBox}>
              <Text style={styles.buttonText}>发供应</Text>
            </View>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

Keyword.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(Keyword);
