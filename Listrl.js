import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  AsyncStorage,
  TextInput,
  Button,
  Alert,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
let SampleArray = [];
let text = '';
export default class List4 extends Component {
  constructor() {
    super();

    this.state = {
      textInputData: '',
      getValue: '',
    };
  }

  setValueLocally = () => {
    AsyncStorage.setItem('Key_27', JSON.stringify(this.state.textInputData));
    Alert.alert('Value Stored Successfully.');
    //const newIds = this.state.textInputData.concat(text);
    //AsyncStorage.setItem('Key_27', JSON.stringify(newIds));
    if (this.state.getValue !== null) {
      AsyncStorage.setItem(
        'Key_27',
        JSON.stringify(this.state.getValue.concat(this.state.textInputData)),
      );
    } else {
      AsyncStorage.setItem('Key_27', JSON.stringify(this.state.textInputData));
    }
  };

  getValueLocally = () => {
    AsyncStorage.getItem('Key_27').then(value =>
      this.setState({getValue: JSON.parse(value)}),
    );
    SampleArray.push(this.state.getValue);
  };

  render() {
    text = this.props.navigation.getParam('text', 'nothing sent3');
    SampleArray.push(text);
    return (
      <View style={styles.MainContainer}>
        <ScrollView style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() =>
              this.setState({
                textInputData: SampleArray,
              })
            }
            activeOpacity={0.7}
            style={styles.button}>
            <Text style={styles.buttonText}> VALUE LOCALLY </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.setValueLocally}
            activeOpacity={0.7}
            style={styles.button}>
            <Text style={styles.buttonText}> SAVE VALUE LOCALLY </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.getValueLocally}
            activeOpacity={0.7}
            style={styles.button}>
            <Text style={styles.buttonText}> GET VALUE LOCALLY SAVED </Text>
          </TouchableOpacity>
          <Text style={styles.text}>{this.state.getValue}</Text>
          <FlatList
            style={styles.flat}
            data={this.state.getValue}
            renderItem={({item}) => <Text>{item}</Text>}
            keyExtractor={item => item.id}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },

  TextInputStyle: {
    textAlign: 'center',
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#028b53',
    borderRadius: 10,
  },

  button: {
    width: '100%',
    height: 40,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 7,
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },

  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  flat: {
    fontSize: 20,
    width: '100%',
  },
});
