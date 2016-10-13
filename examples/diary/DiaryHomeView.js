/**
 * Created by LiuZongRui on 16/10/13.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    AsyncStorage,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import AutoExpandingTextInput from '../../component/AutoExpandingTextInput';

export default class DiaryHomeView extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <AutoExpandingTextInput style={styles.input}/>
                </View>
                <TouchableOpacity onPress={() => this._saveData()}>
                    <Text style={styles.btn}>保存数据</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._getData()}>
                    <Text style={styles.btn}>显示数据</Text>
                </TouchableOpacity>
                <Text style={styles.data}>数据</Text>
            </View>
        );
    }

    _saveData() {

    }

    _getData() {

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16
    },
    input: {
        fontSize: 16,
        width: 260,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 8,
        paddingLeft: 4,
        height: 34
    },
    btn: {
        fontSize: 16,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 1,
        borderColor: 'green',
        marginTop: 30
    },
    data: {
        fontSize: 16,
        marginTop: 30,
        width: 200,
        textAlign: 'center'
    }
});