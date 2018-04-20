import React from 'react';
import { TouchableOpacity, View, BackHandler } from 'react-native';
import { Container, Content, Text, Icon } from 'native-base';
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
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getData();
  }
  componentWillUnmount() {
    this.getDelete();
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    return (
      <View style={styles.pagebody}>
        <View style={styles.rowBox}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, color: '#333' }}>收入</Text>
            <Text style={{ fontSize: 12, color: '#666' }}>2018-33</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>-0.1</Text>
            <Icon name="md-arrow-dropright" style={{ fontSize: 18, color: '#666', marginLeft: 20 }} />
          </View>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="账单" />
        <Content>
          {this._renderBody()}
        </Content>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.returnIndex} onPress={pop}>
            <Text style={styles.btnText}>显示近半年账单</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactService} onPress={pop}>
            <Text style={styles.btnText}>显示最近1年账单</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

Bill.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(Bill);
