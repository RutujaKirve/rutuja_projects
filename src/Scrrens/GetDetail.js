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
  PermissionsAndroid,
} from 'react-native';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import RNFetchBlob from 'rn-fetch-blob';
let SampleArray = [];
let SampleArray2 = [];
let text = '';
let value2 = '';
let url = '';
let press = '';
let value = '';
let movies2 = [];
//let newIds = [];
let newIds = [];
export default class GetDetail extends Component {
  constructor() {
    super();

    this.state = {
      textInputData: '',
      getValue: '',
      title: '',
      animate: true,
      url: '',
    };
  }
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: navigation.getParam('Title', 'GetDetail page'),
      //Default Title of ActionBar
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', '#087C00'),
        //Background color of ActionBar
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
      //Text color of ActionBar
      headerLeft: (
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{
              uri:
                'https://secure.gravatar.com/avatar/dbbab0050db2dbd84d4e2c844196ee0c?s=60&d=mm&r=g',
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 40 / 2,
              marginLeft: 15,
            }}
          />
        </View>
      ),

      headerRight: (
        <TouchableOpacity  onPress={() => params.handleSave().bind()}>
          <View style={styles.MainContainer}>
            <Image
              source={{
                uri:
                  'data:image/png;base64,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',
              }}
              style={styles.imageStyle}
            />
          </View>
        </TouchableOpacity>
      ),
      //navigation.state.params && navigation.state.params.headerRight,
    };
  };
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
    text = this.props.navigation.getParam('url1', 'nothing sent');
    this.setState({url: text});
    value2 = this.props.navigation.getParam('text1', 'nothing sent');
    this.setState({title: value2});
    //this.SetArray(text, value2);
    url = this.props.navigation.getParam('url2', 'nothing sent');
  };
  componentDidMount(): void {
    this.getArray();
    this.props.navigation.setParams({handleSave: this.SetArray(text, value2)});
    /*this.props.navigation.setParams({
      headerRight: this.setHeaderRight(this.state.secureTextEntry),
    });*/
  }
  SetArray = async (title, title2) => {
    /* this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    });
    this.props.navigation.setParams({
      headerRight: this.setHeaderRight(!this.state.secureTextEntry),
    });
   */
    const array = [title];
    const title1 = title2;
    await AsyncStorage.getItem('savedIds', (err, result) => {
      const id = [1];
      if (result !== null) {
        console.log('Data Found', result);
        newIds = JSON.parse(result).concat(array);
        AsyncStorage.setItem('savedIds', JSON.stringify(newIds));
      } else {
        console.log('Data Not Found');
        AsyncStorage.setItem('savedIds', JSON.stringify(array));
      }
    });
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <ScrollView style={{flexDirection: 'column'}}>
          <ActivityIndicator
            size="large"
            color="#0000ff"
            animating={this.state.animate}
          />
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Image source={{uri: this.state.url}} style={styles.images} />
            <Text>{this.state.title}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={this.Download}>
            <Text style={styles.text}>Click Here To Download Above Image</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  Download = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to memory to download the file ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //   Alert.alert('Permission granted', 'Now you can download anything!');
      } else {
        Alert.alert(
          'Permission Denied!',
          'You need to give storage permission to download the file',
        );
      }
    } catch (err) {
      console.warn(err);
    }
    let date = new Date();
    let image_URL = url;
    let ext = this.getExtention(image_URL);
    //ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 0) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        Alert.alert('Image Downloaded Successfully.');
      });
  };

  getExtention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  imageStyle: {
    width: 30,
    height: 30,
    resizeMode: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },

  text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
  },
  flat: {
    fontSize: 20,
  },
});
