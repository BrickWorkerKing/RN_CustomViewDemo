/**
 * Created by LiuZongRui on 16/10/14.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    RefreshControl,
    View
} from 'react-native';

let Dimensions = require('Dimensions');
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

export default class ShowScrollView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refresh: false
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}
                            onMomentScrollBegin={() => this._onMomentScrollBegin()}
                            onMomentScrollEnd={() => this._onMomentScrollEnd()}
                            onScrollBeginDrag={() => this._onScrollBeginDrag()}
                            onScrollEndDrag={() => this._onScrollEndDrag()}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refresh}
                                    onRefresh={() => this._onRefresh()}
                                    tintColor="#ff0000"
                                    title="loading..."
                                    colors={['#ff0000', '#00ff00', '#0000ff']}
                                    progressBackgroundColor="#ffff00"/>
                            }>
                    <View style={styles.aView}/>
                    <ScrollView style={styles.midScrollView}
                                showsHorizontalScrollIndicator={false}
                                snapToAlignment='center'
                                snapToInterval={width}
                                horizontal={true}>
                        <View style={styles.bView}/>
                        <View style={styles.bView}/>
                        <View style={styles.bView}/>
                        <View style={styles.bView}/>
                    </ScrollView>
                    <ScrollView style={styles.midScrollView}
                                showsHorizontalScrollIndicator={false}
                                pagingEnabled={true}
                                horizontal={true}>
                        <View style={styles.bView}/>
                        <View style={styles.bView}/>
                        <View style={styles.bView}/>
                        <View style={styles.bView}/>
                    </ScrollView>
                    <View style={styles.aView}/>
                    <View style={styles.aView}/>
                    <View style={styles.aView}/>
                </ScrollView>
            </View>)
    }

    _onMomentScrollBegin() {
        console.log("_onMomentScrollBegin");
    }

    _onMomentScrollEnd() {
        console.log("_onMomentScrollEnd");
    }

    _onScrollBeginDrag() {
        console.log("_onScrollBeginDrag");

    }

    _onScrollEndDrag() {
        console.log("_onScrollEndDrag");
    }

    _onRefresh() {
        console.log("_onRefresh");
        this.setState({
            refresh: true
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray'
    },
    scrollView: {
        backgroundColor: '#cccccc'
    },
    midScrollView: {
        height: 150,
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 20
    },
    aView: {
        margin: 1,
        padding: 0,
        backgroundColor: '#eaeaea',
        height: 100
    },
    bView: {
        flex: 1,
        height: 148,
        width: width,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'grey'
    }
});