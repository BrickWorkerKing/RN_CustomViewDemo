/**
 * Created by LiuZongRui on 16/10/9.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import TabLayout from '../tabLayout/TabLayout';
import CartList from './checkbox/CartList';

export default class RootView extends Component {

    render() {
        let array = ['CheckBox', '选项二', '选项三', '选项四'];

        let Platform = require('Platform');
        let marginTop;
        if (Platform.OS === 'android') {
            marginTop = 0;
        } else {
            marginTop = 24;
        }
        return (
            <View style={{flex: 1}}>
                <View style={[styles.titleLayout,{marginTop: marginTop}]}>
                    <Text style={styles.title}>TabLayoutDemo</Text>
                </View>
                <TabLayout tabArray={array} locateTop={true} borderBottomWidth={0} selectedColor='red'
                           tabContentViewArray={this._getTabContentView()}/>
            </View>
        );
    }

    _getTabContentView() {
        return [
            <CartList/>,
            <View style={[{backgroundColor: 'green'}, styles.tabContentView]}><Text>页面二</Text></View>,
            <View style={[{backgroundColor: 'white'}, styles.tabContentView]}><Text>页面三</Text></View>,
            <View style={[{backgroundColor: 'yellow'}, styles.tabContentView]}><Text>页面四</Text></View>
        ]
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
        justifyContent: 'center',
        alignItems: 'center'
    }
});
