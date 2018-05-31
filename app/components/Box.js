
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Swipeable from 'react-native-swipeable';
import moment from 'moment';
import {scale, color, scaleVertical} from '../utils/util';



export default class Box extends Component {
    constructor(props){
        super(props);
        this.title = props.title;
        this.type = props.type;
        this.right=[
            <TouchableOpacity style={styles.swipeBtn}><Text>Accept</Text></TouchableOpacity>,
        ]

    }


    render() {

        return (
            <Swipeable rightButtons={this.right}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail')} style={styles.boxContainer}>

                    <View style={styles.indicator}></View>
                    <Text style={styles.title}>{this.title}</Text>
                </TouchableOpacity>
            </Swipeable>

        );
    }
}

const styles = StyleSheet.create({
    boxContainer: {
        height:scaleVertical(90),
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: color.third,
        paddingLeft:scale(40),
        borderColor:'#191733',
        borderBottomWidth:0.5,
        marginBottom:0.1
    },
    indicator:{
        height:scaleVertical(14),
        width:scaleVertical(14),
        backgroundColor:color.fifth,
        borderRadius:scaleVertical(7),
        marginRight:scale(40)

    },
    title:{
        color:color.textSecond
    },
    swipeBtn:{
        backgroundColor:color.second,
        flex:1,
        justifyContent:'center',
        paddingLeft:scale(10)
    }

});
