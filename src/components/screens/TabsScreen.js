import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import createDumbStack from './createDumbStack';

const TabsScreen = (navigationOptions = {}, DumbStack = createDumbStack()) => TabNavigator(
  {
    Home: {
      screen: DumbStack,
    },
    Links: {
      screen: DumbStack,
    },
    Settings: {
      screen: DumbStack,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      ...navigationOptions,
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = `ios-information-circle${focused ? '' : '-outline'}`;
            break;
          case 'Links':
            iconName = `ios-link${focused ? '' : '-outline'}`;
            break;
          case 'Settings':
            iconName = `ios-options${focused ? '' : '-outline'}`;
            break;
          default:
            break;
        }
        return (
          <View><Text>{iconName}</Text></View>
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: '#6b52ae',
      ...navigationOptions.tabBarOptions,
      style: {
        backgroundColor: '#F5F1FF',
        ...(navigationOptions.tabBarOptions ? navigationOptions.tabBarOptions.style : {}),
      },
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: true,
  },
);
TabsScreen.propTypes = {
  push: PropTypes.func,
};
export default TabsScreen();
