import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Button } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute, resetTo, resetHome } from '../../actions';
import { Header, TFeedback } from '../../components';
import base from './base';
import { Global } from '../../utils';
import styles from './styles';

class CgSkus extends base {
  constructor(props) {
    super(props);
    const data = Global.items[Global.firstIndex].childs[Global.secondIndex];
    const items = data.specTypes || [];
    let isBtnGray = false;
    if (Global.skuType === '3' || Global.skuType === '4') {
      items.forEach((item) => {
        if (item.itemIndex === undefined) {
          isBtnGray = true;
        }
      });
    }
    this.state = {
      ...this.state,
      isBtnGray,
      items,
    };
  }
  componentDidMount() {
  }
  _renderContent() {
    const { items } = this.state;
    return (
      <View style={styles.maskerContentView}>
        {
          items.map((item, index) => (
            <View key={index}>
              <View style={styles.maskerTitle}>
                <Text style={styles.maskerTitleText}>{item.specTypeName}</Text>
              </View>
              <View style={[styles.fr, { flexWrap: 'wrap' }]}>
                {
                  item.specs.map((spec, i) => (
                    <TFeedback
                      key={i}
                      content={
                        <View style={[styles.contetnTabView, spec.cur && styles.tabCur]}>
                          <Text style={[styles.mainText, spec.cur && styles.tabCurText]}>
                            {spec.specName}
                          </Text>
                        </View>}
                      onPress={() => { this.tabView(index, i); }}
                    />
                  ))
                }
              </View>
            </View>
          ))
        }
      </View>
    );
  }
  _renderButton() {
    const { isBtnGray } = this.state;
    console.log(isBtnGray)
    return (
      <View style={{ padding: 10, backgroundColor: '#fff' }}>
        <Button onPress={this.goCgComfirm} full light style={[styles.btn, isBtnGray && styles.grayBtn]}><Text style={{ color: '#fff' }}>选好了</Text></Button>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="选择规格" />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._renderContent()}
        </Content>
        {this._renderButton()}
      </Container>
    );
  }
}

CgSkus.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute, resetTo, resetHome })(CgSkus);
