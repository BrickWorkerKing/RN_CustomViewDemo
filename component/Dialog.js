/**
 * Created by LiuZongRui on 16/10/11.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    BackAndroid,
    Platform,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

let Dimensions = require('Dimensions');
let {width:winWidth, height: winHeight} = Dimensions.get('window');

export default class Dialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    render() {
        if (this.state.show) {
            return (
                <View style={styles.container}>
                    <View style={[styles.dialog, this._getDialogShape()]}>
                        <View style={styles.title}>
                            <Text style={styles.title_text}>这是Dialog</Text>
                        </View>
                        <View style={styles.btn_layout}>
                            <TouchableOpacity style={styles.cancel_btn} onPress={() => this._onCancel()}>
                                <Text style={styles.cancel_text}>取消</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.submit_btn} onPress={() => this._onSubmit()}>
                                <Text style={styles.submit_text}>确定</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.empty_view}/>
            );
        }
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('dialogDismiss', () => this._onBackAndroid());
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('dialogDismiss', ()=> this._onBackAndroid());
        }
    }

    _onBackAndroid() {
        if (this.state.show) {
            this._dismiss();
            return true;
        }
        return false;
    }

    _showDialog() {
        this.setState({
            show: true
        })
    }

    _dismiss() {
        this.setState({
            show: false
        })
    }

    _onCancel() {
        console.log('取消');
        this._dismiss();
    }

    _onSubmit() {
        console.log('确定');
        this._dismiss();
    }

    _getDialogShape() {
        return {
            width: winWidth * 0.55,
            height: winHeight * 0.2
        }
    }
}

const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.2)',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            justifyContent: 'center',
            alignItems: 'center'
        },
        dialog: {
            backgroundColor: '#ffffff',
            borderWidth: 1,
            borderColor: '#cccccc',
            borderRadius: 6
        },
        title: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }
        ,
        title_text: {
            fontSize: 16,
            color: '#333333'
        }
        ,
        btn_layout: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center'
        }
        ,
        cancel_btn: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }
        ,
        submit_btn: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }
        ,
        cancel_text: {
            fontSize: 14,
            color: 'blue'
        }
        ,
        submit_text: {
            fontSize: 14,
            color: 'red'
        },
        empty_view: {
            backgroundColor: '#00000000'
        }
    })
    ;