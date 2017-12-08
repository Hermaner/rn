import React from 'react';
import { Text, Image, View, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';

const screenW = Dimensions.get('window').width;
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    width: (screenW / 2) - 15,
    flex: 1,
  },
  image: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 5,
  },
  label: {
    color: 'white',
  },
  numbutton: {
    backgroundColor: '#ff0000',
    borderRadius: 8,
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 4,
  },
  numtext: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
  },
  priceView: {
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  pricetext: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ff0000',
  },
});
export default class TextPut extends React.Component {
  static propTypes = {
    obj: React.PropTypes.object,
    onpress: React.PropTypes.func,
    rowID: React.PropTypes.string,
  };
  constructor(props) {
    super(props);
    console.log(1);
  }
  render() {
    const { obj, onpress, rowID } = this.props;
    const type = (rowID % 2) === 0;
    return (
      <TouchableHighlight
        onPress={onpress}
        style={{ flex: 1, marginLeft: 4, marginRight: type ? 0 : 10, marginBottom: 4 }}
      >
        <View style={styles.button}>
          <Image source={{ uri: obj.imgUrl }} style={styles.image} />
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 16, color: '#333', paddingTop: 5, textAlign: 'center' }}>{obj.carName}</Text>
            <View style={styles.priceView}>
              <View style={styles.numbutton}>
                <Text style={styles.numtext}>{obj.peoples}人</Text>
              </View>
              <Text style={styles.pricetext}>{obj.dayPrice}/天</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
