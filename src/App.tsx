import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

export type filterValueType = "all" | "active" | "completed";

function App() {

    const TodoListTitle = "What to learn";

    const [tasks, setTask] = useState<Array<TaskType>>([
        {id: 1, title: "HTML/CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ]);

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

    const removeTask = (taskID: number) => {
        setTask(tasks.filter(n => n.id !== taskID));
    }

    return (
        <div className="App">
            <TodoList
                title={TodoListTitle}
                tasks={currentTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
