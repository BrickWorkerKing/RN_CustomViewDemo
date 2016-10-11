/**
 * Created by LiuZongRui on 16/9/28.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView
} from 'react-native';
import ItemView from './ItemView';
import CheckBox from '../../component/CheckBox';

let data = [{name: '商品1', num: 1}, {name: '商品2', num: 2}, {name: '商品3', num: 1},
    {name: '商品4', num: 3}, {name: '商品5', num: 1}, {name: '商品6', num: 6}];

export default class CartList extends Component {

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(data),
            goodsCount: 0,
            rowCount: 0
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView style={{flex: 1}}
                          dataSource={this.state.dataSource}
                          renderRow={(rowData, sectionID, rowID) => this._renderRow(rowData, sectionID, rowID)}/>
                <View style={styles.bottomBar}>
                    <Text style={{flex: 1}}>商品总数量: {this.state.goodsCount}</Text>
                    <CheckBox onCheck={() => this._onCheck()}
                              onUnCheck={() => this._onUnCheck()}
                              ref={(ref) => this.checkAllBox = ref}/>
                </View>
            </View>
        );
    }

    _renderRow(rowData, sectionID, rowID) {
        return (<ItemView onItemCheck={(count) => this._onItemCheck(count, rowID)}
                          onItemUnCheck={(count) => this._onItemUnCheck(count, rowID)}
                          rowData={rowData}/>);
    }

    _onItemCheck(count, rowID) {
        this.setState({
            goodsCount: count + this.state.goodsCount,
            rowCount: this.state.rowCount + 1
        });
        if (this.state.rowCount == data.length - 1) {
            this.checkAllBox._setChecked(true);
        }
    }

    _onItemUnCheck(count, rowID) {
        this.setState({
            goodsCount: this.state.goodsCount - count,
            rowCount: this.state.rowCount - 1
        });
        if (this.state.rowCount != data.length - 1) {
            this.checkAllBox._setChecked(false);
        }
    }

    _onCheck() {

    }

    _onUnCheck() {

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bottomBar: {
        height: 60,
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        flexDirection: 'row',
        borderTopColor: 'black',
        borderTopWidth: 1.5
    }
});