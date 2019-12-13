import React, {Component} from 'react';
import SyncStorage from 'sync-storage';
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
  Image,
} from 'react-native';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

let SampleArray = [];
let SampleArray2 = [];
let text = '';
let value2 = '';
let value = '';
let movies2 = [];
//let newIds = [];
export default class Getlist extends Component {
  constructor() {
    super();

    this.state = {
      textInputData: '',
      getValue: '',
      animate: true,
      newIds: [],
    };
  }
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          margin: 10,
          height: 0.5,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
  };
  getArray = async () => {
    await AsyncStorage.getItem('savedIds', (err, result) => {
      console.log('Data Found', result);
      this.state.newIds = JSON.parse(result);
      this.setState({newIds: JSON.parse(result)});
      this.setState({animate: false});
    });
    if (this.state.newIds.length === 0) {
      this.setState({getValue: 'No data found'});
    } else {
      this.setState({getValue: this.state.newIds.length});
    }
  };
  getValueLocally = async () => {
    if (this.state.newIds !== null) {
      await AsyncStorage.getItem('savedId', (err, result) => {
        this.setState({newIds: JSON.parse(result)});
      });
    }
  };
  getarray2 = async id => {
    AsyncStorage.setItem('savedId', JSON.stringify(id)).then(
      await AsyncStorage.getItem('savedId', (err, result) => {
        this.setState({newIds: JSON.parse(result)});
      }),
    );
  };
  deleteitem(index) {
    const checked = this.state.newIds;
    const values = checked.indexOf(index);
    checked.splice(values, 1);
    this.setState({newIds: checked});
    AsyncStorage.setItem('savedIds', JSON.stringify(this.state.newIds));
    if (this.state.newIds.length === 0) {
      this.setState({getValue: 'No data found'});
    } else {
      this.setState({getValue: this.state.newIds.length});
    }
  }

  componentDidMount(): void {
    this.getArray();
  }

  render() {
    //text = this.props.navigation.getParam('text', 'nothing sent3');
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
            data={this.state.newIds}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({item}) => (
              <View style={{flex: 1, flexDirection: 'column'}}>
                <TouchableOpacity
                  style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image source={{uri: item}} style={styles.images} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{justifyContent: 'center', alignItems: 'center'}}
                  onPress={() => this.deleteitem(item)}>
                  <Image
                    source={require('../assest/baseline_delete_black_18dp.png')}
                    style={{height: 30, width: 30}}
                  />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },

  TextInputStyle: {
    textAlign: 'center',
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#028b53',
    borderRadius: 10,
  },
  images: {
    height: 70,
    width: 70,
    borderColor: '#028b53',
    justifyContent: 'center',
    alignItems: 'center',
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
