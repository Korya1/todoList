import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {filterValueType} from './App';
import s from './TodoList.module.css'

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    addTask: (title: string) => void
    changeFilter: (filter: filterValueType) => void
    filter: filterValueType
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function TodoList({
                             title,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             filter,
                             changeTaskStatus
                         }: TodoListPropsType) {


    //state =========
    const [addTitle, setAddTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    // CSS styles ===
    const allFilterButton = filter === 'all' ? s.selectBtn : '';
    const activeFilterButton = filter === 'active' ? s.selectBtn : '';
    const completedFilterButton = filter === 'completed' ? s.selectBtn : '';
    const errorStatus = error ? s.errorInput : '';

    //functions =====
    const getTasksForRender = (tasks: TaskType[], filter: filterValueType): TaskType[] => {
        switch (filter) {
            case 'active':
                return tasks.filter(n => !n.isDone);
            case 'completed':
                return tasks.filter(n => n.isDone);
            default:
                return tasks
        }
    }
    const changeFilterF = (filter: filterValueType) => {
        return () => changeFilter(filter);
    }

    //handlers ======
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAddTitle(e.currentTarget.value);
        setError(null);
    }
    const onClickButtonHandler = () => {
        const trimmedTitle = addTitle.trim();
        if (trimmedTitle) {
            addTask(trimmedTitle)
        } else {
            setError('Field is required')
        }
        setAddTitle('');
    }
    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        (e.key === 'Enter') && onClickButtonHandler();
    }

    // variables ====
    const tasksForRender = getTasksForRender(tasks, filter);
    const taskListItems = tasksForRender.length
        ? tasksForRender.map(n => {
            const completedTasks = n.isDone ? s.completedTasks : '';
            const onClickRemoveTask = () => removeTask(n.id);
            const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                changeTaskStatus(n.id, e.currentTarget.checked);
            }
            return (
                <li key={n.id}>
                    <input
                        className={completedTasks}
                        type="checkbox" checked={n.isDone}
                        onChange={onChangeCheckboxHandler}
                    /> <span className={completedTasks}>{n.title}</span>
                    <button onClick={onClickRemoveTask}>-</button>
                </li>
            )
        })
        : <span>tasks not found</span>

    return (<div>
        <h3>{title}</h3>
        <div>
            <input
                className={errorStatus}
                onChange={onChangeInputHandler}
                value={addTitle}
                onKeyPress={onKeyPressInputHandler}
            />
            <button onClick={onClickButtonHandler}>+</button>
            <div className={s.errorRequired}>{error}</div>
        </div>
        <ul>
            {taskListItems}
        </ul>
        <div>
            <button className={allFilterButton} onClick={changeFilterF('all')}>All</button>
            <button className={activeFilterButton} onClick={changeFilterF('active')}>Active</button>
            <button className={completedFilterButton} onClick={changeFilterF('completed')}>Completed</button>

        </div>
    </div>)
}