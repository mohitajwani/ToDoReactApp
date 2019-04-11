/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomePage from './Home.js'
import AddTaskPage from './AddTask.js'

const RootStack = createStackNavigator(
  {
    Home: HomePage,
    AddTask: AddTaskPage,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />
  }
}