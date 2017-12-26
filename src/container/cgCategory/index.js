import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Button } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Header, TFeedback } from '../../components';
import base from './base';
import { Global } from '../../utils';
import styles from './styles';

class CgCategory extends base {
  constructor(props) {
    super(props);
    const items = Global.items[Global.firstIndex].childs[Global.secondIndex];
    this.state = {
      ...this.state,
      items: items.brands || [],
      title: items.name,
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
            <TFeedback
              key={index}
              content={
                <View style={[styles.contetnTabView, item.cur && styles.tabCur]}>
                  <Text style={[styles.mainText, item.cur && styles.tabCurText]}>
                    {item.brandName}
                  </Text>
                </View>}
              onPress={() => this.goNext(index)}
            />
          ))
        }
      </View>
    );
  }
  _renderButton() {
    return (
      <View style={{ padding: 10, backgroundColor: '#fff' }}>
        <Button onPress={this.goNextWidthOut} full light style={{ borderWidth: 1, borderColor: '#ddd' }}><Text style={{ color: '#999' }}>品种不限</Text></Button>
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

CgCategory.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(CgCategory);
