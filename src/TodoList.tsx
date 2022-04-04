import React from "react";
import {filterValueType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeFilter: (filter: filterValueType) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export function TodoList({title, tasks, removeTask, changeFilter}: TodoListPropsType) {

    const taskListItems = tasks.map(n => {
        return (
            <li
                key={n.id}><input type="checkbox" checked={n.isDone}/> <span>{n.title}</span>
                <button onClick={() => removeTask(n.id)}>-</button>
            </li>
        )
    })

    return (<div>
        <h3>{title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {taskListItems}
        </ul>
        <div>
            <button onClick={() => changeFilter("all")}>All</button>
            <button onClick={() => changeFilter("active")}>Active</button>
            <button onClick={() => changeFilter("completed")}>Completed</button>
        </div>
    </div>)
}