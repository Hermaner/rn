import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Button } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Header, TFeedback } from '../../components';
import base from './base';
import styles from './styles';

class CgSkus extends base {
  constructor(props) {
    super(props);
    const { title, item } = props.navigation.state.params;
    console.log(title, item);
    this.state = {
      ...this.state,
      title,
    };
  }
  componentDidMount() {
  }
  _renderContent() {
    const { lists } = this.state;
    return (
      <View style={styles.maskerContentView}>
        {
          lists.map((items, index) => (
            <View key={index}>
              <View style={styles.maskerTitle}>
                <Text style={styles.maskerTitleText}>{items.title}</Text>
              </View>
              <View style={[styles.fr, { flexWrap: 'wrap' }]}>
                {
                  items.items.map((item, i) => (
                    <TFeedback
                      key={i}
                      content={
                        <View style={[styles.contetnTabView, item.cur && styles.tabCur]}>
                          <Text style={[styles.mainText, item.cur && styles.tabCurText]}>
                            {item.label}
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
    const { push } = this.props;
    return (
      <View style={{ padding: 10, backgroundColor: '#fff' }}>
        <Button onPress={() => { push({ key: 'CgComfirm' }); }} full light style={styles.btn}><Text style={{ color: '#fff' }}>选好了</Text></Button>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    const { title } = this.state;
    return (
      <Container>
        <Header back={pop} title={title} />
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
export default connect(null, { pop: popRoute, push: pushRoute })(CgSkus);
