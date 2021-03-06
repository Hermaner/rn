import React from 'react';
import { View, BackHandler } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import { Container, Content, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, TFeedback } from '../../components';
import styles from './styles';

class WhyChoose extends React.Component {
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
        <Text style={styles.noun}>请选择当前您进入慧包的目的</Text>
        <Text style={{ color: '#999', fontSize: 14, textAlign: 'center', marginBottom: 15 }}>方便为您提供精准服务</Text>
        <View style={styles.lookForGoods}>
          <TFeedback
            content={
              <View>
                <View style={styles.imgBox}>
                  <CachedImage style={styles.lookForImg} source={require('../app/resource/imgs/2.png')} />
                </View>
                <View style={styles.lookForBtn}>
                  <Text style={styles.lookForText}>我来找货</Text>
                </View>
              </View>}
            onPress={() => { push({ key: 'AdjectiveInfo', params: { type: '1', name: '' } }); }}
          />
        </View>
        <View style={styles.orBox}>
          <View style={{ width: 100, height: 1, borderWidth: 1, borderColor: '#eee', marginRight: 40 }} />
          <Text style={{ color: '#666' }}>或</Text>
          <View style={{ width: 100, height: 1, borderWidth: 1, borderColor: '#eee', marginLeft: 40 }} />
        </View>
        <View>
          <TFeedback
            content={
              <View>
                <View style={styles.imgBox}>
                  <CachedImage style={styles.lookForImg} source={require('../app/resource/imgs/01.png')} />
                </View>
                <View style={styles.sellBtn}>
                  <Text style={styles.lookForText}>我来卖货</Text>
                </View>
              </View>}
            onPress={() => { push({ key: 'AdjectiveInfo', params: { type: '2', name: '' } }); }}
          />
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="目的选择" />
        <Content contentContainerStyle={{ flex: 1 }}>
          {this._renderBody()}
        </Content>
      </Container>
    );
  }
}

WhyChoose.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(WhyChoose);
