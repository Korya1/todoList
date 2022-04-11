import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {filterValueType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    addTask: (title: string) => void
    changeFilter: (filter: filterValueType) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function TodoList({title, tasks, removeTask, changeFilter, addTask}: TodoListPropsType) {

    const [addTitle, setAddTitle] = useState<string>('');
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAddTitle(e.currentTarget.value);
    }
    const onClickButtonHandler = () => {
        const trimmedTitle = addTitle.trim();
        (Boolean(trimmedTitle)) && addTask(trimmedTitle);
        setAddTitle('');
    }
    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        (e.key === 'Enter') && onClickButtonHandler();
    }
    const taskListItems = tasks.map(n => {
        return (
            <li
                key={n.id}><input type="checkbox" checked={n.isDone}/> <span>{n.title}</span>
                <button onClick={() => removeTask(n.id)}>-</button>
            </li>
        )
    })
    const changeFilterF = (filter: filterValueType) => {
        return () => changeFilter(filter);
    }

    return (<div>
        <h3>{title}</h3>
        <div>
            <input
                onChange={onChangeInputHandler}
                value={addTitle}
                onKeyPress={onKeyPressInputHandler}
            />
            <button onClick={onClickButtonHandler}>+</button>
        </div>
        <ul>
            {taskListItems}
        </ul>
        <div>
            <button onClick={changeFilterF('all')}>All</button>
            <button onClick={changeFilterF('active')}>Active</button>
            <button onClick={changeFilterF('completed')}>Completed</button>
        </div>
    </div>)
}