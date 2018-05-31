import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Animated,
    Modal,
    Image,
    TextInput,
    Picker
} from 'react-native';
import {observer} from 'mobx-react';
import Swipeable from 'react-native-swipeable';
import DatePicker from 'react-native-datepicker'
import data from '../data/data';
import moment from 'moment';
import {scale, color, scaleVertical} from '../utils/util';


@observer
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            text: '',
            category: 0,
            filteredTodo: data.todos,
            title: '',
            date: moment().format('YYYY-MM-DD'),
            time: moment().format('HH:mm'),
            type: '',
            maxValue: 0

        };

    }

    removeItem = (id) => {
        data.removeItem(id);
    }
    addItem = () => {
        console.log(this.state.title)
        console.log(this.state.time)
        console.log(this.state.date)
        console.log(this.state.type)
        let newTodo = {
            title: this.state.title,
            type: this.state.type,
            time: this.state.date + '' + this.state.time,
            category: this.state.category
        }
        data.addItem(newTodo);
        this.toggleModal();
    }

    componentWillMount() {
        this.right = [
            <TouchableOpacity style={styles.swipeBtn}>
                <Image
                    style={styles.addIcon}
                    source={require("../assets/images/tick.png")}
                />
            </TouchableOpacity>,
        ]
    }

    acceptTask = (i) => {
        data.removeItem(i.id);

        let todos = this.state.filteredTodo.filter((item) => {
            return item.id !== i.id
        });
        this.setState({
            filteredTodo:todos
        })
    };

    toggleModal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    };

    sort = (id) => {
        if (id == 0) {
            this.setState({
                category: 0,
                filteredTodo: data.todos
            })
        }
        else {
            let sorted = data.todos.filter(item => item.category === id);
            this.setState({
                category: id,

                filteredTodo: sorted
            })
        }

    }
    count = (id) => {
        let vis = this.state.filteredTodo.filter(item => item.type === id);
        if (vis > this.state.maxValue) {
            this.setState({
                maxValue: vis
            })
        }
        return vis.length

    }
    countHeight = (id) => {
        return (scaleVertical(120) * id) / 11
    }
    colorDetect = (id) => {
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


    render() {
        const opacity = this.state.scrollY;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.dateTime}>{data.date}</Text>

                </View>
                <View style={styles.infoBox}>
                    <View style={styles.selectBox}>
                        <TouchableOpacity onPress={() => this.sort(0)} style={[styles.btn, styles.btnLeft]}>
                            <Text style={[styles.btnText, styles.montserrat]}>ALL</Text>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.sort(1)} style={[styles.btn, styles.btnRight]}>
                            <Text style={[styles.btnText, styles.montserrat]}>NOT DONE</Text>

                        </TouchableOpacity>

                    </View>
                    <View style={styles.categoryBox}>
                        <View style={styles.waveWrap}>
                            <View style={[styles.counter, styles.c_1]}>

                                <Text style={styles.counterText}>{this.count(1)}</Text>

                            </View>
                            <Animated.View
                                style={[styles.wave, styles.f_w, {height: this.countHeight(this.count(1))}]}></Animated.View>

                        </View>
                        <View style={styles.waveWrap}>
                            <View style={[styles.counter, styles.c_2]}>

                                <Text style={styles.counterText}>{this.count(2)}</Text>
                            </View>

                            <Animated.View
                                style={[styles.wave, styles.s_w, {height: this.countHeight(this.count(2))}]}></Animated.View>

                        </View>
                        <View style={styles.waveWrap}>
                            <View style={[styles.counter, styles.c_3]}>
                                <Text style={styles.counterText}>{this.count(3)}</Text>

                            </View>

                            <Animated.View
                                style={[styles.wave, styles.t_w, {height: this.countHeight(this.count(3))}]}></Animated.View>

                        </View>
                    </View>
                </View>

                <ScrollView onScroll={this.handleScroll} style={styles.taskList}>
                    {
                        this.state.filteredTodo.map(i => {
                            // return <Box  category={i.category} key={i.id} title={i.title} type={i.type}></Box>
                            return (
                                <Swipeable onRightActionRelease={() => this.acceptTask(i)} rightContent={this.right}>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('Detail', {id: i.id})}
                                        style={styles.boxContainer}>

                                        <View
                                            style={[styles.indicator, {backgroundColor: this.colorDetect(i.type)}]}></View>
                                        <Text style={styles.title}>{i.title}</Text>
                                    </TouchableOpacity>
                                </Swipeable>
                            )
                        })
                    }
                </ScrollView>
                <Animated.View style={styles.addWrap}>
                    <TouchableOpacity onPress={this.toggleModal} style={styles.add}>
                        <Image
                            style={styles.addIcon}
                            source={require("../assets/images/plus-symbol.png")}
                        />
                    </TouchableOpacity>
                </Animated.View>
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

                            <Text style={styles.modalText}>NEW TODO</Text>
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

                            <Picker
                                selectedValue={this.state.type}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => this.setState({
                                    type: itemValue
                                })}>
                                <Picker.Item label="Hobby" value="1"/>
                                <Picker.Item label="Main" value="2"/>
                                <Picker.Item label="My" value="3"/>
                            </Picker>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.addItem()}
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
    montserrat: {
        fontFamily: 'Montserrat-Regular'
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
    infoBox: {
        height: scaleVertical(220),
        backgroundColor: color.second,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    selectBox: {
        width: '76%',
        marginBottom: scaleVertical(50),
        flexDirection: 'row',
    },
    btn: {
        flex: 1,
        paddingTop: scaleVertical(10),
        paddingBottom: scaleVertical(10),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.6,
        borderColor: '#f1f1f1'

    },
    btnLeft: {
        borderTopLeftRadius: scale(20),
        borderBottomLeftRadius: scale(20),

    },
    btnRight: {
        borderTopRightRadius: scale(20),
        borderBottomRightRadius: scale(20),

    },
    btnText: {
        fontFamily: "Montserrat_Bold",
        color: color.textMain,
        fontSize: scale(14),
        letterSpacing: 1
    },
    waveWrap: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center'
    },
    wave: {
        width: '100%'
    },
    counter: {
        height: scaleVertical(22),
        width: scale(42),
        marginBottom: 14,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    c_1: {
        backgroundColor: color.main,

    },
    c_2: {
        backgroundColor: color.four,
    },
    c_3: {
        backgroundColor: color.fifth,
    },
    counterText: {
        color: color.textSecond,
        fontFamily: 'Montserrat_Bold'
    },

    f_w: {
        backgroundColor: color.main
    },

    s_w: {
        backgroundColor: color.four
    },
    t_w: {
        backgroundColor: color.fifth
    },
    categoryBox: {
        flexDirection: 'row',
        flex: 1,
    },
    taskList: {
        flex: 1,
        backgroundColor:color.second
    },
    boxContainer: {
        height: scaleVertical(90),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.second,
        paddingLeft: scale(40),
        borderColor: '#1c2a49',
        borderBottomWidth: 0.5,
        marginBottom: 0.1
    },
    indicator: {
        height: scaleVertical(14),
        width: scaleVertical(14),
        borderRadius: scaleVertical(7),
        marginRight: scale(40)
    },
    title: {
        color: color.textSecond,
        fontFamily: 'Montserrat_Regular',
        fontSize: scale(14)
    },
    swipeBtn: {
        backgroundColor: color.main,
        flex: 1,
        justifyContent: 'center',
        paddingLeft: scale(22)
    },
    addWrap: {
        position: 'absolute',
        bottom: scaleVertical(15),
        right: scaleVertical(15),
    },
    add: {
        width: scaleVertical(60),
        height: scaleVertical(60),
        backgroundColor: '#fff',
        borderRadius: scaleVertical(30),
        alignItems: 'center',
        justifyContent: 'center'

    },
    addIcon: {
        height: scaleVertical(20),
        width: scaleVertical(20)
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
        backgroundColor: color.fifth
    }

});
