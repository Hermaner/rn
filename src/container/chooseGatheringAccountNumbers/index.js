import React from 'react';
import { TouchableOpacity, View, BackHandler } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { CachedImage } from 'react-native-img-cache';
import { connect } from 'react-redux';
import { Header, Loading, TFeedback } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import chooseGatheringAccountNumbersBase from './base';
import styles from './styles';

class ChooseGatheringAccountNumbers extends chooseGatheringAccountNumbersBase {
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
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    const { push } = this.props;
    const { items, zhi, card, cardInfo } = this.state;
    console.log(items);
    return (
      <View style={styles.pagebody}>
        {
          items &&
          items.map((item, index) => (
            <TFeedback
              key={index}
              content={
                <View style={styles.flexRow}>
                  <CachedImage style={styles.typeImg} source={item.type === '1' ? zhi : card} />
                  <View>
                    <Text style={styles.accoutTitle}>{item.title}账号({item.name})</Text>
                    {/* <Text style={styles.accoutLabel}>今日还可提现：2000</Text> */}
                  </View>
                  <View style={styles.icnBox}>
                    <Icon style={{ textAlign: 'right', color: '#666', fontSize: 20 }} name="md-arrow-dropright" />
                  </View>
                </View>}
              onPress={() => { push({ key: 'Cash', params: { item: cardInfo[index] } }); }}
            />
          ))
        }
      </View>
    );
  }
  render() {
    const { pop, push } = this.props;
    return (
      <Container>
        <Header back={pop} title="取现" />
        <Content>
          {this._renderBody()}
        </Content>
        <TouchableOpacity style={styles.button} onPress={() => { push({ key: 'AccountNumberType', params: { where: '1' } }); }}>
          <Text style={styles.buttonText}>添加新的收款账号</Text>
        </TouchableOpacity>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

ChooseGatheringAccountNumbers.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ChooseGatheringAccountNumbers);
