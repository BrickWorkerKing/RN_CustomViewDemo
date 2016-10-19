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
import AutoExpandingTextInput from '../component/AutoExpandingTextInput';

let inputText = '';

export default class DiaryHomeView extends Component {

    constructor(props) {
        super(props);

        console.log('DiaryHomeView constructor');

        this.state = {
            dataText: '读取中。。。',
        }
    }

    render() {

        console.log('DiaryHomeView render');

        return (
            <View style={styles.container}>
                <View>
                    <AutoExpandingTextInput style={styles.input} onChangeText={(text) => inputText = text}/>
                </View>
                <TouchableOpacity onPress={() => this._saveData()}>
                    <Text style={styles.btn}>保存数据</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._getData()}>
                    <Text style={styles.btn}>显示数据</Text>
                </TouchableOpacity>
                <Text style={styles.data}>{this.state.dataText}</Text>
            </View>
        );
    }

    componentWillMount() {
        console.log('DiaryHomeView componentWillMount');
    }

    componentDidMount() {
        console.log('DiaryHomeView componentDidMount');
    }

    componentWillReceiveProps() {
        console.log('DiaryHomeView componentWillReceiveProps');
    }

    shouldComponentUpdate() {
        console.log('DiaryHomeView shouldComponentUpdate');
        return true;
    }

    componentWillUpdate(){
        console.log('DiaryHomeView componentWillUpdate');
    }

    componentDidUpdate() {
        console.log('DiaryHomeView componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('DiaryHomeView componentWillUnmount');
    }

    _saveData() {
        AsyncStorage.setItem('data', inputText).then(() => {
            console.log('数据保存成功!');
        }).catch((error)=> {
            console.log('数据保存失败 :  ' + error.message);
        });
    }

    _getData() {
        AsyncStorage.getItem('data').then((result) => {
            if (result === null) {
                console.log('result == null');
                return;
            }
            console.log('result == ' + result);
            this.setState({
                dataText: result
            });
        }).catch((error) => {
            console.log('数据提取失败:  ' + error.message);
        });
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