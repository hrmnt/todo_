import React from 'react';
import { StackNavigator } from 'react-navigation';
import App from './App';
import Details from './Details';


const Index = StackNavigator({
    Home: {
        screen:  App
    },
    Detail:{
        screen: Details
    },
},{
    headerMode: 'none',

});


export default class Vixtra extends React.Component {
    render() {
        return <Index/>;
    }
}