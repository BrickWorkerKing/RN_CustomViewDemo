/**
 * Created by LiuZongRui on 16/9/28.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import CheckBox from '../../component/CheckBox';

export default class ItemView extends Component {

    static propTypes = {
        onItemCheck: React.PropTypes.func,
        onItemUnCheck: React.PropTypes.func
    }

    static get defaultProps() {
        return {
            onItemCheck: null,
            onItemUnCheck: null
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageLayout}>
                    <Image source={require('../../image/image.jpg')}
                           style={styles.imageView}/>
                </View>
                <View style={styles.textLayout}>
                    <Text style={styles.text}>{this.props.rowData.name}</Text>
                    <Text style={styles.text}>x {this.props.rowData.num}</Text>
                </View>
                <View style={styles.checkBoxLayout}>
                    <CheckBox onCheck={() => this._onCheck()} onUnCheck={() => this._onUnCheck()} checkedColor='red'/>
                </View>
            </View>
        );
    }

    _onCheck() {
        this.setState({
            checked: true
        });
        if (this.props.onItemCheck) {
            this.props.onItemCheck(this.props.rowData.num);
        }
    }

    _onUnCheck() {
        this.setState({
            checked: false
        });
        if (this.props.onItemUnCheck) {
            this.props.onItemUnCheck(this.props.rowData.num);
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 90,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1
    },
    imageLayout: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 90,
        width: 90
    },
    imageView: {
        width: 60,
        height: 60
    },
    textLayout: {
        justifyContent: 'space-between',
        padding: 16
    },
    text: {
        color: '#333333',
        fontSize: 16
    },
    checkBoxLayout: {
        position: 'absolute',
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        height: 90,
        width: 90
    }
});