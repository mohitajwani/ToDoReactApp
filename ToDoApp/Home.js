import React, { Component } from 'react';
import {
  Platform, StyleSheet, FlatList, Text,
  View, SafeAreaView, TouchableHighlight, 
  AsyncStorage
} from 'react-native';
import moment from 'moment';

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = { taskList: [] }
  }

  componentDidMount(){
    /*loadData = async() => {
      try {
        let tasks = JSON.parse(await AsyncStorage.getItem('TASKS'));
        console.log(tasks);
        this.state.taskList = tasks;
      } catch (error) {
        // Error saving data
        console.log(error);
      }
    }*/
    AsyncStorage.getItem("TASKS")
    .then(value => {
      this.setState({ "taskList": JSON.parse(value) });
      console.log("componentDidMount : " + JSON.parse(value));
    })
    .done();
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
    console.log(item);
    item.completed = !item.completed
    this.setState({
      
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
                <View style={styles.item}>
                  <Text style={{...styles.title, textDecorationLine:item.completed?'line-through':'none'}}>{item.title}</Text>
                  <Text style={{...styles.itemDescription, textDecorationLine:item.completed?'line-through':'none'}}>{item.description}</Text>
                  <Text style={{...styles.itemTime, textDecorationLine:item.completed?'line-through':'none'}}>Created on {moment.unix(item.time).format("DD MMM, h:mmA")}</Text>
                </View>
                <View style={styles.separator} />
              </View>
            </TouchableHighlight>
          }
          keyExtractor={(item, index) => index.toString()}
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
  },
  itemDescription: {
    margin: 5,
    fontSize: 18,
    alignItems: 'flex-start',
  },
  itemTime: {
    margin: 5,
    fontSize: 18,
    alignItems: 'flex-start',
  },
  title: {
    margin: 5,
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'flex-start',
  },
  separator: {
    height: 1,
    backgroundColor: '#000',
    alignItems: 'stretch',
  },
});
