import {observable, computed} from 'mobx';
import moment from 'moment';

class TodoList{
    @observable date = moment().format('dddd, DD MMMM');

    @observable todos = [
        {
            id: 1,
            title: "Broad Breakfast",
            time: "2018-08-2 09:30",
            category: 0,
            type: 2,
            completed:0,
            tasks:[
                {
                    id:1,
                    time:"2018-08-2 10:30",
                    name:"Opening",
                    parent_id:1,
                    completed:0
                },
                {
                    id:2,
                    time:"2018-08-2 11:30",
                    name:"Meeting",
                    parent_id:1,
                    completed:0
                },
                {
                    id:3,
                    time:"2018-08-2 13:00",
                    name:"Conference",
                    parent_id:1,
                    completed:0
                },
                {
                    id:4,
                    time:"2018-08-2 16:30",
                    name:"Close party",
                    parent_id:1,
                    completed:0
                },
            ]
        },
        {
            id: 2,
            title: "Preparation for Exam",
            time: "2018-08-2 22:30",
            category: 2,
            type: 3,
            tasks:[]

        },
        {
            id: 3,
            title: "Vixtra gaming",
            time: "2018-08-2 22:30",
            category: 1,
            type: 1,
            tasks:[]

        },
        {
            id: 4,
            title: "test gaming",
            time: "2018-08-2 22:30",
            category: 1,
            type: 1,
            tasks:[]

        },
        {
            id: 5,
            title: "Broad Breakfast",
            time: "2018-08-2 09:30",
            category: 1,
            type: 2,
            completed:0,
            tasks:[
                {
                    id:1,
                    time:"2018-08-2 10:30",
                    name:"Opening",
                    parent_id:1,
                    completed:0
                },
                {
                    id:2,
                    time:"2018-08-2 11:30",
                    name:"Meeting",
                    parent_id:1,
                    completed:0
                },
                {
                    id:3,
                    time:"2018-08-2 13:00",
                    name:"Conference",
                    parent_id:1,
                    completed:0
                },
                {
                    id:4,
                    time:"2018-08-2 16:30",
                    name:"Close party",
                    parent_id:1,
                    completed:0
                },
            ]
        },

    ]

    @observable filter=[]
    addItem(item){
        console.log(item);
        this.todos.push({
            id:this.todos.length+1,
            title: item.title,
            time: item.time,
            category: item.category,
            type: item.type,
            tasks:[

            ]

        })
    }

    addTask(item,id){
        let v = this.todos.find(item => item.id === id);
        console.log(v);
        v.tasks.push({
            id:v.tasks.length+1,
            time:item.time,
            name:item.name,
            parent_id:item.parent_id,
            completed:item.completed
        })
    }

    removeItem(id){
        this.todos = this.todos.filter((item) => {
            return item.id !== id
        })
    }
}

const data =  new TodoList();

export default data