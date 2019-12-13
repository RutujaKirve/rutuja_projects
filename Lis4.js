import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
  TextInput,
  Button,
  Alert,
  Text,
  ListView,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
let SampleArray = [];
let SampleArray2 = [];
let text = '';
export default class List2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textInputData: '',
      getValue: '',
    };
  }
  SampleFunction = item => {
    Alert.alert(item);
  };
  setValueLocally = () => {
    // AsyncStorage.setItem('Key_27', JSON.stringify(this.state.textInputData));
    Alert.alert('Value Stored Successfully.');
    //const newIds = this.state.textInputData.concat(text);
    //AsyncStorage.setItem('Key_27', JSON.stringify(newIds));
    if (this.state.getValue !== null) {
      AsyncStorage.setItem(
        'Key_27',
        JSON.stringify(this.state.getValue.concat(this.state.textInputData)),
      );
    } else {
      AsyncStorage.setItem(
        'Key_27',
        SampleArray2.push(JSON.stringify(this.state.textInputData)),
      );
    }
  };

  getValueLocally = () => {
    SampleArray.length = '0';
    AsyncStorage.getItem('Key_27').then(value =>
      this.setState({getValue: JSON.parse(value)}),
    );
    SampleArray2.length = '0';
    SampleArray2.push(this.state.getValue);
    if (this.state.getValue !== null) {
      SampleArray2.concat(this.state.getValue);
    } else {
    }
  };
  SetArray = () => {
    this.getValueLocally();
    SampleArray.push(text);
  };
  render() {
    text = this.props.navigation.getParam('text', 'nothing sent3');
    return (
      <View style={styles.MainContainer}>
        <ScrollView style={{flexDirection: 'column'}}>
          <TouchableOpacity
            onPress={this.SetArray}
            activeOpacity={0.7}
            style={styles.button}>
            <Text style={styles.buttonText}> VALUE </Text>
          </TouchableOpacity>
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
            data={SampleArray2}
            renderItem={({item}) => <Text>{this.state.getValue}</Text>}
            keyExtractor={item => item.id}
          />
          {SampleArray2.map((item, key) => (
            <Text
              key={key}
              style={styles.TextStyle}
              onPress={this.SampleFunction.bind(this, item)}>
              {' '}
              {item}{' '}
            </Text>
          ))}
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
  },
});
