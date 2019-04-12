import React, { Component } from 'react';
import {Platform, StyleSheet, Text, TextInput, View, SafeAreaView, TouchableHighlight, AsyncStorage} from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import uuid4 from 'uuid4';
import moment from 'moment';

class AddTask extends Component{
    static navigationOptions = {
    headerTitle: 'Add Task',
  };

    constructor(props) {
        super(props);
        this.state = { title: '', description: '' };
    }

    onPressSave = async() => {
      //Save to AsyncStorage
      if (this.state.title === '' || this.state.title.trim() === '') {
        //Show error
        alert('Please enter a valid title!')
      } else {
        //Save the task
        let todo = {}
        todo.id = uuid4();
        todo.title = this.state.title;
        todo.description = this.state.description;
        todo.time = moment().unix();
        todo.completed = false;
        try {
          let tasks = JSON.parse(await AsyncStorage.getItem('TASKS'));
          console.log(tasks);
          if (tasks === null) {
            tasks = [];
          }
          tasks.push(todo);
          try {
            await AsyncStorage.setItem('TASKS', JSON.stringify(tasks));

          } catch (error) {
            // Error saving data
            console.log(error);
          }
        } catch (error) {
          // Error retrieving data
            console.log(error);
        }
        this.props.navigation.navigate('Home')
      }
    }

    render() {
        return (
          <SafeAreaView style={styles.container}>
            <TextInput style={styles.titleTextInput}
              placeholder="Title"
              onChangeText={(text)=>{this.state.title = text}}
            />
            <TextInput style={styles.descriptionTextInput}
              placeholder="Description"
              onChangeText={(text)=>{this.state.description = text}}
              multiline = {true}
              numberOfLines = {4}
            />
            <View style={{height: 100}} />
            <TouchableHighlight
              underlayColor='#DDDDDD'
              style={styles.saveButtonContainer}
              onPress={this.onPressSave}
            >
              <Text style={styles.saveButton}> Save </Text>
            </TouchableHighlight>
          </SafeAreaView>
        );
    }
}

export default AddTask;

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
  saveButtonContainer: {
    padding: 10,
    width: '60%',
    backgroundColor: '#888888',
    alignItems: 'center',
  },
  saveButton: {
    fontSize: 24,
    alignItems: 'center',
    color: '#000',    
  },
  titleTextInput: {
    fontSize: 24,
    width: '60%',
    fontWeight: 'bold',
    color: '#000',    
  },
  descriptionTextInput: {
    fontSize: 24,
    width: '60%',
    color: '#000',    
  },
});
