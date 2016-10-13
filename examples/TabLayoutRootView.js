/**
 * Created by LiuZongRui on 16/10/9.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    BackAndroid,
    Platform,
    ToastAndroid,
    AsyncStorage,
    View,
    Text,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import TabLayout from '../component/tabLayout/TabLayout';
import CartList from './checkbox/CartList';
import Dialog from '../component/Dialog';
import AutoExpandingTextInput from '../component/AutoExpandingTextInput';
import DiaryHomeView from './diary/DiaryHomeView';

const EXIT_APP = 'exitApp';
let lastBackPressed;

export default class RootView extends Component {

    render() {
        let array = ['CheckBox', 'Dialog', 'TextInput', 'AsyncStorage'];

        let Platform = require('Platform');
        let marginTop;
        if (Platform.OS === 'android') {
            marginTop = 0;
        } else {
            marginTop = 24;
        }
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    animated={true}
                    barStyle={'default'}
                    backgroundColor={'green'}
                    translucent={false}
                    showHideTransition={'fade'}
                    networkActivityIndicatorVisible={true}
                    hidden={false}/>
                <View style={[styles.titleLayout, {marginTop: marginTop}]}>
                    <Text style={styles.title}>TabLayoutDemo</Text>
                </View>
                <TabLayout tabArray={array} locateTop={true} borderBottomWidth={0} selectedColor='red'
                           tabContentViewArray={this._getTabContentView()}/>
            </View>
        );
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener(EXIT_APP, () => this._onBackAndroid());
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener(EXIT_APP, () => this._onBackAndroid());
        }
    }

    _onBackAndroid() {
        if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
            return false;
        }
        lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出程序', ToastAndroid.SHORT);
        return true;
    }

    _getTabContentView() {
        return [
            <CartList/>,
            this._renderDialogPage(),
            <View style={[{backgroundColor: 'white'}, styles.tabContentView]}>
                <View>
                    <AutoExpandingTextInput style={styles.autoInput}/>
                </View>
            </View>,
            <DiaryHomeView/>
        ]
    }

    _renderDialogPage() {
        return (
            <View style={styles.tabContentView}>
                <Dialog ref={(ref) => this.dialog = ref}/>
                <View style={styles.btn}>
                    <TouchableOpacity onPress={() => this._showDialog()}>
                        <Text>显示Dialog</Text>
                    </TouchableOpacity>
                </View>
                <Text>通过自定义Dialog学习BackAndroid</Text>
            </View>
        )
    }

    _showDialog() {
        this.dialog._showDialog();
    }
}

const styles = StyleSheet.create({
    titleLayout: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        color: '#333333'
    },
    tabContentView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        borderWidth: 1,
        borderColor: 'blue',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 30,
        marginBottom: 20
    },
    autoInput: {
        backgroundColor: 'gray',
        width: 100,
        fontSize: 16
    }
});
