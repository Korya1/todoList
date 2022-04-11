import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import { v1 } from 'uuid';

export type filterValueType = "all" | "active" | "completed";

function App() {

    const TodoListTitle = "What to learn";

    const [tasks, setTask] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML/CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false}
    ]);

    const addTask = (title: string) => {
        setTask([{id: v1(), title, isDone: false}, ...tasks]);
    }

    const [filter, setFilter] = useState<filterValueType>("all");

    const changeFilter = (filter: filterValueType) => {
        setFilter(filter);
    }

    let currentTasks = tasks;

    switch (filter) {
        case "active":
            currentTasks = tasks.filter(n => !n.isDone);
            break;
        case "completed":
            currentTasks = tasks.filter(n => n.isDone);
            break;
    }

    const removeTask = (taskID: string) => {
        setTask(tasks.filter(n => n.id !== taskID));
    }

    return (
        <div className="App">
            <TodoList
                title={TodoListTitle}
                tasks={currentTasks}
                removeTask={removeTask}
                addTask={addTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
