import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../App';

test('correct todolist should be removed', () => {
    let todoLIstID1 = v1();
    let todoLIstID2 = v1();
    const startState: Array<TodoListType> = [
        {id: todoLIstID1, title: "What to learn", filter: "all"},
        {id: todoLIstID2, title: "What to buy", filter: "all"}
    ];
    const endState = todolistsReducer(startState, removeTodolistAC(todoLIstID1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoLIstID2);
});

test('correct todolist should be added', () => {
    let todoLIstID1 = v1();
    let todoLIstID2 = v1();
    let newTodolistTitle = "New Todolist";
    const startState: Array<TodoListType> = [
        {id: todoLIstID1, title: "What to learn", filter: "all"},
        {id: todoLIstID2, title: "What to buy", filter: "all"}
    ];
    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle));
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe('all');
});

test('correct todolist should change its name', () => {
    let todoLIstID1 = v1();
    let todoLIstID2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todoLIstID1, title: "What to learn", filter: "all"},
        {id: todoLIstID2, title: "What to buy", filter: "all"}
    ];
    const action = changeTodolistTitleAC(todoLIstID2, newTodolistTitle);
    const endState = todolistsReducer(startState, action);
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todoLIstID1 = v1();
    let todoLIstID2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodoListType> = [
        {id: todoLIstID1, title: "What to learn", filter: "all"},
        {id: todoLIstID2, title: "What to buy", filter: "all"}
    ];
    const action = changeTodolistFilterAC(todoLIstID2, newFilter);
    const endState = todolistsReducer(startState, action);
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
