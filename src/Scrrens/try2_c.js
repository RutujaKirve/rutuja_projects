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
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
let SampleArray = [];
let SampleArray2 = ['on'];
let text = '';
let value2 = '';
let value = '';
export default class try2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textInputData: '',
      getValue: '',
      animate: true,
    };
  }
  getArray = async () => {
    await AsyncStorage.setItem(
      '@MySuperStore:key',
      JSON.stringify(SampleArray2),
    ),
      AsyncStorage.getItem('@MySuperStore').then(value => {
        getValue: JSON.parse(value);
      });

    value = await AsyncStorage.getItem('@MySuperStore:key');
    SampleArray2.push(value);

    await AsyncStorage.setItem(
      '@MySuperStore:key',
      JSON.stringify(SampleArray2),
    ),
      AsyncStorage.getItem('@MySuperStore').then(value => {
        getValue: JSON.parse(value);
      });
  };

  render() {
    this.getArray();
    text = this.props.navigation.getParam('text', 'nothing sent3');
    //this.getArray();
    return (
      <View style={styles.MainContainer}>
        <ScrollView style={{flexDirection: 'column'}}>
          <ActivityIndicator
            size="large"
            color="#0000ff"
            animating={this.state.animate}
          />
          <Text style={styles.text}>{this.state.getValue}</Text>
          <FlatList
            style={styles.flat}
            data={SampleArray2}
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
    color: '#808080',
  },
  flat: {
    fontSize: 20,
  },
});
