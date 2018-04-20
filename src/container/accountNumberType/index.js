import React from 'react';
import { TouchableOpacity, View, BackHandler } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import { Container, Content, Text, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header } from '../../components';
import accountNumberTypeBase from './base';
import styles from './styles';

class AccountNumberType extends accountNumberTypeBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getInit();
  }
  componentWillUnmount() {
    this.getDelete();
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  goRoute = (key) => {
    this.props.push(key);
  }
  _renderBody() {
    const { items } = this.state;
    return (
      <View style={styles.pagebody}>
        {
          items.map((item, index) => (
            <TouchableOpacity
              style={styles.rowBox}
              key={index}
              onPress={() => { this.personalAccount(index); }}
            >
              <View style={styles.flexRow}>
                <CachedImage source={item.icnImg} style={styles.icnImg} />
                <Text style={styles.normalSixText}>{item.title}</Text>
              </View>
              <View style={[styles.flexRow, styles.flexRight]}>
                {
                  item.isHave &&
                  <Text style={styles.recommend}>推荐</Text>
                }
                <Text style={styles.normalNineText}>{item.label}</Text>
                <Icon style={{ marginLeft: 6, fontSize: 20, color: '#666' }} name="md-arrow-dropright" />
              </View>
            </TouchableOpacity>
          ))
        }
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="请选择账号类型" />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._renderBody()}
        </Content>
      </Container>
    );
  }
}

AccountNumberType.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(AccountNumberType);
