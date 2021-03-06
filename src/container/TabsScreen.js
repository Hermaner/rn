import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { Icon } from 'native-base';
import home from '../container/home';
import goods from '../container/goods';
import TabChat from './TabChat';
import mine from '../container/my';
import { Iconfont } from '../components';

import { Mcolor } from '../utils';

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
});
const TabsScreen = (navigationOptions = {}) => TabNavigator(
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
      ...navigationOptions,
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        let name;
        switch (routeName) {
          case 'Home':
            iconName = 'icon-baoguofahuo';
            name = '我要买';
            break;
          case 'Goods':
            iconName = 'icon-peizaizhuangche';
            name = '我要卖';
            break;
          case 'Carts':
            iconName = 'icon-liaotianduihua';
            name = '聊生意';
            break;
          case 'Mine':
            iconName = 'icon-yonghu';
            name = '我的';
            break;
          default:
            break;
        }
        return (
          <View style={styles.tabView}>
            <Iconfont style={[styles.tabViewIcon, { color: focused ? Mcolor : '#666' }]} name={iconName} />
            <Text style={[styles.tabViewText, { color: focused ? Mcolor : '#666' }]}>{name}</Text>
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
TabsScreen.propTypes = {
  push: PropTypes.func,
};
export default TabsScreen();
