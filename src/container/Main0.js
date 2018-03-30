import React from 'react';
import { View, Text, StyleSheet, AsyncStorage, DeviceEventEmitter } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { Icon } from 'native-base';
import home from '../container/home';
import goods from '../container/goods';
import TabChat from './TabChat';
import mine from '../container/my';
import { Mcolor } from '../utils';
import { SocketObser } from '../components';


const styles = StyleSheet.create({
  tabView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabViewIcon: {
    fontSize: 24,
  },
  tabViewText: {
    fontSize: 12,
  },
  dot: {
    position: 'absolute',
    right: -1,
    top: 5,
    backgroundColor: '#ff0000',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
// @observer
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDot: false,
    };
  }
  componentDidMount() {
    this.offSessionEmit = DeviceEventEmitter.addListener('notifyGetNoReadCount', () => {
      SocketObser.socket.on('notifyGetNoReadCount', (data) => {
        this.setState({
          isDot: data > 0,
        });
      });
    });
  }
  render() {
    const { isDot } = this.state;
    const TabsScreen = TabNavigator(
      {
        Home: {
          screen: home,
        },
        Goods: {
          screen: goods,
        },
        Carts: {
          screen: TabChat,
        },
        Mine: {
          screen: mine,
        },
      },
      {
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused }) => {
            const { routeName } = navigation.state;
            let iconName;
            let name;
            switch (routeName) {
              case 'Home':
                iconName = 'md-cloud-download';
                name = '我要买';
                break;
              case 'Goods':
                iconName = 'md-cloud-upload';
                name = '我要卖';
                break;
              case 'Carts':
                iconName = 'ios-chatbubbles';
                name = '聊生意';
                break;
              case 'Mine':
                iconName = 'ios-person';
                name = '我的';
                break;
              default:
                break;
            }
            return (
              <View style={styles.tabView}>
                <Icon style={[styles.tabViewIcon, { color: focused ? Mcolor : '#666' }]} name={iconName} />
                <Text style={[styles.tabViewText, { color: focused ? Mcolor : '#666' }]}>{name}</Text>
                {
                  isDot && routeName === 'Carts' &&
                  <View style={styles.dot} />
                }
              </View>
            );
          },
          tabBarOnPress: ({ scene: { index, focused }, jumpToIndex }) => {
            if (focused) {
              return;
            }
            if (index === 3) {
              AsyncStorage.getItem('userData', (error, res) => {
                if (res) {
                  global.userData = JSON.parse(res);
                }
              });
            }
            jumpToIndex(index);
          },
        }),
        tabBarOptions: {
          showLabel: false,
          style: {
            backgroundColor: '#F5F1FF',
          },
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
      },
    );
    console.log(TabsScreen)
    return <TabsScreen />;
  }
}
Main.navigationOptions = {
  header: null,
};
export default Main;
