import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Modal,
    Image,
    TextInput,
    Picker
} from 'react-native';
import moment from 'moment';
import Swipeable from 'react-native-swipeable';
import DatePicker from 'react-native-datepicker'
import data from '../data/data';
import {scale, color, scaleVertical} from '../utils/util';

export default class Details extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            id:props.navigation.state.params.id,
            title: '',
            date: moment().format('YYYY-MM-DD'),
            time: moment().format('HH:mm'),
            parent_id:0,
            completed:0,
            todo:{
                time:"",
                title: "",
                tasks: [],
                type:null
            }


        }
    }
    componentWillMount(){
        data.todos.filter((item) => {
            if(item.id == this.state.id){
                this.setState({
                    todo:{
                        time: moment(item.time).format("dddd, DD MMMM"),
                        title:item.title,
                        tasks: item.tasks,
                        type: item.type
                    }

                })
            }
        })
        this.right=[
            <TouchableOpacity style={styles.swipeBtn}><Text>Accept</Text></TouchableOpacity>,
        ]
    }

    toggleModal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    };
    addTask = () =>{
        let newTodo = {
            name: this.state.title,
            completed: 0,
            time: this.state.date + '' + this.state.time,
            parent_id: this.state.id
        }
        data.addTask(newTodo,this.state.id);
        this.toggleModal();

    }

    bgColor = (id) =>{
        switch (id) {
            case 1:
                return "#3FBAE4"
                break;
            case 2:
                return "#ffd645"
                break;
            case 3:
                return "#F15F9B"
                break;

        }
    }

    empty(){
        if(this.state.todo.tasks.length === 0){
            return(
                <View style={[styles.tasksWrap,styles.empty]}>
                    <Text style={styles.text}>No tasks</Text>
                    <TouchableOpacity onPress={this.toggleModal} style={styles.addWrap}>
                        <Text style={styles.text}>
                            ADD
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else {
            return(
                <ScrollView style={[styles.tasksWrap]}>
                    {
                        this.state.todo.tasks.map(i => {
                            // return <Box  category={i.category} key={i.id} title={i.title} type={i.type}></Box>
                            return (
                                <Swipeable rightButtons={this.right}>
                                    <View style={styles.boxContainer}>

                                        <View style={styles.indicator}></View>
                                        <Text style={styles.time}>{moment(i.time).format('hh:mm')}</Text>
                                        <Text style={styles.title}>{i.name}</Text>
                                    </View>
                                </Swipeable>
                            )
                        })
                    }
                </ScrollView>
            )
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View></View>
                    <Text style={styles.dateTime}>{this.state.todo.time}</Text>
                </View>
                <View style={[styles.infoBox, {backgroundColor: this.bgColor(this.state.todo.type)}]}>
                    <View style={styles.mainInfo}>
                        <Text style={styles.mainText}>{this.state.todo.title}</Text>
                    </View>
                    {
                        this.empty()
                    }

                </View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={this.toggleModal}

                >
                    <View style={styles.modal}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity
                                onPress={this.toggleModal} style={styles.cancel}>
                                <Image
                                    style={styles.cancelIcon}
                                    source={require("../assets/images/cancel.png")}
                                />
                            </TouchableOpacity>

                            <Text style={styles.modalText}>NEW TASK</Text>
                        </View>
                        <View style={styles.modalContent} enabled>

                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => this.setState({
                                        title: text
                                })}
                                value={this.state.title}
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#ccc"
                                placeholder="ToDo"
                            />
                            <View style={styles.date}>
                                <DatePicker
                                    style={styles.datepicker}
                                    date={this.state.date}
                                    mode="date"
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    minDate="2018-05-30"
                                    maxDate="2030-06-01"
                                    customStyles={{
                                        dateInput: {
                                            borderLeftWidth: 0,
                                            borderRightWidth: 0,
                                            borderTopWidth: 0,
                                        },
                                        dateText: {color: '#FFF'},

                                    }}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    showIcon={false}
                                    onDateChange={(date) => {
                                        this.setState({
                                                date: date
                                        })
                                    }}
                                />
                                <DatePicker
                                    style={styles.datepicker}
                                    date={this.state.time}
                                    mode="time"
                                    placeholder="select date"
                                    format="HH:mm"
                                    // minDate="2016-05-01"
                                    // maxDate="2016-06-01"
                                    customStyles={{
                                        dateInput: {
                                            borderLeftWidth: 0,
                                            borderRightWidth: 0,
                                            borderTopWidth: 0,
                                        },
                                        dateText: {color: '#FFF'},
                                    }}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    showIcon={false}
                                    onDateChange={(time) => {
                                        this.setState({
                                                time: time

                                        })
                                    }}
                                />
                            </View>


                        </View>
                        <TouchableOpacity
                            onPress={() => this.addTask()}
                            style={styles.accept}
                        >
                            <Text style={styles.modalText}>ADD</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>


            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: scaleVertical(100),
        backgroundColor: color.second,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateTime: {
        fontFamily: 'Montserrat',
        fontSize: scale(15),
        fontWeight: '400',
        letterSpacing: 1,
        color: color.textSecond,
    },
    infoBox:{
        flex:1,
    },
    mainInfo:{
        height:scaleVertical(90),
        borderBottomWidth:0.3,
        alignItems:'center',
        justifyContent:'center',
        borderBottomColor:'#fdfeff'
    },
    mainText:{
        color:color.textSecond,
        fontSize:scale(18),
        fontFamily:"Montserrat_Regular"
    },
    tasksWrap:{
        flex:1,
        paddingBottom:scaleVertical(80)
    },
    empty:{
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        color:color.textSecond,
        fontSize:scale(16),
        fontFamily:"Montserrat_Light"
    },
    addWrap:{
        height:scaleVertical(80),
        width:'100%',
        position:'absolute',
        bottom:0,
        backgroundColor:color.second,
        alignItems:'center',
        justifyContent:'center'
    },
    boxContainer:{
        height:scaleVertical(90),
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:scale(40),
        borderBottomColor:'#fdfeff',
        borderBottomWidth:0.3,
        marginBottom:0.1
    },
    indicator:{
        height:scaleVertical(14),
        width:scaleVertical(14),
        backgroundColor:'#fff',
        borderRadius:scaleVertical(7),
        marginRight:scale(20)
    },
    time:{
        color:color.textSecond,
        fontSize:scale(14),
        fontFamily:"Montserrat_Light",
        minWidth:scale(50)

    },
    title:{
        color:color.textSecond,
        fontSize:scale(14),
        fontFamily:"Montserrat_Light"
    },
    modal: {
        flex: 1,
        backgroundColor: 'rgba(10,26,57, 0.9)',

    },
    modalHeader: {
        height: scaleVertical(100),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: "#fff"
    },
    cancel: {
        position: "absolute",
        left: scale(20),
        width: scale(40),
        height: "100%",
        top: scaleVertical(41)
    },
    cancelIcon: {
        height: scaleVertical(18),
        width: scaleVertical(18)
    },
    modalText: {
        color: color.textSecond,
        fontSize: scale(13),
        fontFamily: "Montserrat_Light"
    },
    input: {
        color: color.textSecond,
        width: "80%",
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
        paddingLeft: 10,
        textAlign: 'center'
    },
    modalContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    date: {
        flexDirection: 'row'
    },
    datepicker: {
        borderWidth: 0,
        color: color.textSecond
    },
    picker: {
        width: "80%",
        color: "#fff"
    },
    accept: {
        height: scaleVertical(80),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.third
    }
});
