import React, { Component } from 'react';
import {
  Platform, StyleSheet, FlatList, Text,
  View, SafeAreaView, TouchableHighlight, 
  AsyncStorage
} from 'react-native';

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = { taskList: [] }
  }

  componentDidMount(){
    loadData = async() => {
      try {
        let tasks = JSON.parse(await AsyncStorage.getItem('TASKS'));
        console.log(tasks);
        this.state.taskList = tasks;
      } catch (error) {
        // Error saving data
        console.log(error);
      }
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Tasks',
      headerRight: (
        <TouchableHighlight
          onPress={() => navigation.navigate('AddTask')}
        >
        <Text style={{padding: 5, color: '#000000'}}> Add Task </Text>
        </TouchableHighlight>
      )
    }
  };

  onPressAddNote = (item) => {
    this.props.navigation.navigate('AddTask')
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
          data={this.state.taskList}
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

export default Home;

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
