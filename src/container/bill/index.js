import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Container, Content, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header } from '../../components';
import billBase from './base';
import styles from './styles';

class Bill extends billBase {
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
        <Text style={styles.contant}>用科技力量，推动农业产业升级!</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>了解在线交易</Text>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="账单" />
        <Content contentContainerStyle={{ flex: 1 }} style={{ backgroundColor: '#fff' }}>
          {this._renderBody()}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.returnIndex} onPress={pop}>
              <Text style={styles.btnText}>显示近半年账单</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactService} onPress={pop}>
              <Text style={styles.btnText}>显示最近1年账单</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

Bill.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(Bill);
