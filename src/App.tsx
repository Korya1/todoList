import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";



function App() {
    const TodoListTitle_01 = "What to learn";
    const TodoListTitle_02 = "What to buy";

    const task_01: Array<TaskType> = [
        {id: 1, title: "HTML/CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ]

    const task_02: Array<TaskType> = [
        {id: 1, title: "Milk", isDone: true},
        {id: 2, title: "Sugar", isDone: true},
        {id: 3, title: "Salt", isDone: false}
    ]

    return (
        <div className="App">
            <TodoList title={TodoListTitle_01} tasks={task_01}/>
            <TodoList title={TodoListTitle_02} tasks={task_02}/>
        </div>
    );
}

export default App;
