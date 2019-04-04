/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform, StyleSheet, FlatList, Text,
  View, SafeAreaView, TouchableHighlight,
  AsyncStorage
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  onPressNote = (item) => {
    this.setState({
      count: this.state.count + 1
      //item uuid4
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList style={{ flex: 1, width: '100%' }}
          data={[
            { title: 'Devin', description: 'Devin\'s Description' },
            { title: 'Jackson', description: 'Jackson\'s Description' },
            { title: 'James', description: 'James\'s Description' },
            { title: 'Joel', description: 'Joel\'s Description' },
            { title: 'John', description: 'John\'s Description' },
            { title: 'Jillian', description: 'Jillian\'s Description' },
            { title: 'Jimmy', description: 'Jimmy\'s Description' },
            { title: 'Julie', description: 'Julie\'s Description' },
            { title: 'Rocky', description: 'Rocky\'s Description' },
            { title: 'Arnold', description: 'Arnold\'s Description' },
            { title: 'Rob', description: 'Rob\'s Description' },
          ]}
          renderItem={({ item }) =>
            <TouchableHighlight
              underlayColor='#CCCCCC'
              onPress={(e) => this.onPressNote(item)}
            >
              <View>
                <Text style={styles.item}>{item.title}</Text>
                <Text style={styles.item}>{item.description}</Text>
                <View style={styles.separator} />
              </View>
            </TouchableHighlight>
          }
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    alignItems: 'flex-start',
  },
  separator: {
    height: 1,
    backgroundColor: '#000',
    alignItems: 'stretch',
  },
});
