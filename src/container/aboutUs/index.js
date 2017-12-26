import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Container, Content, Text, Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header } from '../../components';
import AboutUsBase from './base';
import styles from './styles';

class AboutUs extends AboutUsBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
  }
  goRoute = (key) => {
    this.props.push(key);
  }
  _renderBody() {
    return (
      <View style={styles.pagebody}>
        <View style={styles.logoBox}>
          <Image style={styles.logo} source={require('../app/resource/imgs/2.png')} />
        </View>
        <Text style={styles.title}>用科技力量，推动农业产业升级!</Text>
        <View>
          <Input
            style={styles.inputText}
            multiline
            placeholder="我们的成长需要您的建议"
          />
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="关于我们" />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._renderBody()}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>提交</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
            <Text style={{ color: '#666', fontSize: 14 }}>当前版本：</Text>
            <Text style={{ color: '#666', fontSize: 14 }}>v4.6.4</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

AboutUs.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(AboutUs);
